import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCycleData } from '../../src/hooks/useCycleData';
import { colors, spacing, radius, font } from '../../src/constants/theme';
import { pickDailyQuestions } from '../../src/data/signals';
import { SignalTag } from '../../src/types';

const QUESTIONS_PER_SESSION = 3;

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

export default function CheckInScreen() {
  const insets = useSafeAreaInsets();
  const { addObservation, observations } = useCycleData();

  const today = new Date().toISOString().split('T')[0];
  const alreadyCheckedIn = observations.some(o => o.date === today);

  const questions = useMemo(() => pickDailyQuestions(QUESTIONS_PER_SESSION), []);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [collectedSignals, setCollectedSignals] = useState<SignalTag[]>([]);
  const [justFinished, setJustFinished] = useState(false);

  const streak = getStreak(observations);

  const handleAnswer = async (signals: SignalTag[]) => {
    const updated = [...collectedSignals, ...signals];
    setCollectedSignals(updated);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      await addObservation(updated);
      setJustFinished(true);
    }
  };

  const handleSkip = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      if (collectedSignals.length > 0) {
        addObservation(collectedSignals);
      }
      setJustFinished(true);
    }
  };

  // Already checked in today OR just finished
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
          {/* Streak circle */}
          <View style={styles.streakRing}>
            <Text style={styles.streakNumber}>{streak}</Text>
            <Text style={styles.streakLabel}>day streak</Text>
          </View>

          <Text style={styles.doneEmoji}>{streakEmoji}</Text>
          <Text style={styles.doneTitle}>
            {justFinished ? 'Logged' : 'Already checked in'}
          </Text>
          <Text style={styles.doneSubtitle}>{streakMessage}</Text>

          {/* Streak milestones */}
          <View style={styles.milestones}>
            {[3, 7, 14, 30].map(target => {
              const hit = streak >= target;
              return (
                <View key={target} style={[styles.milestone, hit && styles.milestoneHit]}>
                  <Text style={[styles.milestoneNumber, hit && styles.milestoneNumberHit]}>
                    {target}
                  </Text>
                  <Text style={[styles.milestoneLabel, hit && styles.milestoneLabelHit]}>
                    {target === 3 ? 'days' : target === 7 ? 'week' : target === 14 ? '2 wks' : 'month'}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.nextCheckin}>
            <Text style={styles.nextCheckinIcon}>{'\u{23F0}'}</Text>
            <Text style={styles.nextCheckinText}>Next check in: tomorrow</Text>
          </View>

          <Text style={styles.accuracyHint}>
            {streak < 7
              ? `${7 - streak} more days and the predictions get really good`
              : streak < 14
              ? 'Accuracy is building. One more week and it will be dialed in.'
              : 'Full cycle mapped. Predictions are at peak accuracy.'
            }
          </Text>
        </View>
      </View>
    );
  }

  // Question flow
  const question = questions[questionIndex];
  const progress = (questionIndex + 1) / questions.length;

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.xl }]}>
      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      <Text style={styles.counter}>
        {questionIndex + 1} of {questions.length}
      </Text>

      <Text style={styles.question}>{question.question}</Text>

      <View style={styles.answers}>
        {question.options.map((option, i) => (
          <TouchableOpacity
            key={i}
            style={styles.answerButton}
            onPress={() => handleAnswer(option.signals)}
            activeOpacity={0.7}
          >
            <Text style={styles.answerEmoji}>{option.emoji}</Text>
            <Text style={styles.answerLabel}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flex: 1 }} />

      <TouchableOpacity
        style={[styles.skipButton, { marginBottom: insets.bottom + spacing.xl }]}
        onPress={handleSkip}
        activeOpacity={0.7}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
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
  counter: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  question: {
    fontSize: font.size.xl,
    fontWeight: font.weight.bold,
    color: colors.textPrimary,
    lineHeight: 36,
    marginBottom: spacing.xl,
  },
  answers: {
    gap: spacing.sm,
  },
  answerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingVertical: 18,
    paddingHorizontal: spacing.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  answerEmoji: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  answerLabel: {
    fontSize: font.size.lg,
    color: colors.textPrimary,
    fontWeight: font.weight.medium,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  skipText: {
    fontSize: font.size.md,
    color: colors.textSecondary,
    opacity: 0.6,
  },
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
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  doneTitle: {
    fontSize: font.size.xl,
    fontWeight: font.weight.bold,
    color: colors.textPrimary,
  },
  doneSubtitle: {
    fontSize: font.size.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 24,
  },
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
  },
  milestoneHit: {
    backgroundColor: colors.accent + '20',
    borderColor: colors.accent,
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
