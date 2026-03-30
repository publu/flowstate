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
import { SignalTag } from '../src/types';

const { width } = Dimensions.get('window');
const CARD_GAP = 10;
const CARD_WIDTH = (width - spacing.lg * 2 - CARD_GAP) / 2;

// Rotating color palette for cards
const palette = [
  { bg: '#1E2A1E', border: '#4ADE80' },
  { bg: '#2A1E2A', border: '#F472B6' },
  { bg: '#1E1E2A', border: '#818CF8' },
  { bg: '#2A1E1E', border: '#FB923C' },
  { bg: '#2A2A1E', border: '#FACC15' },
  { bg: '#1E2828', border: '#2DD4BF' },
  { bg: '#281E28', border: '#C084FC' },
  { bg: '#28281E', border: '#F59E0B' },
  { bg: '#1E2228', border: '#60A5FA' },
  { bg: '#281E1E', border: '#F87171' },
  { bg: '#1E281E', border: '#34D399' },
  { bg: '#28221E', border: '#FB7185' },
];

function getCardColor(index: number) {
  return palette[index % palette.length];
}

export default function Onboarding() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { saveConfig } = useCycleData();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggleCard = (index: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleContinue = async () => {
    if (step === 0) {
      setStep(1);
      return;
    }

    // Combine signals from all selected cards
    const allSignals: SignalTag[] = [];
    selected.forEach(i => {
      allSignals.push(...vibeCards[i].signals);
    });

    const estimate = estimatePhaseFromSignals(allSignals);
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

  // Combine signals from selection for preview
  const allSelectedSignals: SignalTag[] = [];
  selected.forEach(i => {
    allSelectedSignals.push(...vibeCards[i].signals);
  });
  const estimate = allSelectedSignals.length > 0 ? estimatePhaseFromSignals(allSelectedSignals) : null;
  const phaseInfo = estimate ? getPhaseInfo(estimate.phase) : null;

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

  // Vibe selection (multi-select)
  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.md }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.questionSection}>
          <Text style={styles.stepLabel}>STEP 1 OF 1</Text>
          <Text style={styles.question}>{"What's going on\nwith her?"}</Text>
          <Text style={styles.questionHint}>{"Pick everything that fits. Tap as many as you want."}</Text>
        </View>

        <View style={styles.grid}>
          {vibeCards.map((card, index) => {
            const isSelected = selected.has(index);
            const c = getCardColor(index);
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.vibeCard,
                  {
                    backgroundColor: isSelected ? c.bg : colors.surface,
                    borderColor: isSelected ? c.border : colors.border,
                  },
                ]}
                onPress={() => toggleCard(index)}
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
                  <View style={[styles.checkBadge, { backgroundColor: c.border }]}>
                    <Text style={styles.checkMark}>{'\u2713'}</Text>
                  </View>
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
              {"Based on " + selected.size + " signal" + (selected.size === 1 ? '' : 's') + ". Check in daily to sharpen this."}
            </Text>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky bottom button */}
      <View style={[styles.stickyBottom, { paddingBottom: insets.bottom + spacing.md }]}>
        {selected.size > 0 && (
          <Text style={styles.selectedCount}>
            {selected.size} selected
          </Text>
        )}
        <TouchableOpacity
          style={[
            styles.button,
            selected.size === 0 && styles.buttonDisabled,
          ]}
          onPress={handleContinue}
          activeOpacity={0.8}
          disabled={selected.size === 0}
        >
          <Text style={styles.buttonText}>
            {selected.size === 0 ? "Pick at least one" : "Show me what to do"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  welcomeContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
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
    padding: spacing.md,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 110,
    position: 'relative',
  },
  vibeEmoji: {
    fontSize: 36,
    marginBottom: 6,
  },
  vibeLabel: {
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
    textAlign: 'center',
  },
  stickyBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background + 'F0',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  selectedCount: {
    fontSize: font.size.sm,
    color: colors.accent,
    textAlign: 'center',
    marginBottom: spacing.sm,
    fontWeight: font.weight.medium,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: 18,
    alignItems: 'center',
    marginHorizontal: spacing.lg,
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
