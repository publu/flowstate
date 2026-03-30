import { SignalTag, SignalOption, Phase, QuickQuestion } from '../types';

// ============================================================
// ONBOARDING: Big vibe cards (single tap, zero typing)
// ============================================================
export const vibeCards: SignalOption[] = [
  // Energy & mood
  { label: "She's on fire", signals: ['energetic', 'confident'], emoji: '\u{1F525}' },
  { label: "Really happy", signals: ['happy', 'energetic'], emoji: '\u{1F60D}' },
  { label: "Super social", signals: ['social', 'energetic', 'confident'], emoji: '\u{1F389}' },
  { label: "Calm & content", signals: ['happy', 'normal'], emoji: '\u{1F60C}' },
  { label: "Creative mode", signals: ['creative', 'focused', 'energetic'], emoji: '\u{1F3A8}' },
  { label: "Low energy", signals: ['tired'], emoji: '\u{1F4A4}' },
  { label: "Kinda moody", signals: ['irritable', 'emotional'], emoji: '\u{1F624}' },
  { label: "Anxious / stressed", signals: ['anxious', 'irritable'], emoji: '\u{1F630}' },
  { label: "Emotional / teary", signals: ['emotional', 'withdrawn'], emoji: '\u{1F97A}' },
  // Physical
  { label: "Cramps", signals: ['cramps', 'tired'], emoji: '\u{1F915}' },
  { label: "Headache", signals: ['headache', 'tired'], emoji: '\u{1F616}' },
  { label: "Bloated", signals: ['bloated'], emoji: '\u{1F623}' },
  { label: "Skin breaking out", signals: ['acne'], emoji: '\u{1F62C}' },
  { label: "She looks glowing", signals: ['glowing', 'confident'], emoji: '\u2728' },
  // Appetite & cravings
  { label: "Craving sweets", signals: ['cravings'], emoji: '\u{1F36B}' },
  { label: "Eating everything", signals: ['cravings', 'tired'], emoji: '\u{1F355}' },
  { label: "Not hungry", signals: ['quiet', 'tired'], emoji: '\u{1F645}' },
  // Affection & social
  { label: "Being flirty", signals: ['flirty', 'confident'], emoji: '\u{1F48B}' },
  { label: "Really cuddly", signals: ['flirty', 'happy'], emoji: '\u{1F917}' },
  { label: "Wants space", signals: ['withdrawn', 'quiet'], emoji: '\u{1F6B6}' },
  { label: "Wants to stay in", signals: ['quiet', 'withdrawn'], emoji: '\u{1F3E0}' },
  { label: "Sleeping a lot", signals: ['tired', 'withdrawn'], emoji: '\u{1F634}' },
  { label: "Restless at night", signals: ['anxious', 'tired'], emoji: '\u{1F319}' },
  { label: "No idea yet", signals: [], emoji: '\u{1F937}' },
];

// ============================================================
// DAILY CHECK-IN: Quick questions with tappable answers
// App picks 3 random questions per session
// ============================================================
export const dailyQuestions: QuickQuestion[] = [
  {
    question: "How's her energy today?",
    options: [
      { label: 'On fire', signals: ['energetic'], emoji: '\u{1F525}' },
      { label: 'Normal', signals: ['normal'], emoji: '\u{1F44D}' },
      { label: 'Low', signals: ['tired'], emoji: '\u{1F634}' },
      { label: 'Crashed', signals: ['tired', 'withdrawn'], emoji: '\u{1F4A4}' },
    ],
  },
  {
    question: "What's her mood like?",
    options: [
      { label: 'Happy', signals: ['happy'], emoji: '\u{1F60A}' },
      { label: 'Chill', signals: ['normal'], emoji: '\u{1F60C}' },
      { label: 'Sensitive', signals: ['emotional'], emoji: '\u{1F97A}' },
      { label: 'On edge', signals: ['irritable'], emoji: '\u{1F624}' },
    ],
  },
  {
    question: 'Is she craving anything?',
    options: [
      { label: 'Sweets', signals: ['cravings'], emoji: '\u{1F36B}' },
      { label: 'Comfort food', signals: ['cravings'], emoji: '\u{1F355}' },
      { label: 'Not really', signals: [], emoji: '\u{1F937}' },
    ],
  },
  {
    question: 'Does she want to go out?',
    options: [
      { label: 'Yeah', signals: ['social', 'energetic'], emoji: '\u{1F389}' },
      { label: 'Staying in', signals: ['quiet', 'withdrawn'], emoji: '\u{1F3E0}' },
      { label: 'Not sure', signals: [], emoji: '\u{1F937}' },
    ],
  },
  {
    question: 'How are things between you two?',
    options: [
      { label: 'Great', signals: ['happy'], emoji: '\u{1F495}' },
      { label: 'Fine', signals: ['normal'], emoji: '\u{1F44D}' },
      { label: 'A little tense', signals: ['irritable'], emoji: '\u{1F62C}' },
      { label: 'We argued', signals: ['irritable', 'emotional'], emoji: '\u{1F4A5}' },
    ],
  },
  {
    question: 'How does she look today?',
    options: [
      { label: 'Glowing', signals: ['glowing', 'confident'], emoji: '\u2728' },
      { label: 'Normal', signals: ['normal'], emoji: '\u{1F44D}' },
      { label: 'Tired', signals: ['tired'], emoji: '\u{1F634}' },
      { label: 'Breaking out', signals: ['acne'], emoji: '\u{1F62C}' },
    ],
  },
  {
    question: 'Any physical complaints?',
    options: [
      { label: 'Cramps', signals: ['cramps'], emoji: '\u{1F915}' },
      { label: 'Headache', signals: ['headache'], emoji: '\u{1F915}' },
      { label: 'Bloated', signals: ['bloated'], emoji: '\u{1F623}' },
      { label: 'Nope', signals: [], emoji: '\u{1F44D}' },
    ],
  },
  {
    question: 'Is she being affectionate?',
    options: [
      { label: 'Very', signals: ['flirty', 'confident'], emoji: '\u{1F60F}' },
      { label: 'Normal', signals: ['normal'], emoji: '\u{1F917}' },
      { label: 'Not really', signals: ['withdrawn'], emoji: '\u{1F610}' },
      { label: 'Wants space', signals: ['withdrawn', 'quiet'], emoji: '\u{1F6B6}' },
    ],
  },
  {
    question: 'How did she sleep?',
    options: [
      { label: 'Great', signals: ['energetic'], emoji: '\u{1F60C}' },
      { label: 'Fine', signals: ['normal'], emoji: '\u{1F44D}' },
      { label: 'Restless', signals: ['anxious', 'tired'], emoji: '\u{1F62B}' },
      { label: 'No clue', signals: [], emoji: '\u{1F937}' },
    ],
  },
  {
    question: 'Is she excited about anything?',
    options: [
      { label: 'Yeah, buzzing', signals: ['energetic', 'happy'], emoji: '\u{1F929}' },
      { label: 'Kinda', signals: ['happy'], emoji: '\u{1F642}' },
      { label: 'Not really', signals: ['quiet'], emoji: '\u{1F610}' },
      { label: 'Opposite', signals: ['withdrawn', 'tired'], emoji: '\u{1F614}' },
    ],
  },
];

// ============================================================
// SIGNAL -> PHASE WEIGHTS
// ============================================================
export const signalPhaseWeights: Record<SignalTag, Record<Phase, number>> = {
  tired:          { menstruation: 0.30, follicular: 0.05, ovulation: 0.00, luteal_early: 0.15, luteal_late: 0.50 },
  cramps:         { menstruation: 0.80, follicular: 0.00, ovulation: 0.10, luteal_early: 0.00, luteal_late: 0.10 },
  headache:       { menstruation: 0.35, follicular: 0.05, ovulation: 0.10, luteal_early: 0.10, luteal_late: 0.40 },
  bloated:        { menstruation: 0.15, follicular: 0.00, ovulation: 0.05, luteal_early: 0.20, luteal_late: 0.60 },
  emotional:      { menstruation: 0.20, follicular: 0.05, ovulation: 0.05, luteal_early: 0.15, luteal_late: 0.55 },
  energetic:      { menstruation: 0.00, follicular: 0.40, ovulation: 0.45, luteal_early: 0.10, luteal_late: 0.05 },
  social:         { menstruation: 0.05, follicular: 0.35, ovulation: 0.40, luteal_early: 0.15, luteal_late: 0.05 },
  confident:      { menstruation: 0.05, follicular: 0.25, ovulation: 0.50, luteal_early: 0.15, luteal_late: 0.05 },
  flirty:         { menstruation: 0.05, follicular: 0.20, ovulation: 0.55, luteal_early: 0.15, luteal_late: 0.05 },
  glowing:        { menstruation: 0.00, follicular: 0.25, ovulation: 0.55, luteal_early: 0.15, luteal_late: 0.05 },
  quiet:          { menstruation: 0.20, follicular: 0.05, ovulation: 0.00, luteal_early: 0.35, luteal_late: 0.40 },
  withdrawn:      { menstruation: 0.25, follicular: 0.05, ovulation: 0.00, luteal_early: 0.25, luteal_late: 0.45 },
  cravings:       { menstruation: 0.10, follicular: 0.00, ovulation: 0.05, luteal_early: 0.20, luteal_late: 0.65 },
  irritable:      { menstruation: 0.15, follicular: 0.05, ovulation: 0.00, luteal_early: 0.15, luteal_late: 0.65 },
  anxious:        { menstruation: 0.15, follicular: 0.05, ovulation: 0.05, luteal_early: 0.20, luteal_late: 0.55 },
  happy:          { menstruation: 0.05, follicular: 0.35, ovulation: 0.40, luteal_early: 0.15, luteal_late: 0.05 },
  creative:       { menstruation: 0.05, follicular: 0.30, ovulation: 0.35, luteal_early: 0.25, luteal_late: 0.05 },
  focused:        { menstruation: 0.05, follicular: 0.35, ovulation: 0.30, luteal_early: 0.25, luteal_late: 0.05 },
  acne:           { menstruation: 0.10, follicular: 0.05, ovulation: 0.05, luteal_early: 0.25, luteal_late: 0.55 },
  tender_breasts: { menstruation: 0.10, follicular: 0.00, ovulation: 0.10, luteal_early: 0.30, luteal_late: 0.50 },
  normal:         { menstruation: 0.10, follicular: 0.35, ovulation: 0.20, luteal_early: 0.25, luteal_late: 0.10 },
};

export const phaseMidpoint: Record<Phase, number> = {
  menstruation: 3,
  follicular: 10,
  ovulation: 15,
  luteal_early: 19,
  luteal_late: 25,
};

/**
 * Pick N random questions from the pool, shuffled.
 * Uses a seeded approach based on date so the same 3 show all day.
 */
export function pickDailyQuestions(count: number = 3): QuickQuestion[] {
  const today = new Date().toISOString().split('T')[0];
  // Simple hash from date string for consistent daily selection
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = ((hash << 5) - hash) + today.charCodeAt(i);
    hash |= 0;
  }
  const shuffled = [...dailyQuestions].sort((a, b) => {
    const ha = ((hash * 31 + a.question.length) | 0) % 1000;
    const hb = ((hash * 31 + b.question.length) | 0) % 1000;
    return ha - hb;
  });
  return shuffled.slice(0, count);
}
