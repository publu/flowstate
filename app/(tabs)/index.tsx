import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  FadeIn,
  FadeInUp,
} from 'react-native-reanimated';
import { useCycleData } from '../../src/hooks/useCycleData';
import { colors, spacing, radius, font } from '../../src/constants/theme';
import { getPhaseInfo, categoryLabels } from '../../src/constants/phases';
import { HormoneChart } from '../../src/components/HormoneChart';
import { VibeMeters } from '../../src/components/VibeMeters';
import { AnimatedCounter } from '../../src/components/AnimatedCounter';
import { encyclopedia } from '../../src/data/encyclopedia';
import { ActionCategory } from '../../src/types';

const categoryOrder: ActionCategory[] = ['food', 'date', 'physical_touch', 'words', 'logistics', 'gift'];

function PulseDot({ color }: { color: string }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.4, { duration: 1000, easing: Easing.inOut(Easing.sine) }),
        withTiming(1.0, { duration: 1000, easing: Easing.inOut(Easing.sine) }),
      ),
      -1,
      true,
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: 1.2 - scale.value * 0.3,
  }));

  return (
    <Animated.View style={[styles.countdownDot, { backgroundColor: color }, animStyle]} />
  );
}

export default function TodayScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { cycleDay, phase, content, daysUntilPeriod, confidence, config } = useCycleData();
  const phaseInfo = getPhaseInfo(phase);
  const cycleLength = config?.cycleLength ?? 28;
  const enc = encyclopedia[phase];

  const phaseColor = phaseInfo.color;

  return (
    <View style={styles.screenWrap}>
      <View style={[styles.ambientGlow, { backgroundColor: phaseColor + '08' }]} />
      <View style={[styles.ambientGlowInner, { backgroundColor: phaseColor + '06' }]} />

      <ScrollView
        style={[styles.container, { paddingTop: insets.top }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <Animated.View entering={FadeIn.duration(500)} style={styles.heroWrap}>
          <LinearGradient
            colors={[phaseColor + '12', phaseColor + '06', 'transparent']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.heroGradient}
          />
          <View style={styles.heroInner}>
            <View style={styles.heroTopRow}>
              <View style={styles.heroLeft}>
                <Text style={styles.heroLabel}>TODAY</Text>
                <Text style={styles.heroPhase}>{phaseInfo.name}</Text>
              </View>
              <View style={[styles.dayCircle, { borderColor: phaseColor + '60' }]}>
                <AnimatedCounter to={cycleDay} duration={600} delay={200} style={styles.dayNumber} />
                <Text style={styles.dayOf}>/{cycleLength}</Text>
              </View>
            </View>

            {confidence > 0 && confidence < 0.4 && (
              <View style={styles.estimatePill}>
                <Text style={styles.estimateText}>Rough estimate. Check in daily to sharpen.</Text>
              </View>
            )}

            <View style={[styles.countdownPill, { backgroundColor: phaseColor + '10' }]}>
              <PulseDot color={phaseColor} />
              <Text style={styles.countdownText}>
                {daysUntilPeriod <= 3
                  ? `Period likely in ${daysUntilPeriod} day${daysUntilPeriod === 1 ? '' : 's'}`
                  : `~${daysUntilPeriod} days until next period`
                }
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Vibe Check */}
        <Animated.View entering={FadeInUp.delay(100).duration(400)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionDot, { backgroundColor: '#F9A8D4' }]} />
            <Text style={styles.sectionTitle}>The vibe right now</Text>
          </View>
          <View style={styles.glassCard}>
            <VibeMeters indicators={enc.indicators} />
          </View>
        </Animated.View>

        {/* Biology */}
        <Animated.View entering={FadeInUp.delay(200).duration(400)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionDot, { backgroundColor: phaseColor }]} />
            <Text style={styles.sectionTitle}>{"What's happening"}</Text>
          </View>
          <View style={styles.glassCard}>
            <Text style={styles.bodyText}>{content.biology}</Text>
          </View>
        </Animated.View>

        {/* Hormones */}
        <Animated.View entering={FadeInUp.delay(300).duration(400)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionDot, { backgroundColor: colors.hormone.estrogen }]} />
            <Text style={styles.sectionTitle}>Hormone levels</Text>
          </View>
          <View style={styles.glassCard}>
            <HormoneChart hormones={content.hormones} />
          </View>
        </Animated.View>

        {/* Feelings */}
        <Animated.View entering={FadeInUp.delay(400).duration(400)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionDot, { backgroundColor: '#A78BFA' }]} />
            <Text style={styles.sectionTitle}>She might be feeling</Text>
          </View>
          <View style={styles.glassCard}>
            {content.feelings.map((feeling, i) => (
              <View key={i} style={styles.feelingRow}>
                <View style={[styles.feelingDot, { backgroundColor: phaseColor + '80' }]} />
                <Text style={styles.feelingText}>{feeling}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* What you can do */}
        <Animated.View entering={FadeInUp.delay(500).duration(400)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionDot, { backgroundColor: colors.accent }]} />
            <Text style={styles.sectionTitle}>What you can do</Text>
          </View>
          <Text style={styles.sectionHint}>Tap a category for the full playbook</Text>

          <View style={styles.categoryGrid}>
            {categoryOrder.map((catKey) => {
              const cat = categoryLabels[catKey];
              const actions = enc.actions[catKey] || [];
              const count = actions.length;
              const preview = actions.slice(0, 2);
              const catColor = colors.category[catKey];
              return (
                <TouchableOpacity
                  key={catKey}
                  style={styles.categoryCard}
                  onPress={() => router.push({ pathname: '/category/[category]', params: { category: catKey } })}
                  activeOpacity={0.7}
                >
                  <View style={styles.categoryTop}>
                    <View style={[styles.categoryIconDot, { backgroundColor: catColor + '20' }]}>
                      <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                    </View>
                    <View style={[styles.countBadge, { backgroundColor: catColor + '18' }]}>
                      <Text style={[styles.countBadgeText, { color: catColor }]}>{count}</Text>
                    </View>
                  </View>
                  <Text style={styles.categoryLabel}>{cat.label}</Text>
                  {preview.map((a, i) => (
                    <Text key={i} style={styles.categoryPreview} numberOfLines={1}>{a.text}</Text>
                  ))}
                  <Text style={[styles.categoryMore, { color: catColor }]}>View all</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>

        {/* Top picks */}
        <Animated.View entering={FadeInUp.delay(600).duration(400)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionDot, { backgroundColor: '#FBBF24' }]} />
            <Text style={styles.sectionTitle}>{"Today's picks"}</Text>
          </View>
          <View style={styles.glassCard}>
            {content.actions.slice(0, 5).map((action, i) => {
              const cat = categoryLabels[action.category];
              const catColor = colors.category[action.category];
              const effortColor = action.effort === 'low' ? '#4ADE80' : action.effort === 'medium' ? '#FACC15' : '#FB923C';
              const effortWord = action.effort === 'low' ? 'Easy' : action.effort === 'medium' ? 'Medium' : 'Big';
              const isLast = i === Math.min(content.actions.length, 5) - 1;
              return (
                <TouchableOpacity
                  key={i}
                  style={[styles.pickRow, !isLast && styles.pickRowBorder]}
                  onPress={() => router.push({ pathname: '/category/[category]', params: { category: action.category } })}
                  activeOpacity={0.7}
                >
                  <View style={[styles.pickIcon, { backgroundColor: catColor + '15' }]}>
                    <Text style={styles.pickEmoji}>{cat?.emoji || ''}</Text>
                  </View>
                  <View style={styles.pickContent}>
                    <Text style={styles.pickText}>{action.text}</Text>
                    <View style={styles.pickMeta}>
                      <View style={[styles.effortDot, { backgroundColor: effortColor }]} />
                      <Text style={[styles.pickEffort, { color: effortColor }]}>{effortWord}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>

        {/* Avoids */}
        {enc.avoids.length > 0 && (
          <Animated.View entering={FadeInUp.delay(700).duration(400)} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionDot, { backgroundColor: '#F87171' }]} />
              <Text style={[styles.sectionTitle, { color: '#F87171' }]}>{"Don't do this"}</Text>
            </View>
            {enc.avoids.map((item, i) => (
              <View key={i} style={styles.avoidCard}>
                <View style={styles.avoidRow}>
                  <View style={styles.avoidIconWrap}>
                    <Text style={styles.avoidIcon}>
                      {item.severity === 'nuclear' ? '!!' : '\u00D7'}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.avoidText}>{item.text}</Text>
                    <Text style={styles.avoidWhy}>{item.why}</Text>
                  </View>
                </View>
              </View>
            ))}
          </Animated.View>
        )}

        {/* Check in CTA */}
        <Animated.View entering={FadeInUp.delay(800).duration(400)}>
          <TouchableOpacity
            style={styles.ctaWrap}
            onPress={() => router.push('/(tabs)/checkin')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.accent + '20', colors.accent + '08']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.ctaGradient}
            >
              <View style={styles.ctaInner}>
                <View>
                  <Text style={styles.ctaTitle}>Quick check in</Text>
                  <Text style={styles.ctaSubtitle}>3 questions, 15 seconds</Text>
                </View>
                <View style={[styles.ctaArrowCircle, { borderColor: colors.accent + '40' }]}>
                  <Text style={styles.ctaArrow}>{'\u203A'}</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <View style={{ height: spacing.xxl + insets.bottom }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrap: {
    flex: 1,
    backgroundColor: colors.background,
  },
  ambientGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 400,
  },
  ambientGlowInner: {
    position: 'absolute',
    top: 0,
    left: '15%',
    right: '15%',
    height: 300,
    borderRadius: 200,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },

  // Hero
  heroWrap: {
    marginBottom: spacing.md,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  heroInner: {
    padding: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroLeft: {
    flex: 1,
  },
  heroLabel: {
    fontSize: 11,
    fontWeight: font.weight.semibold,
    color: colors.textTertiary,
    letterSpacing: 2,
    marginBottom: 6,
  },
  heroPhase: {
    fontSize: 28,
    fontWeight: font.weight.bold,
    color: colors.textPrimary,
    lineHeight: 34,
  },
  dayCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayNumber: {
    fontSize: 24,
    fontWeight: font.weight.bold,
    color: colors.textPrimary,
  },
  dayOf: {
    fontSize: 11,
    color: colors.textTertiary,
    marginTop: -3,
  },
  estimatePill: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: radius.sm,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: spacing.md,
  },
  estimateText: {
    fontSize: font.size.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  countdownPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: spacing.md,
  },
  countdownDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 10,
  },
  countdownText: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    fontWeight: font.weight.medium,
  },

  // Sections
  section: {
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: font.size.md,
    fontWeight: font.weight.semibold,
    color: colors.textPrimary,
  },
  sectionHint: {
    fontSize: font.size.xs,
    color: colors.textTertiary,
    marginBottom: 12,
    marginTop: -4,
    paddingLeft: 18,
  },

  // Glass card
  glassCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },

  bodyText: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    lineHeight: 22,
  },

  // Feelings
  feelingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  feelingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: 10,
  },
  feelingText: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },

  // Category grid
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryCard: {
    width: '48%' as any,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 14,
    padding: 14,
    minHeight: 150,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  categoryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryIconDot: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryEmoji: {
    fontSize: 18,
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: font.weight.semibold,
  },
  categoryLabel: {
    fontSize: font.size.sm,
    fontWeight: font.weight.semibold,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  categoryPreview: {
    fontSize: 12,
    color: colors.textTertiary,
    lineHeight: 17,
    marginBottom: 2,
  },
  categoryMore: {
    fontSize: 12,
    marginTop: 8,
    fontWeight: font.weight.medium,
  },

  // Picks
  pickRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  pickRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  pickIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
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
  pickMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  effortDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  pickEffort: {
    fontSize: 11,
    fontWeight: font.weight.medium,
  },

  // Avoids
  avoidCard: {
    backgroundColor: 'rgba(248,113,113,0.04)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(248,113,113,0.10)',
  },
  avoidRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avoidIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(248,113,113,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 1,
  },
  avoidIcon: {
    fontSize: 13,
    color: '#F87171',
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
    opacity: 0.7,
  },

  // CTA
  ctaWrap: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.accent + '20',
  },
  ctaGradient: {
    padding: spacing.md,
  },
  ctaInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ctaTitle: {
    fontSize: font.size.md,
    fontWeight: font.weight.semibold,
    color: colors.textPrimary,
  },
  ctaSubtitle: {
    fontSize: font.size.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  ctaArrowCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaArrow: {
    fontSize: 20,
    color: colors.accent,
    marginTop: -1,
  },
});
