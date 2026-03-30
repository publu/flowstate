import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCycleData } from '../../src/hooks/useCycleData';
import { colors, spacing, radius, font } from '../../src/constants/theme';
import { getPhaseInfo, categoryLabels } from '../../src/constants/phases';
import { HormoneChart } from '../../src/components/HormoneChart';

export default function TodayScreen() {
  const insets = useSafeAreaInsets();
  const { cycleDay, phase, content, daysUntilPeriod, confidence } = useCycleData();
  const phaseInfo = getPhaseInfo(phase);

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top + spacing.md }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Today</Text>
          <Text style={[styles.phaseLabel, { color: phaseInfo.color }]}>
            {phaseInfo.emoji} {phaseInfo.name}
          </Text>
        </View>
        <View style={styles.dayBadge}>
          <Text style={styles.dayNumber}>Day {cycleDay}</Text>
          {confidence > 0 && confidence < 0.7 && (
            <Text style={styles.approx}>{'~estimate'}</Text>
          )}
        </View>
      </View>

      {/* Low confidence banner */}
      {confidence > 0 && confidence < 0.4 && (
        <View style={styles.lowConfidenceCard}>
          <Text style={styles.lowConfidenceText}>
            {"This is a rough guess. Check in daily and we'll dial it in."}
          </Text>
        </View>
      )}

      {/* Biology */}
      <View style={[styles.card, { borderColor: phaseInfo.color + '30' }]}>
        <Text style={styles.cardTitle}>{"What's happening"}</Text>
        <Text style={styles.biology}>{content.biology}</Text>
      </View>

      {/* Hormones */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Hormone levels</Text>
        <HormoneChart hormones={content.hormones} />
      </View>

      {/* Feelings */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>She might be feeling</Text>
        {content.feelings.map((feeling, i) => (
          <View key={i} style={styles.bulletRow}>
            <View style={[styles.dot, { backgroundColor: phaseInfo.color }]} />
            <Text style={styles.bulletText}>{feeling}</Text>
          </View>
        ))}
      </View>

      {/* Actions */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>What you can do</Text>
        {content.actions.map((action, i) => {
          const cat = categoryLabels[action.category];
          return (
            <View key={i} style={styles.actionRow}>
              <Text style={styles.actionEmoji}>{cat?.emoji || '\u2022'}</Text>
              <View style={styles.actionContent}>
                <Text style={styles.actionText}>{action.text}</Text>
                <View style={styles.actionMeta}>
                  <Text style={styles.actionCategory}>{cat?.label}</Text>
                  <View style={[
                    styles.effortBadge,
                    action.effort === 'low' && styles.effortLow,
                    action.effort === 'medium' && styles.effortMed,
                    action.effort === 'high' && styles.effortHigh,
                  ]}>
                    <Text style={styles.effortText}>{action.effort}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      {/* Avoid */}
      {content.avoid.length > 0 && (
        <View style={[styles.card, styles.avoidCard]}>
          <Text style={[styles.cardTitle, { color: colors.error }]}>{"Don't do this"}</Text>
          {content.avoid.map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.avoidX}>{'\u2715'}</Text>
              <Text style={styles.avoidText}>{item}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Period countdown */}
      <View style={styles.countdownCard}>
        <Text style={styles.countdownLabel}>Next period in</Text>
        <Text style={styles.countdownDays}>~{daysUntilPeriod} days</Text>
      </View>

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: font.size.xxl,
    fontWeight: font.weight.bold,
    color: colors.textPrimary,
  },
  phaseLabel: {
    fontSize: font.size.md,
    fontWeight: font.weight.medium,
    marginTop: spacing.xs,
  },
  dayBadge: {
    alignItems: 'flex-end',
  },
  dayNumber: {
    fontSize: font.size.lg,
    fontWeight: font.weight.semibold,
    color: colors.textSecondary,
  },
  approx: {
    fontSize: font.size.xs,
    color: colors.textSecondary,
    opacity: 0.5,
    marginTop: 2,
  },
  lowConfidenceCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  lowConfidenceText: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: font.size.md,
    fontWeight: font.weight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  biology: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    marginRight: spacing.sm,
  },
  bulletText: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  actionEmoji: {
    fontSize: 16,
    marginRight: spacing.sm,
    marginTop: 2,
  },
  actionContent: {
    flex: 1,
  },
  actionText: {
    fontSize: font.size.sm,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  actionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    gap: spacing.sm,
  },
  actionCategory: {
    fontSize: font.size.xs,
    color: colors.textSecondary,
    opacity: 0.7,
  },
  effortBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  effortLow: {
    backgroundColor: '#6BC7A320',
  },
  effortMed: {
    backgroundColor: '#E8C86B20',
  },
  effortHigh: {
    backgroundColor: '#C75B5B20',
  },
  effortText: {
    fontSize: font.size.xs,
    color: colors.textSecondary,
  },
  avoidCard: {
    borderColor: colors.error + '30',
  },
  avoidX: {
    fontSize: 12,
    color: colors.error,
    marginRight: spacing.sm,
    marginTop: 3,
    fontWeight: font.weight.bold,
  },
  avoidText: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  countdownCard: {
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  countdownLabel: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
  },
  countdownDays: {
    fontSize: font.size.xl,
    fontWeight: font.weight.bold,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
});
