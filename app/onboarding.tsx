import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius, font } from '../src/constants/theme';
import { vibeCards } from '../src/data/signals';
import { estimatePhaseFromSignals, syntheticPeriodStart } from '../src/utils/signals';
import { getPhaseInfo } from '../src/constants/phases';
import { useCycleData } from '../src/hooks/useCycleData';

const { width } = Dimensions.get('window');
const CARD_GAP = 12;
const CARD_WIDTH = (width - spacing.lg * 2 - CARD_GAP) / 2;

const cardColors = [
  { bg: '#1E2A1E', border: '#4ADE80', glow: '#4ADE8020' },  // in her element - green energy
  { bg: '#2A1E2A', border: '#F472B6', glow: '#F472B620' },  // really sweet - pink
  { bg: '#1E1E2A', border: '#818CF8', glow: '#818CF820' },  // low key - indigo calm
  { bg: '#2A1E1E', border: '#FB923C', glow: '#FB923C20' },  // not feeling great - warm orange
  { bg: '#2A2A1E', border: '#FACC15', glow: '#FACC1520' },  // moody - amber
  { bg: '#1E2228', border: '#94A3B8', glow: '#94A3B820' },  // no idea - neutral slate
];

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
          <View style={styles.logoGlow}>
            <Text style={styles.logoIcon}>{'\u{1F33A}'}</Text>
          </View>
          <Text style={styles.logo}>FlowState</Text>
          <Text style={styles.tagline}>understand her better</Text>
          <View style={styles.divider} />
          <Text style={styles.subtitle}>
            {'You tell us what you notice.\nWe tell you what it means\nand what to do about it.'}
          </Text>
          <View style={styles.featureList}>
            <View style={styles.featureRow}>
              <Text style={styles.featureIcon}>{'\u{1F9E0}'}</Text>
              <Text style={styles.featureText}>Science-backed hormone insights</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.featureIcon}>{'\u{1F4A1}'}</Text>
              <Text style={styles.featureText}>Daily action items tailored to her phase</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.featureIcon}>{'\u{1F44B}'}</Text>
              <Text style={styles.featureText}>15 seconds a day, zero awkwardness</Text>
            </View>
          </View>
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
    <ScrollView
      style={[styles.container, { paddingTop: insets.top + spacing.lg }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.questionSection}>
        <Text style={styles.stepLabel}>STEP 1 OF 1</Text>
        <Text style={styles.question}>{"What's the vibe\nright now?"}</Text>
        <Text style={styles.questionHint}>{"Just pick the closest one. No wrong answers."}</Text>
      </View>

      <View style={styles.grid}>
        {vibeCards.map((card, index) => {
          const isSelected = selectedIndex === index;
          const c = cardColors[index];
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.vibeCard,
                { backgroundColor: isSelected ? c.bg : colors.surface, borderColor: isSelected ? c.border : colors.border },
                isSelected && { shadowColor: c.border, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 12 },
              ]}
              onPress={() => handleVibeSelect(index)}
              activeOpacity={0.7}
            >
              <Text style={styles.vibeEmoji}>{card.emoji}</Text>
              <Text style={[
                styles.vibeLabel,
                isSelected && { color: colors.textPrimary, fontWeight: font.weight.semibold },
              ]}>
                {card.label}
              </Text>
              {isSelected && (
                <View style={[styles.selectedDot, { backgroundColor: c.border }]} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {estimate && phaseInfo && (
        <View style={[styles.previewCard, { borderColor: phaseInfo.color + '60', backgroundColor: phaseInfo.color + '10' }]}>
          <Text style={[styles.previewPhase, { color: phaseInfo.color }]}>
            {phaseInfo.emoji} Looks like {phaseInfo.shortName.toLowerCase()} phase
          </Text>
          <Text style={styles.previewHint}>
            {"Check in daily and we'll get sharper over time"}
          </Text>
        </View>
      )}

      <View style={{ height: spacing.lg }} />

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
          {selected?.signals.length === 0 ? "I'll figure it out" : "Show me what to do"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  welcomeContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoGlow: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.accent + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoIcon: {
    fontSize: 40,
  },
  logo: {
    fontSize: 48,
    fontWeight: font.weight.bold,
    color: colors.textPrimary,
    letterSpacing: -1.5,
  },
  tagline: {
    fontSize: font.size.lg,
    color: colors.accent,
    marginTop: spacing.xs,
    fontWeight: font.weight.medium,
  },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: colors.border,
    marginVertical: spacing.xl,
  },
  subtitle: {
    fontSize: font.size.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
  },
  featureList: {
    marginTop: spacing.xl,
    gap: spacing.md,
    width: '100%',
    paddingHorizontal: spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  featureText: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    flex: 1,
  },
  questionSection: {
    marginBottom: spacing.lg,
  },
  stepLabel: {
    fontSize: font.size.xs,
    color: colors.accent,
    fontWeight: font.weight.semibold,
    letterSpacing: 1.5,
    marginBottom: spacing.sm,
  },
  question: {
    fontSize: 32,
    fontWeight: font.weight.bold,
    color: colors.textPrimary,
    lineHeight: 40,
  },
  questionHint: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    opacity: 0.7,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CARD_GAP,
  },
  vibeCard: {
    width: CARD_WIDTH,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 130,
  },
  vibeEmoji: {
    fontSize: 42,
    marginBottom: spacing.sm,
  },
  vibeLabel: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  selectedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: spacing.sm,
  },
  previewCard: {
    alignItems: 'center',
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
    paddingVertical: 18,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.25,
  },
  buttonText: {
    fontSize: font.size.md,
    fontWeight: font.weight.bold,
    color: '#fff',
  },
});
