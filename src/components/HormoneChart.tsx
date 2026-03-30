import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

export function HormoneChart({ hormones }: Props) {
  return (
    <View style={styles.container}>
      {hormoneConfig.map(({ key, label, color }) => (
        <View key={key} style={styles.row}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.barTrack}>
            <View
              style={[
                styles.barFill,
                {
                  width: `${Math.round(hormones[key] * 100)}%`,
                  backgroundColor: color,
                },
              ]}
            />
          </View>
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
