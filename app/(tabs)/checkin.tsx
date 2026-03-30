import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCycleData } from '../../src/hooks/useCycleData';
import { colors, spacing, radius, font } from '../../src/constants/theme';
import { pickDailyQuestions } from '../../src/data/signals';
import { SignalTag } from '../../src/types';

const { width } = Dimensions.get('window');
const QUESTIONS_PER_SESSION = 3;

export default function CheckInScreen() {
  const insets = useSafeAreaInsets();
  const { addObservation, observations } = useCycleData();

  const questions = useMemo(() => pickDailyQuestions(QUESTIONS_PER_SESSION), []);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [collectedSignals, setCollectedSignals] = useState<SignalTag[]>([]);
  const [done, setDone] = useState(false);

  const todayObs = observations.filter(
    o => o.date === new Date().toISOString().split('T')[0]
  );

  const handleAnswer = async (signals: SignalTag[]) => {
    const updated = [...collectedSignals, ...signals];
    setCollectedSignals(updated);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      // Last question -- log everything
      await addObservation(updated);
      setDone(true);
    }
  };

  const handleSkip = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      // Skipped last question, still log what we have
      if (collectedSignals.length > 0) {
        addObservation(collectedSignals);
      }
      setDone(true);
    }
  };

  const handleReset = () => {
    setQuestionIndex(0);
    setCollectedSignals([]);
    setDone(false);
  };

  // Done state
  if (done) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.doneContent}>
          <Text style={styles.doneEmoji}>{'\u2705'}</Text>
          <Text style={styles.doneTitle}>Logged</Text>
          <Text style={styles.doneSubtitle}>
            {"This helps build a more accurate picture over time."}
          </Text>
          <TouchableOpacity
            style={styles.againButton}
            onPress={handleReset}
            activeOpacity={0.7}
          >
            <Text style={styles.againText}>Answer more questions</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const question = questions[questionIndex];
  const progress = (questionIndex + 1) / questions.length;

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.xl }]}>
      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      {/* Question counter */}
      <Text style={styles.counter}>
        {questionIndex + 1} of {questions.length}
      </Text>

      {/* Question */}
      <Text style={styles.question}>{question.question}</Text>

      {/* Answer buttons */}
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

      {/* Skip */}
      <TouchableOpacity
        style={[styles.skipButton, { marginBottom: insets.bottom + spacing.xl }]}
        onPress={handleSkip}
        activeOpacity={0.7}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Previous check-ins hint */}
      {todayObs.length > 0 && questionIndex === 0 && (
        <View style={[styles.hintCard, { marginBottom: insets.bottom + spacing.xl + 60 }]}>
          <Text style={styles.hintText}>
            {"You checked in earlier today. More data = better accuracy."}
          </Text>
        </View>
      )}
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
  hintCard: {
    position: 'absolute',
    bottom: 0,
    left: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  hintText: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  doneContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
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
    lineHeight: 22,
    paddingHorizontal: spacing.xl,
  },
  againButton: {
    marginTop: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  againText: {
    fontSize: font.size.md,
    color: colors.textSecondary,
  },
});
