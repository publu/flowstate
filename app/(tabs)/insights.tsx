import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCycleData } from '../../src/hooks/useCycleData';
import { colors, spacing, radius, font } from '../../src/constants/theme';
import { phases } from '../../src/constants/phases';
import { CycleRing } from '../../src/components/CycleRing';
import { HormoneChart } from '../../src/components/HormoneChart';

export default function InsightsScreen() {
  const insets = useSafeAreaInsets();
  const { cycleDay, phase, content, daysUntilPeriod, config, confidence } = useCycleData();
  const cycleLength = config?.cycleLength ?? 28;

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top + spacing.md }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Animated.Text entering={FadeIn.duration(300)} style={styles.title}>Cycle</Animated.Text>

      <Animated.View entering={FadeInUp.delay(100).duration(400)} style={styles.ringContainer}>
        <CycleRing
          cycleDay={cycleDay}
          cycleLength={cycleLength}
          phase={phase}
        />
      </Animated.View>

      {confidence > 0 && confidence < 0.7 && (
        <Animated.View entering={FadeInUp.delay(200).duration(400)} style={styles.hintCard}>
          <Text style={styles.hintText}>
            {"Rough estimate. Keep checking in to sharpen this."}
          </Text>
        </Animated.View>
      )}

      {/* Phase legend */}
      <Animated.View entering={FadeInUp.delay(300).duration(400)} style={styles.card}>
        <Text style={styles.cardTitle}>Phases</Text>
        {phases.map((p) => {
          const isActive = p.key === phase;
          return (
            <View key={p.key} style={[styles.phaseRow, isActive && styles.phaseRowActive]}>
              <View style={[styles.phaseColor, { backgroundColor: p.color }]} />
              <Text style={[styles.phaseName, isActive && styles.phaseNameActive]}>
                {p.emoji} {p.name}
              </Text>
              <Text style={styles.phaseRange}>
                Days {p.dayRange[0]}-{p.dayRange[1]}
              </Text>
            </View>
          );
        })}
      </Animated.View>

      {/* Hormones */}
      <Animated.View entering={FadeInUp.delay(400).duration(400)} style={styles.card}>
        <Text style={styles.cardTitle}>Current hormones</Text>
        <HormoneChart hormones={content.hormones} />
      </Animated.View>

      {/* Next period */}
      <Animated.View entering={FadeInUp.delay(500).duration(400)} style={styles.periodCard}>
        <Text style={styles.periodLabel}>Estimated next period</Text>
        <Text style={styles.periodDays}>~{daysUntilPeriod} days</Text>
      </Animated.View>

      <View style={{ height: spacing.xxl }} />
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
  title: {
    fontSize: font.size.xxl,
    fontWeight: font.weight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  ringContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  hintCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  hintText: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: font.size.md,
    fontWeight: font.weight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  phaseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  phaseRowActive: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
  },
  phaseColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.sm,
  },
  phaseName: {
    flex: 1,
    fontSize: font.size.sm,
    color: colors.textSecondary,
  },
  phaseNameActive: {
    color: colors.textPrimary,
    fontWeight: font.weight.medium,
  },
  phaseRange: {
    fontSize: font.size.xs,
    color: colors.textSecondary,
    opacity: 0.5,
  },
  periodCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  periodLabel: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
  },
  periodDays: {
    fontSize: font.size.xl,
    fontWeight: font.weight.bold,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
});
