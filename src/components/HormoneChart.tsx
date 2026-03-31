import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, Easing } from 'react-native-reanimated';
import { HormoneLevels } from '../types';
import { colors, spacing, radius, font } from '../constants/theme';

interface Props {
  hormones: HormoneLevels;
}

const hormoneConfig = [
  { key: 'estrogen' as const, label: 'Estrogen', color: colors.hormone.estrogen },
  { key: 'progesterone' as const, label: 'Progesterone', color: colors.hormone.progesterone },
  { key: 'testosterone' as const, label: 'Testosterone', color: colors.hormone.testosterone },
  { key: 'serotonin' as const, label: 'Serotonin', color: colors.hormone.serotonin },
  { key: 'prostaglandins' as const, label: 'Prostaglandins', color: colors.hormone.prostaglandins },
];

function AnimatedBar({ index, value, color }: { index: number; value: number; color: string }) {
  const [trackWidth, setTrackWidth] = useState(0);
  const width = useSharedValue(0);

  useEffect(() => {
    if (trackWidth > 0) {
      width.value = withDelay(
        index * 100,
        withTiming(trackWidth * value, { duration: 600, easing: Easing.out(Easing.cubic) }),
      );
    }
  }, [trackWidth, value]);

  const animStyle = useAnimatedStyle(() => ({
    width: width.value,
    backgroundColor: color,
  }));

  const onLayout = (e: LayoutChangeEvent) => {
    setTrackWidth(e.nativeEvent.layout.width);
  };

  return (
    <View style={styles.barTrack} onLayout={onLayout}>
      <Animated.View style={[styles.barFill, animStyle]} />
    </View>
  );
}

export function HormoneChart({ hormones }: Props) {
  return (
    <View style={styles.container}>
      {hormoneConfig.map(({ key, label, color }, index) => (
        <View key={key} style={styles.row}>
          <Text style={styles.label}>{label}</Text>
          <AnimatedBar index={index} value={hormones[key]} color={color} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: font.size.xs,
    color: colors.textSecondary,
    width: 100,
  },
  barTrack: {
    flex: 1,
    height: 8,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: radius.full,
    minWidth: 4,
  },
});
