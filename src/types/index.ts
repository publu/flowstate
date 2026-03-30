export type Phase = 'menstruation' | 'follicular' | 'ovulation' | 'luteal_early' | 'luteal_late';

export type ActionCategory = 'food' | 'date' | 'physical_touch' | 'words' | 'logistics' | 'gift';

export type Effort = 'low' | 'medium' | 'high';

export interface Action {
  text: string;
  category: ActionCategory;
  effort: Effort;
}

export interface HormoneLevels {
  estrogen: number;
  progesterone: number;
  testosterone: number;
  prostaglandins: number;
  serotonin: number;
}

export interface DayContent {
  day: number;
  phase: Phase;
  phaseName: string;
  biology: string;
  feelings: string[];
  actions: Action[];
  avoid: string[];
  hormones: HormoneLevels;
}

export interface CycleConfig {
  lastPeriodStart: string;
  cycleLength: number;
  onboardedAt: string;
}
