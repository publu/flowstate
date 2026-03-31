import { Phase, SignalTag, PhaseEstimate, Observation } from '../types';
import { signalPhaseWeights, phaseMidpoint } from '../data/signals';

const ALL_PHASES: Phase[] = ['menstruation', 'follicular', 'ovulation', 'luteal_early', 'luteal_late'];

/**
 * Estimate the most likely cycle phase from behavioral signals.
 * Sums weighted scores across all signals, normalizes to probabilities,
 * and returns the highest-probability phase with confidence.
 */
export function estimatePhaseFromSignals(signals: SignalTag[]): PhaseEstimate {
  if (signals.length === 0) {
    return {
      phase: 'follicular',
      confidence: 0.2,
      estimatedDay: 10,
      probabilities: {
        menstruation: 0.2,
        follicular: 0.2,
        ovulation: 0.2,
        luteal_early: 0.2,
        luteal_late: 0.2,
      },
    };
  }

  const scores: Record<Phase, number> = {
    menstruation: 0,
    follicular: 0,
    ovulation: 0,
    luteal_early: 0,
    luteal_late: 0,
  };

  for (const signal of signals) {
    const weights = signalPhaseWeights[signal];
    if (!weights) continue;
    for (const phase of ALL_PHASES) {
      scores[phase] += weights[phase];
    }
  }

  const total = ALL_PHASES.reduce((sum, p) => sum + scores[p], 0);
  const probabilities = {} as Record<Phase, number>;
  for (const phase of ALL_PHASES) {
    probabilities[phase] = total > 0 ? scores[phase] / total : 0.2;
  }

  let bestPhase: Phase = 'follicular';
  let bestProb = 0;
  for (const phase of ALL_PHASES) {
    if (probabilities[phase] > bestProb) {
      bestProb = probabilities[phase];
      bestPhase = phase;
    }
  }

  // More signals + stronger agreement = higher confidence
  const signalBoost = Math.min(signals.length / 4, 1);
  const confidence = Math.min(bestProb * signalBoost * 1.5, 0.95);

  return {
    phase: bestPhase,
    confidence: Math.round(confidence * 100) / 100,
    estimatedDay: phaseMidpoint[bestPhase],
    probabilities,
  };
}

/**
 * Temporal estimation: uses dated observations to figure out where in the
 * cycle she is by correlating signals with their relative timing.
 *
 * Groups observations by date, scores each day independently for its most
 * likely phase, then fits the best cycle day offset so the phase sequence
 * makes temporal sense (e.g. cramps 14 days before energetic = real pattern).
 */
export function estimateFromDatedObservations(
  observations: Observation[],
  cycleLength: number = 28,
): PhaseEstimate {
  if (observations.length === 0) {
    return estimatePhaseFromSignals([]);
  }

  // Group signals by date
  const byDate = new Map<string, SignalTag[]>();
  for (const obs of observations) {
    const existing = byDate.get(obs.date) || [];
    existing.push(...obs.signals);
    byDate.set(obs.date, existing);
  }

  const dates = [...byDate.keys()].sort();
  if (dates.length === 0) return estimatePhaseFromSignals([]);

  // If only 1 day of data, fall back to flat estimation
  if (dates.length === 1) {
    return estimatePhaseFromSignals(byDate.get(dates[0])!);
  }

  // For each date, compute per-phase scores
  const dailyScores: { date: string; daysSinceFirst: number; scores: Record<Phase, number> }[] = [];
  const firstDate = new Date(dates[0]);
  firstDate.setHours(0, 0, 0, 0);

  for (const date of dates) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const daysSinceFirst = Math.round((d.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24));
    const signals = byDate.get(date)!;

    const scores: Record<Phase, number> = {
      menstruation: 0, follicular: 0, ovulation: 0, luteal_early: 0, luteal_late: 0,
    };

    for (const signal of signals) {
      const weights = signalPhaseWeights[signal];
      if (!weights) continue;
      for (const phase of ALL_PHASES) {
        scores[phase] += weights[phase];
      }
    }

    dailyScores.push({ date, daysSinceFirst, scores });
  }

  // Try every possible starting cycle day (1 through cycleLength) for the first observation.
  // For each candidate, compute how well the observed signals match the expected phase
  // at that point in the cycle.
  const phaseDayRanges: { phase: Phase; start: number; end: number }[] = [
    { phase: 'menstruation', start: 1, end: 5 },
    { phase: 'follicular', start: 6, end: 13 },
    { phase: 'ovulation', start: 14, end: 16 },
    { phase: 'luteal_early', start: 17, end: 21 },
    { phase: 'luteal_late', start: 22, end: 28 },
  ];

  function dayToPhase(day: number): Phase {
    const mapped = ((day - 1) % 28) + 1;
    for (const range of phaseDayRanges) {
      if (mapped >= range.start && mapped <= range.end) return range.phase;
    }
    return 'luteal_late';
  }

  let bestOffset = 1;
  let bestFit = -Infinity;

  for (let startDay = 1; startDay <= cycleLength; startDay++) {
    let fit = 0;
    for (const entry of dailyScores) {
      const cycleDay = ((startDay - 1 + entry.daysSinceFirst) % cycleLength) + 1;
      const expectedPhase = dayToPhase(cycleDay);
      // Reward: how much do the signals for this day agree with the expected phase?
      const total = ALL_PHASES.reduce((s, p) => s + entry.scores[p], 0);
      if (total > 0) {
        fit += entry.scores[expectedPhase] / total;
      }
    }
    if (fit > bestFit) {
      bestFit = fit;
      bestOffset = startDay;
    }
  }

  // Now compute the current cycle day based on the best offset
  const lastDate = new Date(dates[dates.length - 1]);
  lastDate.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysSinceLastObs = Math.round((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
  const lastEntry = dailyScores[dailyScores.length - 1];
  const currentCycleDay = ((bestOffset - 1 + lastEntry.daysSinceFirst + daysSinceLastObs) % cycleLength) + 1;

  const currentPhase = dayToPhase(currentCycleDay);

  // Confidence: based on how well the best fit scored vs random chance (0.2 per day)
  const avgFit = bestFit / dailyScores.length;
  const daysBoost = Math.min(dates.length / 7, 1); // More days = more confident
  const confidence = Math.min(avgFit * daysBoost * 1.8, 0.95);

  // Build probabilities from today's expected position
  const probabilities = {} as Record<Phase, number>;
  const baseProbSum = ALL_PHASES.reduce((s, p) => {
    const dist = Math.abs(phaseMidpoint[p] - currentCycleDay);
    const cycleDist = Math.min(dist, cycleLength - dist);
    probabilities[p] = Math.exp(-cycleDist / 4);
    return s + probabilities[p];
  }, 0);
  for (const p of ALL_PHASES) {
    probabilities[p] /= baseProbSum;
  }

  return {
    phase: currentPhase,
    confidence: Math.round(confidence * 100) / 100,
    estimatedDay: currentCycleDay,
    probabilities,
  };
}

/**
 * Given an estimated cycle day, calculate a synthetic period start date
 * so we can feed into the existing cycle content engine.
 */
export function syntheticPeriodStart(estimatedDay: number, cycleLength: number = 28): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysAgo = estimatedDay - 1;
  const start = new Date(today);
  start.setDate(start.getDate() - daysAgo);
  return start.toISOString().split('T')[0];
}
