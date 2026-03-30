import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

export function VibeMeters({ indicators }: Props) {
  return (
    <View style={styles.container}>
      {indicators.map((indicator) => {
        const fillColor = barColors[indicator.key] || '#9A9498';
        const widthPercent = Math.round(indicator.value * 100);

        return (
          <View key={indicator.key} style={styles.row}>
            <View style={styles.labelRow}>
              <Text style={styles.emoji}>{indicator.emoji}</Text>
              <Text style={styles.label}>{indicator.label}</Text>
            </View>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  {
                    width: `${widthPercent}%`,
                    backgroundColor: fillColor,
                  },
                ]}
              />
            </View>
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
    gap: 16,
  },
  row: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emoji: {
    fontSize: 20,
  },
  label: {
    fontSize: 14,
    color: '#9A9498',
  },
  barTrack: {
    width: '100%',
    height: 10,
    backgroundColor: '#252530',
    borderRadius: 999,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 999,
    minWidth: 4,
  },
  flavor: {
    fontSize: 12,
    color: '#9A9498',
    fontStyle: 'italic',
    opacity: 0.6,
    marginTop: 2,
    paddingLeft: 28,
  },
});
