import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, Easing } from 'react-native-reanimated';
import { PhaseIndicator, IndicatorKey } from '../types';

interface Props {
  indicators: PhaseIndicator[];
}

const barColors: Record<IndicatorKey, string> = {
  cuddle_factor: '#F9A8D4',
  romance_level: '#F472B6',
  adventure_readiness: '#34D399',
  patience_meter: '#60A5FA',
  spicy_meter: '#F87171',
  nesting_energy: '#A78BFA',
  social_battery: '#FBBF24',
};

function AnimatedBar({ index, value, color }: { index: number; value: number; color: string }) {
  const [trackWidth, setTrackWidth] = useState(0);
  const width = useSharedValue(0);

  useEffect(() => {
    if (trackWidth > 0) {
      width.value = withDelay(
        index * 80,
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

export function VibeMeters({ indicators }: Props) {
  return (
    <View style={styles.container}>
      {indicators.map((indicator, index) => {
        const fillColor = barColors[indicator.key] || '#9A9498';

        return (
          <View key={indicator.key} style={styles.row}>
            <View style={styles.labelRow}>
              <Text style={styles.emoji}>{indicator.emoji}</Text>
              <Text style={styles.label}>{indicator.label}</Text>
            </View>
            <AnimatedBar index={index} value={indicator.value} color={fillColor} />
            {indicator.flavor ? (
              <Text style={styles.flavor}>{indicator.flavor}</Text>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  row: {
    gap: 4,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  emoji: {
    fontSize: 16,
  },
  label: {
    fontSize: 13,
    color: '#8A8F98',
  },
  barTrack: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 999,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 999,
    minWidth: 4,
  },
  flavor: {
    fontSize: 11,
    color: '#8A8F98',
    fontStyle: 'italic',
    opacity: 0.45,
    marginTop: 1,
    paddingLeft: 22,
  },
});
