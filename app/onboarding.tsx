import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius, font } from '../src/constants/theme';
import { vibeCards } from '../src/data/signals';
import { estimatePhaseFromSignals, syntheticPeriodStart } from '../src/utils/signals';
import { getPhaseInfo } from '../src/constants/phases';
import { useCycleData } from '../src/hooks/useCycleData';

const { width } = Dimensions.get('window');
const CARD_GAP = spacing.sm;
const CARD_WIDTH = (width - spacing.lg * 2 - CARD_GAP) / 2;

export default function Onboarding() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { saveConfig } = useCycleData();
  const [step, setStep] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleVibeSelect = async (index: number) => {
    setSelectedIndex(index);
  };

  const handleContinue = async () => {
    if (step === 0) {
      setStep(1);
      return;
    }

    const signals = selectedIndex !== null ? vibeCards[selectedIndex].signals : [];
    const estimate = estimatePhaseFromSignals(signals);
    const periodStart = syntheticPeriodStart(estimate.estimatedDay);

    await saveConfig({
      lastPeriodStart: periodStart,
      cycleLength: 28,
      onboardedAt: new Date().toISOString(),
      source: 'observation',
      confidence: estimate.confidence,
    });

    router.replace('/(tabs)');
  };

  // Welcome screen
  if (step === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.welcomeContent}>
          <Text style={styles.logo}>FlowState</Text>
          <Text style={styles.tagline}>understand her better</Text>
          <Text style={styles.subtitle}>
            {'No awkward questions.\nJust tell us what you see.'}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, { marginBottom: insets.bottom + spacing.xl }]}
          onPress={() => setStep(1)}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Vibe selection
  const selected = selectedIndex !== null ? vibeCards[selectedIndex] : null;
  const estimate = selected ? estimatePhaseFromSignals(selected.signals) : null;
  const phaseInfo = estimate ? getPhaseInfo(estimate.phase) : null;

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.xl }]}>
      <View style={styles.questionSection}>
        <Text style={styles.question}>{"What's the vibe\nright now?"}</Text>
      </View>

      <View style={styles.grid}>
        {vibeCards.map((card, index) => {
          const isSelected = selectedIndex === index;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.vibeCard,
                isSelected && styles.vibeCardSelected,
              ]}
              onPress={() => handleVibeSelect(index)}
              activeOpacity={0.7}
            >
              <Text style={styles.vibeEmoji}>{card.emoji}</Text>
              <Text style={[
                styles.vibeLabel,
                isSelected && styles.vibeLabelSelected,
              ]}>
                {card.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {estimate && phaseInfo && (
        <View style={[styles.previewCard, { borderColor: phaseInfo.color + '40' }]}>
          <Text style={[styles.previewPhase, { color: phaseInfo.color }]}>
            {phaseInfo.emoji} Probably {phaseInfo.shortName.toLowerCase()}
          </Text>
          <Text style={styles.previewHint}>
            {"We'll get more accurate as you check in"}
          </Text>
        </View>
      )}

      <View style={{ flex: 1 }} />

      <TouchableOpacity
        style={[
          styles.button,
          { marginBottom: insets.bottom + spacing.xl },
          selectedIndex === null && styles.buttonDisabled,
        ]}
        onPress={handleContinue}
        activeOpacity={0.8}
        disabled={selectedIndex === null}
      >
        <Text style={styles.buttonText}>
          {selected?.signals.length === 0 ? "I'll figure it out" : "Let's go"}
        </Text>
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
  welcomeContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 52,
    fontWeight: font.weight.bold,
    color: colors.textPrimary,
    letterSpacing: -1.5,
  },
  tagline: {
    fontSize: font.size.lg,
    color: colors.accent,
    marginTop: spacing.sm,
    fontWeight: font.weight.medium,
  },
  subtitle: {
    fontSize: font.size.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: spacing.xxl,
    opacity: 0.6,
  },
  questionSection: {
    marginBottom: spacing.lg,
  },
  question: {
    fontSize: font.size.xl,
    fontWeight: font.weight.bold,
    color: colors.textPrimary,
    lineHeight: 36,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CARD_GAP,
  },
  vibeCard: {
    width: CARD_WIDTH,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 110,
  },
  vibeCardSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentDim,
  },
  vibeEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  vibeLabel: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  vibeLabelSelected: {
    color: colors.textPrimary,
    fontWeight: font.weight.medium,
  },
  previewCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
    borderWidth: 1,
  },
  previewPhase: {
    fontSize: font.size.lg,
    fontWeight: font.weight.semibold,
  },
  previewHint: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    opacity: 0.7,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  buttonText: {
    fontSize: font.size.md,
    fontWeight: font.weight.semibold,
    color: colors.textPrimary,
  },
});
