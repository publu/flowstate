import AsyncStorage from '@react-native-async-storage/async-storage';
import { CycleConfig, Observation } from '../types';

const CONFIG_KEY = '@flowstate/cycle_config';
const OBS_KEY = '@flowstate/observations';

export async function saveCycleConfig(config: CycleConfig): Promise<void> {
  await AsyncStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

export async function loadCycleConfig(): Promise<CycleConfig | null> {
  const raw = await AsyncStorage.getItem(CONFIG_KEY);
  if (!raw) return null;
  const config = JSON.parse(raw) as CycleConfig;
  // Migration: old configs may lack these fields
  if (!config.source) config.source = 'manual';
  if (config.confidence === undefined) config.confidence = 1;
  return config;
}

export async function clearCycleConfig(): Promise<void> {
  await AsyncStorage.removeItem(CONFIG_KEY);
}

export async function saveObservations(observations: Observation[]): Promise<void> {
  await AsyncStorage.setItem(OBS_KEY, JSON.stringify(observations));
}

export async function loadObservations(): Promise<Observation[]> {
  const raw = await AsyncStorage.getItem(OBS_KEY);
  if (!raw) return [];
  return JSON.parse(raw) as Observation[];
}

export async function clearObservations(): Promise<void> {
  await AsyncStorage.removeItem(OBS_KEY);
}
