import { Phase, SignalTag, PhaseEstimate } from '../types';
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
