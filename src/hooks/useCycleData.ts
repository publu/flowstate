import { useState, useEffect, useCallback } from 'react';
import { CycleConfig, Phase, DayContent, Observation, SignalTag } from '../types';
import { loadCycleConfig, saveCycleConfig, clearCycleConfig, loadObservations, saveObservations, clearObservations } from '../utils/storage';
import { getCycleDay, getPhase, getDayContent, getDaysUntilPeriod } from '../utils/cycle';
import { estimatePhaseFromSignals, syntheticPeriodStart } from '../utils/signals';

interface UseCycleDataReturn {
  loading: boolean;
  isOnboarded: boolean;
  config: CycleConfig | null;
  cycleDay: number;
  phase: Phase;
  content: DayContent;
  daysUntilPeriod: number;
  confidence: number;
  observations: Observation[];
  saveConfig: (config: CycleConfig) => Promise<void>;
  addObservation: (signals: SignalTag[], note?: string) => Promise<void>;
  reset: () => Promise<void>;
}

const defaultContent: DayContent = {
  day: 1,
  phase: 'menstruation',
  phaseName: 'Menstruation',
  biology: '',
  feelings: [],
  actions: [],
  avoid: [],
  hormones: { estrogen: 0, progesterone: 0, testosterone: 0, prostaglandins: 0, serotonin: 0 },
};

export function useCycleData(): UseCycleDataReturn {
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<CycleConfig | null>(null);
  const [observations, setObservations] = useState<Observation[]>([]);

  useEffect(() => {
    Promise.all([loadCycleConfig(), loadObservations()]).then(([c, obs]) => {
      setConfig(c);
      setObservations(obs);
      setLoading(false);
    });
  }, []);

  const saveAndSetConfig = useCallback(async (newConfig: CycleConfig) => {
    await saveCycleConfig(newConfig);
    setConfig(newConfig);
  }, []);

  const addObservation = useCallback(async (signals: SignalTag[], note?: string) => {
    const obs: Observation = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      signals,
      note,
    };
    const updated = [...observations, obs];
    await saveObservations(updated);
    setObservations(updated);

    // Re-estimate if we're in observation mode
    if (config && config.source === 'observation') {
      const allSignals = updated.flatMap(o => o.signals);
      const estimate = estimatePhaseFromSignals(allSignals);
      const newStart = syntheticPeriodStart(estimate.estimatedDay, config.cycleLength);
      await saveAndSetConfig({
        ...config,
        lastPeriodStart: newStart,
        confidence: estimate.confidence,
      });
    }
  }, [observations, config, saveAndSetConfig]);

  const reset = useCallback(async () => {
    await clearCycleConfig();
    await clearObservations();
    setConfig(null);
    setObservations([]);
  }, []);

  const isOnboarded = config !== null;
  const cycleLength = config?.cycleLength ?? 28;
  const cycleDay = config ? getCycleDay(config.lastPeriodStart, cycleLength) : 1;
  const phase = getPhase(cycleDay, cycleLength);
  const content = config ? getDayContent(cycleDay, cycleLength) : defaultContent;
  const daysUntilPeriod = getDaysUntilPeriod(cycleDay, cycleLength);
  const confidence = config?.confidence ?? 0;

  return {
    loading,
    isOnboarded,
    config,
    cycleDay,
    phase,
    content,
    daysUntilPeriod,
    confidence,
    observations,
    saveConfig: saveAndSetConfig,
    addObservation,
    reset,
  };
}
