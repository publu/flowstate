import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useCycleData } from '../../src/hooks/useCycleData';
import { colors, spacing, radius, font } from '../../src/constants/theme';
import { getPhaseInfo, categoryLabels } from '../../src/constants/phases';
import { HormoneChart } from '../../src/components/HormoneChart';
import { VibeMeters } from '../../src/components/VibeMeters';
import { encyclopedia } from '../../src/data/encyclopedia';
import { ActionCategory } from '../../src/types';

const categoryOrder: ActionCategory[] = ['food', 'date', 'physical_touch', 'words', 'logistics', 'gift'];

export default function TodayScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { cycleDay, phase, content, daysUntilPeriod, confidence, config } = useCycleData();
  const phaseInfo = getPhaseInfo(phase);
  const cycleLength = config?.cycleLength ?? 28;
  const enc = encyclopedia[phase];

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

      {/* Vibe Check */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardEmoji}>{'\u2728'}</Text>
          <Text style={styles.cardTitle}>The vibe check</Text>
        </View>
        <VibeMeters indicators={enc.indicators} />
      </View>

      {/* Biology */}
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

      {/* Feelings */}
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

      {/* What you can do - by category, tappable */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardEmoji}>{'\u{1F3AF}'}</Text>
          <Text style={styles.cardTitle}>What you can do</Text>
        </View>
        <Text style={styles.sectionHint}>Tap any category to see the full playbook</Text>

        <View style={styles.categoryGrid}>
          {categoryOrder.map((catKey) => {
            const cat = categoryLabels[catKey];
            const actions = enc.actions[catKey] || [];
            const count = actions.length;
            const preview = actions.slice(0, 2);
            return (
              <TouchableOpacity
                key={catKey}
                style={styles.categoryCard}
                onPress={() => router.push({ pathname: '/category/[category]', params: { category: catKey } })}
                activeOpacity={0.7}
              >
                <View style={styles.categoryTop}>
                  <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                  <Text style={styles.categoryCount}>{count}</Text>
                </View>
                <Text style={styles.categoryLabel}>{cat.label}</Text>
                {preview.map((a, i) => (
                  <Text key={i} style={styles.categoryPreview} numberOfLines={1}>{a.text}</Text>
                ))}
                <Text style={styles.categoryMore}>See all {'\u203A'}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Today's picks - a few highlighted actions */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardEmoji}>{'\u{1F4A1}'}</Text>
          <Text style={styles.cardTitle}>{"Today's top picks"}</Text>
        </View>
        {content.actions.slice(0, 5).map((action, i) => {
          const cat = categoryLabels[action.category];
          const effortColor = action.effort === 'low' ? '#4ADE80' : action.effort === 'medium' ? '#FACC15' : '#FB923C';
          const effortWord = action.effort === 'low' ? 'Easy win' : action.effort === 'medium' ? 'Worth it' : 'Go big';
          return (
            <TouchableOpacity
              key={i}
              style={styles.pickRow}
              onPress={() => router.push({ pathname: '/category/[category]', params: { category: action.category } })}
              activeOpacity={0.7}
            >
              <View style={styles.pickIcon}>
                <Text style={styles.pickEmoji}>{cat?.emoji || '\u2022'}</Text>
              </View>
              <View style={styles.pickContent}>
                <Text style={styles.pickText}>{action.text}</Text>
                <Text style={[styles.pickEffort, { color: effortColor }]}>{effortWord}</Text>
              </View>
              <Text style={styles.pickArrow}>{'\u203A'}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Avoid - show all encyclopedia avoids */}
      {enc.avoids.length > 0 && (
        <View style={[styles.card, styles.avoidCard]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardEmoji}>{'\u{1F6A8}'}</Text>
            <Text style={[styles.cardTitle, { color: '#F87171' }]}>{"Don't do this"}</Text>
          </View>
          {enc.avoids.map((item, i) => (
            <View key={i} style={styles.avoidItemCard}>
              <View style={styles.avoidRow}>
                <Text style={[styles.avoidX, item.severity === 'nuclear' && { fontSize: 16 }]}>
                  {item.severity === 'nuclear' ? '\u{1F4A3}' : '\u2715'}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.avoidText}>{item.text}</Text>
                  <Text style={styles.avoidWhy}>{item.why}</Text>
                </View>
              </View>
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
  sectionHint: {
    fontSize: font.size.xs,
    color: colors.textSecondary,
    opacity: 0.6,
    marginBottom: spacing.md,
    marginTop: -spacing.sm,
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
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryCard: {
    width: '48%' as any,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    padding: spacing.md,
    minHeight: 140,
  },
  categoryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryCount: {
    fontSize: font.size.xs,
    color: colors.textSecondary,
    backgroundColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  categoryLabel: {
    fontSize: font.size.sm,
    fontWeight: font.weight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  categoryPreview: {
    fontSize: font.size.xs,
    color: colors.textSecondary,
    lineHeight: 16,
    marginBottom: 2,
    opacity: 0.7,
  },
  categoryMore: {
    fontSize: font.size.xs,
    color: colors.accent,
    marginTop: spacing.sm,
    fontWeight: font.weight.medium,
  },
  pickRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pickIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  pickEmoji: {
    fontSize: 16,
  },
  pickContent: {
    flex: 1,
  },
  pickText: {
    fontSize: font.size.sm,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  pickEffort: {
    fontSize: font.size.xs,
    marginTop: 2,
    fontWeight: font.weight.medium,
  },
  pickArrow: {
    fontSize: 22,
    color: colors.textSecondary,
    opacity: 0.4,
    marginLeft: spacing.sm,
  },
  avoidCard: {
    borderColor: '#F8717130',
  },
  avoidItemCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  avoidRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    color: '#F87171',
    fontWeight: font.weight.medium,
    lineHeight: 22,
  },
  avoidWhy: {
    fontSize: font.size.xs,
    color: colors.textSecondary,
    lineHeight: 20,
    marginTop: 4,
    opacity: 0.8,
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
