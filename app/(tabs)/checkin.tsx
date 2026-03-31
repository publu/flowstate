import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  withRepeat,
  withSequence,
  Easing,
  FadeIn,
  FadeInRight,
  FadeOutLeft,
  ZoomIn,
  BounceIn,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCycleData } from '../../src/hooks/useCycleData';
import { colors, spacing, radius, font } from '../../src/constants/theme';
import { pickDailyQuestions } from '../../src/data/signals';
import { AnimatedCounter } from '../../src/components/AnimatedCounter';
import { SignalTag } from '../../src/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_GAP = 10;
const CARD_WIDTH = (SCREEN_WIDTH - spacing.lg * 2 - CARD_GAP) / 2;

const QUESTIONS_PER_SESSION = 3;

// Color palette matching onboarding energy
const palette = [
  { bg: '#1E2A1E', border: '#4ADE80' },
  { bg: '#2A1E2A', border: '#F472B6' },
  { bg: '#1E1E2A', border: '#818CF8' },
  { bg: '#2A1E1E', border: '#FB923C' },
  { bg: '#2A2A1E', border: '#FACC15' },
  { bg: '#1E2828', border: '#2DD4BF' },
  { bg: '#281E28', border: '#C084FC' },
  { bg: '#28281E', border: '#F59E0B' },
];

function getCardColor(index: number) {
  return palette[index % palette.length];
}

function getStreak(observations: { date: string }[]): number {
  if (observations.length === 0) return 0;
  const dates = [...new Set(observations.map(o => o.date))].sort().reverse();
  const today = new Date().toISOString().split('T')[0];
  let streak = 0;
  let checkDate = new Date(today);
  for (const d of dates) {
    const expected = checkDate.toISOString().split('T')[0];
    if (d === expected) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (d < expected) {
      break;
    }
  }
  return streak;
}

// Animated pressable card with scale feedback
function OptionCard({
  emoji,
  label,
  colorIndex,
  selected,
  onPress,
  delay,
}: {
  emoji: string;
  label: string;
  colorIndex: number;
  selected: boolean;
  onPress: () => void;
  delay: number;
}) {
  const scale = useSharedValue(1);
  const c = getCardColor(colorIndex);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View entering={FadeInRight.delay(delay).duration(250)}>
      <Pressable
        onPressIn={() => { scale.value = withSpring(0.95, { damping: 15, stiffness: 300 }); }}
        onPressOut={() => { scale.value = withSpring(1, { damping: 15, stiffness: 300 }); }}
        onPress={onPress}
      >
        <Animated.View
          style={[
            styles.optionCard,
            animStyle,
            {
              backgroundColor: selected ? c.bg : colors.surface,
              borderColor: selected ? c.border : colors.border,
            },
          ]}
        >
          <Text style={styles.optionEmoji}>{emoji}</Text>
          <Text style={[
            styles.optionLabel,
            selected && { color: colors.textPrimary, fontWeight: font.weight.semibold },
          ]}>{label}</Text>
          {selected && (
            <View style={[styles.checkBadge, { backgroundColor: c.border }]}>
              <Text style={styles.checkMark}>{'\u2713'}</Text>
            </View>
          )}
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

// Milestone box with spring entrance + glow for earned
function MilestoneBox({ target, hit, index }: { target: number; hit: boolean; index: number }) {
  const glowOpacity = useSharedValue(hit ? 0.4 : 0);

  useEffect(() => {
    if (hit) {
      glowOpacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.sine) }),
          withTiming(0.4, { duration: 1200, easing: Easing.inOut(Easing.sine) }),
        ),
        -1,
        true,
      );
    }
  }, [hit]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const label = target === 3 ? 'days' : target === 7 ? 'week' : target === 14 ? '2 wks' : 'month';

  return (
    <Animated.View entering={ZoomIn.springify().delay(600 + index * 120)}>
      <View style={[styles.milestone, hit && styles.milestoneHit]}>
        {hit && (
          <Animated.View style={[styles.milestoneGlow, glowStyle]} />
        )}
        <Text style={[styles.milestoneNumber, hit && styles.milestoneNumberHit]}>
          {target}
        </Text>
        <Text style={[styles.milestoneLabel, hit && styles.milestoneLabelHit]}>
          {label}
        </Text>
      </View>
    </Animated.View>
  );
}

export default function CheckInScreen() {
  const insets = useSafeAreaInsets();
  const { addObservation, observations } = useCycleData();

  const today = new Date().toISOString().split('T')[0];
  const alreadyCheckedIn = observations.some(o => o.date === today);

  const questions = useMemo(() => pickDailyQuestions(QUESTIONS_PER_SESSION), []);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [collectedSignals, setCollectedSignals] = useState<SignalTag[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Set<number>>(new Set());
  const [justFinished, setJustFinished] = useState(false);

  const streak = getStreak(observations);

  // Progress bar animation
  const progress = (questionIndex + 1) / questions.length;
  const progressWidth = useSharedValue(0);
  useEffect(() => {
    progressWidth.value = withTiming(progress * 100, { duration: 400, easing: Easing.out(Easing.cubic) });
  }, [progress]);
  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%` as any,
  }));

  const toggleOption = (optionIndex: number) => {
    setSelectedOptions(prev => {
      const next = new Set(prev);
      if (next.has(optionIndex)) {
        next.delete(optionIndex);
      } else {
        next.add(optionIndex);
      }
      return next;
    });
  };

  const handleContinue = async () => {
    const question = questions[questionIndex];
    const signals: SignalTag[] = [];
    selectedOptions.forEach(i => {
      signals.push(...question.options[i].signals);
    });
    const updated = [...collectedSignals, ...signals];
    setCollectedSignals(updated);
    setSelectedOptions(new Set());

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      if (updated.length > 0) {
        await addObservation(updated);
      }
      setJustFinished(true);
    }
  };

  const handleSkip = () => {
    setSelectedOptions(new Set());
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      if (collectedSignals.length > 0) {
        addObservation(collectedSignals);
      }
      setJustFinished(true);
    }
  };

  // Completion / already checked in screen
  if (alreadyCheckedIn || justFinished) {
    const streakEmoji = streak >= 7 ? '\u{1F525}' : streak >= 3 ? '\u{1F4AA}' : '\u{2B50}';
    const streakMessage =
      streak >= 14 ? 'Unstoppable. She is lucky to have you.' :
      streak >= 7 ? 'One week strong. The algorithm loves you.' :
      streak >= 3 ? 'Building momentum. Keep it going.' :
      streak >= 1 ? 'Nice. Come back tomorrow.' :
      'First one down. See you tomorrow.';

    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.doneContent}>
          {/* Streak ring with animated counter */}
          <Animated.View entering={ZoomIn.springify().delay(100)} style={styles.streakRing}>
            <AnimatedCounter to={streak} duration={800} delay={300} style={styles.streakNumber} />
            <Text style={styles.streakLabel}>day streak</Text>
          </Animated.View>

          {/* Fire emoji with bounce + pulse for streak >= 7 */}
          <Animated.View entering={BounceIn.delay(500).duration(600)}>
            <FireEmoji emoji={streakEmoji} shouldPulse={streak >= 7} />
          </Animated.View>

          <Animated.View entering={FadeIn.delay(700).duration(400)}>
            <Text style={styles.doneTitle}>
              {justFinished ? 'Logged' : 'Already checked in'}
            </Text>
            <Text style={styles.doneSubtitle}>{streakMessage}</Text>
          </Animated.View>

          {/* Milestone boxes */}
          <View style={styles.milestones}>
            {[3, 7, 14, 30].map((target, index) => (
              <MilestoneBox key={target} target={target} hit={streak >= target} index={index} />
            ))}
          </View>

          <Animated.View entering={FadeIn.delay(1200).duration(400)} style={styles.nextCheckin}>
            <Text style={styles.nextCheckinIcon}>{'\u{23F0}'}</Text>
            <Text style={styles.nextCheckinText}>Next check in: tomorrow</Text>
          </Animated.View>

          <Animated.View entering={FadeIn.delay(1400).duration(400)}>
            <Text style={styles.accuracyHint}>
              {streak < 7
                ? `${7 - streak} more days and the predictions get really good`
                : streak < 14
                ? 'Accuracy is building. One more week and it will be dialed in.'
                : 'Full cycle mapped. Predictions are at peak accuracy.'
              }
            </Text>
          </Animated.View>
        </View>
      </View>
    );
  }

  // Question flow with card grid
  const question = questions[questionIndex];

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.xl }]}>
      {/* Animated progress bar */}
      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, progressStyle]} />
      </View>

      {/* Question with slide transition */}
      <Animated.View
        key={questionIndex}
        entering={FadeInRight.duration(300)}
        exiting={FadeOutLeft.duration(250)}
      >
        <Text style={styles.counter}>
          {questionIndex + 1} of {questions.length}
        </Text>

        <Text style={styles.question}>{question.question}</Text>
        <Text style={styles.questionHint}>Tap all that apply</Text>

        {/* Card grid like onboarding */}
        <View style={styles.optionGrid}>
          {question.options.map((option, i) => (
            <OptionCard
              key={i}
              emoji={option.emoji}
              label={option.label}
              colorIndex={questionIndex * 4 + i}
              selected={selectedOptions.has(i)}
              onPress={() => toggleOption(i)}
              delay={80 + i * 60}
            />
          ))}
        </View>
      </Animated.View>

      <View style={{ flex: 1 }} />

      {/* Bottom buttons */}
      <View style={[styles.bottomButtons, { paddingBottom: insets.bottom + spacing.xl }]}>
        <Pressable
          style={[
            styles.continueButton,
            selectedOptions.size === 0 && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>
            {questionIndex < questions.length - 1 ? 'Next' : 'Done'}
          </Text>
        </Pressable>

        <Pressable style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>
    </View>
  );
}

function FireEmoji({ emoji, shouldPulse }: { emoji: string; shouldPulse: boolean }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (shouldPulse) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.15, { duration: 800, easing: Easing.inOut(Easing.sine) }),
          withTiming(1.0, { duration: 800, easing: Easing.inOut(Easing.sine) }),
        ),
        -1,
        true,
      );
    }
  }, [shouldPulse]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animStyle}>
      <Text style={styles.doneEmoji}>{emoji}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },

  // Progress bar
  progressTrack: {
    height: 4,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 2,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 2,
  },

  // Question
  counter: {
    fontSize: font.size.xs,
    color: colors.accent,
    fontWeight: font.weight.semibold,
    letterSpacing: 1.5,
    marginBottom: spacing.sm,
  },
  question: {
    fontSize: 28,
    fontWeight: font.weight.bold,
    color: colors.textPrimary,
    lineHeight: 36,
    marginBottom: spacing.xs,
  },
  questionHint: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    opacity: 0.7,
    marginBottom: spacing.lg,
  },

  // Card grid
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CARD_GAP,
  },
  optionCard: {
    width: CARD_WIDTH,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    position: 'relative',
  },
  optionEmoji: {
    fontSize: 36,
    marginBottom: 6,
  },
  optionLabel: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  checkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    fontSize: 13,
    color: '#000',
    fontWeight: font.weight.bold,
  },

  // Bottom buttons
  bottomButtons: {
    gap: spacing.sm,
  },
  continueButton: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: 18,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    opacity: 0.3,
  },
  continueText: {
    fontSize: font.size.md,
    fontWeight: font.weight.bold,
    color: '#fff',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  skipText: {
    fontSize: font.size.md,
    color: colors.textSecondary,
    opacity: 0.6,
  },

  // Done screen
  doneContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  streakRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  streakNumber: {
    fontSize: 44,
    fontWeight: font.weight.bold,
    color: colors.textPrimary,
  },
  streakLabel: {
    fontSize: font.size.xs,
    color: colors.textSecondary,
    marginTop: -4,
  },
  doneEmoji: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  doneTitle: {
    fontSize: font.size.xl,
    fontWeight: font.weight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  doneSubtitle: {
    fontSize: font.size.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 24,
  },

  // Milestones
  milestones: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  milestone: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  milestoneHit: {
    backgroundColor: colors.accent + '20',
    borderColor: colors.accent,
  },
  milestoneGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.accent + '15',
    borderRadius: 12,
  },
  milestoneNumber: {
    fontSize: font.size.lg,
    fontWeight: font.weight.bold,
    color: colors.textSecondary,
  },
  milestoneNumberHit: {
    color: colors.accent,
  },
  milestoneLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: -2,
  },
  milestoneLabelHit: {
    color: colors.accent,
  },

  // Next check-in
  nextCheckin: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  nextCheckinIcon: {
    fontSize: 18,
  },
  nextCheckinText: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    fontWeight: font.weight.medium,
  },
  accuracyHint: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.lg,
    opacity: 0.6,
    lineHeight: 20,
    paddingHorizontal: spacing.lg,
  },
});
