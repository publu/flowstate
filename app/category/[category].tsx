import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCycleData } from '../../src/hooks/useCycleData';
import { encyclopedia } from '../../src/data/encyclopedia';
import { ActionCategory, EncyclopediaAction, AvoidItem } from '../../src/types';
import { colors, spacing, radius, font } from '../../src/constants/theme';
import { categoryLabels, getPhaseInfo } from '../../src/constants/phases';

const effortLabels: Record<string, { text: string; color: string }> = {
  low: { text: 'Easy win', color: '#4ADE80' },
  medium: { text: 'Worth the effort', color: '#FACC15' },
  high: { text: 'Go all out', color: '#FB923C' },
};

export default function CategoryScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { phase } = useCycleData();

  const phaseInfo = getPhaseInfo(phase);
  const catKey = category as ActionCategory;
  const catMeta = categoryLabels[catKey];

  const phaseEntry = encyclopedia[phase];
  const actions: EncyclopediaAction[] = phaseEntry?.actions[catKey] ?? [];
  const avoids: AvoidItem[] = phaseEntry?.avoids ?? [];

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Text style={styles.backArrow}>{'\u2190'}</Text>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>
          {catMeta?.emoji || ''} {catMeta?.label || category}
        </Text>
        <Text style={styles.subtitle}>
          {actions.length} idea{actions.length !== 1 ? 's' : ''} for{' '}
          {phaseInfo.name.toLowerCase()} phase
        </Text>

        <View style={styles.actionsList}>
          {actions.map((action) => {
            const effort = effortLabels[action.effort];
            return (
              <View key={action.id} style={styles.actionCard}>
                <Text style={styles.actionText}>{action.text}</Text>
                <Text style={styles.actionDetail}>{action.detail}</Text>

                {action.proTip ? (
                  <Text style={styles.proTip}>
                    {'\u{1F4A1}'} {action.proTip}
                  </Text>
                ) : null}

                <Text style={[styles.effortText, { color: effort?.color || colors.textSecondary }]}>
                  {effort?.text || action.effort}
                </Text>
              </View>
            );
          })}
        </View>

        {avoids.length > 0 && (
          <View style={styles.avoidsSection}>
            <View style={styles.avoidHeader}>
              <Text style={styles.avoidHeaderEmoji}>{'\u{1F6A8}'}</Text>
              <Text style={styles.avoidHeaderText}>Things to avoid</Text>
            </View>
            {avoids.map((item, i) => (
              <View key={i} style={styles.avoidCard}>
                <View style={styles.avoidRow}>
                  <Text style={styles.avoidX}>{'\u2715'}</Text>
                  <View style={styles.avoidContent}>
                    <Text style={styles.avoidText}>{item.text}</Text>
                    <Text style={styles.avoidWhy}>{item.why}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: spacing.xxl + insets.bottom }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  backArrow: {
    fontSize: font.size.lg,
    color: colors.accent,
  },
  backText: {
    fontSize: font.size.md,
    color: colors.accent,
    fontWeight: font.weight.medium,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  header: {
    fontSize: font.size.xl,
    fontWeight: font.weight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  actionsList: {
    gap: spacing.md,
  },
  actionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionText: {
    fontSize: font.size.md,
    fontWeight: font.weight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  actionDetail: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  proTip: {
    fontSize: font.size.sm,
    color: colors.accent,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  effortText: {
    fontSize: font.size.xs,
    fontWeight: font.weight.medium,
    marginTop: spacing.xs,
  },
  avoidsSection: {
    marginTop: spacing.xl,
  },
  avoidHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  avoidHeaderEmoji: {
    fontSize: 18,
  },
  avoidHeaderText: {
    fontSize: font.size.md,
    fontWeight: font.weight.semibold,
    color: '#F87171',
  },
  avoidCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#F8717130',
    marginBottom: spacing.md,
  },
  avoidRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avoidX: {
    fontSize: 14,
    color: '#F87171',
    fontWeight: font.weight.bold,
    marginRight: spacing.md,
    marginTop: 2,
  },
  avoidContent: {
    flex: 1,
  },
  avoidText: {
    fontSize: font.size.sm,
    color: '#F87171',
    fontWeight: font.weight.semibold,
    lineHeight: 22,
  },
  avoidWhy: {
    fontSize: font.size.xs,
    color: colors.textSecondary,
    lineHeight: 20,
    marginTop: spacing.xs,
    opacity: 0.8,
  },
});
