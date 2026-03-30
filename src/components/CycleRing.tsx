import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Phase } from '../types';
import { colors, spacing, font } from '../constants/theme';
import { phases } from '../constants/phases';

interface Props {
  cycleDay: number;
  cycleLength: number;
  phase: Phase;
}

const SIZE = 260;
const STROKE = 16;
const R = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * R;

export function CycleRing({ cycleDay, cycleLength, phase }: Props) {
  const progress = cycleDay / cycleLength;
  const currentPhaseInfo = phases.find(p => p.key === phase)!;

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE}>
        {/* Background ring */}
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          stroke={colors.surfaceAlt}
          strokeWidth={STROKE}
          fill="none"
        />

        {/* Phase segments */}
        {phases.map((p) => {
          const [start, end] = p.dayRange;
          const startAngle = ((start - 1) / 28) * CIRCUMFERENCE;
          const length = ((end - start + 1) / 28) * CIRCUMFERENCE;
          const isActive = p.key === phase;

          return (
            <Circle
              key={p.key}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              stroke={p.color}
              strokeWidth={isActive ? STROKE + 4 : STROKE}
              strokeDasharray={`${length} ${CIRCUMFERENCE - length}`}
              strokeDashoffset={-startAngle + CIRCUMFERENCE * 0.25}
              fill="none"
              opacity={isActive ? 1 : 0.3}
            />
          );
        })}

        {/* Position dot */}
        <Circle
          cx={SIZE / 2 + R * Math.cos(2 * Math.PI * progress - Math.PI / 2)}
          cy={SIZE / 2 + R * Math.sin(2 * Math.PI * progress - Math.PI / 2)}
          r={6}
          fill={colors.textPrimary}
        />
      </Svg>

      {/* Center label */}
      <View style={styles.center}>
        <Text style={styles.centerDay}>Day {cycleDay}</Text>
        <Text style={[styles.centerPhase, { color: currentPhaseInfo.color }]}>
          {currentPhaseInfo.emoji} {currentPhaseInfo.shortName}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
  },
  centerDay: {
    fontSize: font.size.xxl,
    fontWeight: font.weight.bold,
    color: colors.textPrimary,
  },
  centerPhase: {
    fontSize: font.size.md,
    fontWeight: font.weight.medium,
    marginTop: spacing.xs,
  },
});
