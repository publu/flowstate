import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useCycleData } from '../../src/hooks/useCycleData';
import { colors, spacing, radius, font } from '../../src/constants/theme';
import { getPhaseInfo, categoryLabels } from '../../src/constants/phases';
import { HormoneChart } from '../../src/components/HormoneChart';

export default function TodayScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { cycleDay, phase, content, daysUntilPeriod, confidence, config } = useCycleData();
  const phaseInfo = getPhaseInfo(phase);
  const cycleLength = config?.cycleLength ?? 28;

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top + spacing.md }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero card */}
      <View style={[styles.heroCard, { borderColor: phaseInfo.color + '40' }]}>
        <View style={styles.heroTop}>
          <View>
            <Text style={styles.heroGreeting}>Today</Text>
            <Text style={[styles.heroPhase, { color: phaseInfo.color }]}>
              {phaseInfo.emoji} {phaseInfo.name}
            </Text>
          </View>
          <View style={[styles.dayRing, { borderColor: phaseInfo.color }]}>
            <Text style={styles.dayRingNumber}>{cycleDay}</Text>
            <Text style={styles.dayRingLabel}>of {cycleLength}</Text>
          </View>
        </View>

        {confidence > 0 && confidence < 0.4 && (
          <View style={styles.estimateBadge}>
            <Text style={styles.estimateText}>
              {'\u{1F50D}'} Rough estimate. Check in daily to sharpen this.
            </Text>
          </View>
        )}

        {/* Period countdown */}
        <View style={[styles.countdownRow, { backgroundColor: phaseInfo.color + '12' }]}>
          <Text style={styles.countdownIcon}>{'\u{1F4C5}'}</Text>
          <Text style={styles.countdownText}>
            {daysUntilPeriod <= 3
              ? `Period likely in ${daysUntilPeriod} day${daysUntilPeriod === 1 ? '' : 's'}`
              : `~${daysUntilPeriod} days until next period`
            }
          </Text>
        </View>
      </View>

      {/* Biology / what's happening */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardEmoji}>{'\u{1F9EC}'}</Text>
          <Text style={styles.cardTitle}>{"What's happening in her body"}</Text>
        </View>
        <Text style={styles.biology}>{content.biology}</Text>
      </View>

      {/* Hormones */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardEmoji}>{'\u{1F4CA}'}</Text>
          <Text style={styles.cardTitle}>Hormone levels right now</Text>
        </View>
        <HormoneChart hormones={content.hormones} />
      </View>

      {/* How she might be feeling */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardEmoji}>{'\u{1F49C}'}</Text>
          <Text style={styles.cardTitle}>She might be feeling</Text>
        </View>
        {content.feelings.map((feeling, i) => (
          <View key={i} style={styles.feelingRow}>
            <View style={[styles.feelingDot, { backgroundColor: phaseInfo.color }]} />
            <Text style={styles.feelingText}>{feeling}</Text>
          </View>
        ))}
      </View>

      {/* What you can do - grouped by category */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardEmoji}>{'\u{1F3AF}'}</Text>
          <Text style={styles.cardTitle}>What you can do today</Text>
        </View>
        {content.actions.map((action, i) => {
          const cat = categoryLabels[action.category];
          return (
            <View key={i} style={styles.actionRow}>
              <View style={[styles.actionIcon, {
                backgroundColor:
                  action.effort === 'low' ? '#4ADE8015' :
                  action.effort === 'medium' ? '#FACC1515' :
                  '#FB923C15',
              }]}>
                <Text style={styles.actionEmoji}>{cat?.emoji || '\u2022'}</Text>
              </View>
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
                    <Text style={[styles.effortText, {
                      color: action.effort === 'low' ? '#4ADE80' :
                             action.effort === 'medium' ? '#FACC15' :
                             '#FB923C',
                    }]}>{action.effort}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      {/* What to avoid */}
      {content.avoid.length > 0 && (
        <View style={[styles.card, styles.avoidCard]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardEmoji}>{'\u{1F6A8}'}</Text>
            <Text style={[styles.cardTitle, { color: '#F87171' }]}>{"Don't do this"}</Text>
          </View>
          {content.avoid.map((item, i) => (
            <View key={i} style={styles.avoidRow}>
              <Text style={styles.avoidX}>{'\u2715'}</Text>
              <Text style={styles.avoidText}>{item}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Check in CTA */}
      <TouchableOpacity
        style={styles.checkinCta}
        onPress={() => router.push('/(tabs)/checkin')}
        activeOpacity={0.7}
      >
        <Text style={styles.checkinCtaEmoji}>{'\u{1F4DD}'}</Text>
        <View>
          <Text style={styles.checkinCtaTitle}>Quick check in</Text>
          <Text style={styles.checkinCtaSubtitle}>3 questions, 15 seconds</Text>
        </View>
        <Text style={styles.checkinCtaArrow}>{'\u203A'}</Text>
      </TouchableOpacity>

      <View style={{ height: spacing.xxl + insets.bottom }} />
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
  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroGreeting: {
    fontSize: 32,
    fontWeight: font.weight.bold,
    color: colors.textPrimary,
  },
  heroPhase: {
    fontSize: font.size.md,
    fontWeight: font.weight.semibold,
    marginTop: spacing.xs,
  },
  dayRing: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayRingNumber: {
    fontSize: font.size.lg,
    fontWeight: font.weight.bold,
    color: colors.textPrimary,
  },
  dayRingLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: -2,
  },
  estimateBadge: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.sm,
    padding: spacing.sm,
    marginTop: spacing.md,
  },
  estimateText: {
    fontSize: font.size.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  countdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  countdownIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  countdownText: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    fontWeight: font.weight.medium,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cardEmoji: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  cardTitle: {
    fontSize: font.size.md,
    fontWeight: font.weight.semibold,
    color: colors.textPrimary,
  },
  biology: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  feelingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  feelingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 7,
    marginRight: spacing.sm,
  },
  feelingText: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 22,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  actionEmoji: {
    fontSize: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionText: {
    fontSize: font.size.sm,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  actionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: spacing.sm,
  },
  actionCategory: {
    fontSize: font.size.xs,
    color: colors.textSecondary,
    opacity: 0.6,
  },
  effortBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  effortLow: {
    backgroundColor: '#4ADE8015',
  },
  effortMed: {
    backgroundColor: '#FACC1515',
  },
  effortHigh: {
    backgroundColor: '#FB923C15',
  },
  effortText: {
    fontSize: font.size.xs,
    fontWeight: font.weight.medium,
  },
  avoidCard: {
    borderColor: '#F8717130',
  },
  avoidRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  avoidX: {
    fontSize: 13,
    color: '#F87171',
    marginRight: spacing.sm,
    marginTop: 2,
    fontWeight: font.weight.bold,
  },
  avoidText: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 22,
  },
  checkinCta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent + '15',
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.accent + '30',
  },
  checkinCtaEmoji: {
    fontSize: 28,
    marginRight: spacing.md,
  },
  checkinCtaTitle: {
    fontSize: font.size.md,
    fontWeight: font.weight.semibold,
    color: colors.textPrimary,
  },
  checkinCtaSubtitle: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  checkinCtaArrow: {
    fontSize: 28,
    color: colors.accent,
    marginLeft: 'auto',
  },
});
