import { Phase } from '../types';
import { colors } from './theme';

export interface PhaseInfo {
  key: Phase;
  name: string;
  shortName: string;
  emoji: string;
  color: string;
  dayRange: [number, number]; // for a standard 28-day cycle
}

export const phases: PhaseInfo[] = [
  {
    key: 'menstruation',
    name: 'Menstruation',
    shortName: 'Period',
    emoji: '\u{1F339}',
    color: colors.phase.menstruation,
    dayRange: [1, 5],
  },
  {
    key: 'follicular',
    name: 'Follicular Phase',
    shortName: 'Follicular',
    emoji: '\u{1F331}',
    color: colors.phase.follicular,
    dayRange: [6, 13],
  },
  {
    key: 'ovulation',
    name: 'Ovulation',
    shortName: 'Ovulation',
    emoji: '\u2728',
    color: colors.phase.ovulation,
    dayRange: [14, 16],
  },
  {
    key: 'luteal_early',
    name: 'Early Luteal Phase',
    shortName: 'Early Luteal',
    emoji: '\u{1F319}',
    color: colors.phase.luteal_early,
    dayRange: [17, 21],
  },
  {
    key: 'luteal_late',
    name: 'Late Luteal Phase',
    shortName: 'Late Luteal',
    emoji: '\u{1F30A}',
    color: colors.phase.luteal_late,
    dayRange: [22, 28],
  },
];

export const getPhaseInfo = (phase: Phase): PhaseInfo => {
  return phases.find((p) => p.key === phase)!;
};

export const categoryLabels: Record<string, { label: string; emoji: string }> = {
  food: { label: 'Food', emoji: '\u{1F373}' },
  date: { label: 'Date Ideas', emoji: '\u{1F496}' },
  physical_touch: { label: 'Physical Touch', emoji: '\u{1F917}' },
  words: { label: 'Words', emoji: '\u{1F4AC}' },
  logistics: { label: 'Logistics', emoji: '\u2705' },
  gift: { label: 'Gifts', emoji: '\u{1F381}' },
};
