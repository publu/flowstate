import AsyncStorage from '@react-native-async-storage/async-storage';
import { CycleConfig } from '../types';

const STORAGE_KEY = '@flowstate/cycle_config';

export async function saveCycleConfig(config: CycleConfig): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export async function loadCycleConfig(): Promise<CycleConfig | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  return JSON.parse(raw) as CycleConfig;
}

export async function clearCycleConfig(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
