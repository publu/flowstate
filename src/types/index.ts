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
  source: 'observation' | 'manual';
  confidence: number;
}

// Observation system
export type SignalTag =
  | 'tired' | 'cramps' | 'headache' | 'bloated' | 'emotional'
  | 'energetic' | 'social' | 'confident' | 'flirty' | 'glowing'
  | 'quiet' | 'withdrawn' | 'cravings' | 'irritable' | 'anxious'
  | 'happy' | 'creative' | 'focused' | 'acne' | 'tender_breasts'
  | 'normal';

export interface SignalOption {
  label: string;
  signals: SignalTag[];
  emoji: string;
}

export interface Observation {
  id: string;
  date: string;
  signals: SignalTag[];
  note?: string;
}

export interface PhaseEstimate {
  phase: Phase;
  confidence: number;
  estimatedDay: number;
  probabilities: Record<Phase, number>;
}

export interface QuickQuestion {
  question: string;
  options: {
    label: string;
    signals: SignalTag[];
    emoji: string;
  }[];
}

// Phase indicators (fun meters)
export type IndicatorKey =
  | 'cuddle_factor'
  | 'romance_level'
  | 'adventure_readiness'
  | 'patience_meter'
  | 'spicy_meter'
  | 'nesting_energy'
  | 'social_battery';

export interface PhaseIndicator {
  key: IndicatorKey;
  label: string;
  emoji: string;
  value: number;
  flavor: string;
}

// Encyclopedia
export interface EncyclopediaAction {
  id: string;
  text: string;
  detail: string;
  category: ActionCategory;
  effort: Effort;
  proTip?: string;
}

export interface AvoidItem {
  text: string;
  why: string;
  severity: 'gentle' | 'serious' | 'nuclear';
}

export interface PhaseEncyclopedia {
  phase: Phase;
  indicators: PhaseIndicator[];
  actions: Record<ActionCategory, EncyclopediaAction[]>;
  avoids: AvoidItem[];
}
