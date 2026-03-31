import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { Phase } from '../types';
import { colors, font } from '../constants/theme';
import { phases } from '../constants/phases';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  cycleDay: number;
  cycleLength: number;
  phase: Phase;
}

const SIZE = 280;
const STROKE = 10;
const GAP = 3;
const R = (SIZE - STROKE * 2 - 20) / 2;
const CIRCUMFERENCE = 2 * Math.PI * R;
const TOTAL_DAYS = 28;

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function dayToAngle(day: number) {
  return ((day - 1) / TOTAL_DAYS) * 360;
}

function PhaseArc({ phaseData, isActive, index }: { phaseData: typeof phases[0]; isActive: boolean; index: number }) {
  const [start, end] = phaseData.dayRange;
  const startAngle = dayToAngle(start) + GAP / 2;
  const endAngle = dayToAngle(end + 1) - GAP / 2;
  const arcDeg = endAngle - startAngle;
  const arcLen = (arcDeg / 360) * CIRCUMFERENCE;
  const offset = -(startAngle / 360) * CIRCUMFERENCE + CIRCUMFERENCE * 0.25;

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      index * 150,
      withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) }),
    );
  }, []);

  const arcProps = useAnimatedProps(() => {
    const currentLen = arcLen * progress.value;
    return {
      strokeDasharray: [currentLen, CIRCUMFERENCE - currentLen] as unknown as string,
    };
  });

  const glowProps = useAnimatedProps(() => {
    const currentLen = arcLen * progress.value;
    return {
      strokeDasharray: [currentLen, CIRCUMFERENCE - currentLen] as unknown as string,
    };
  });

  const cx = SIZE / 2;
  const cy = SIZE / 2;

  return (
    <React.Fragment>
      {isActive && (
        <AnimatedCircle
          cx={cx}
          cy={cy}
          r={R}
          stroke={phaseData.color}
          strokeWidth={STROKE + 12}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          opacity={0.12}
          animatedProps={glowProps}
        />
      )}
      <AnimatedCircle
        cx={cx}
        cy={cy}
        r={R}
        stroke={phaseData.color}
        strokeWidth={isActive ? STROKE + 2 : STROKE}
        strokeDashoffset={offset}
        strokeLinecap="round"
        fill="none"
        opacity={isActive ? 1 : 0.35}
        animatedProps={arcProps}
      />
    </React.Fragment>
  );
}

function PulseDot({ cx, cy, dotAngle }: { cx: number; cy: number; dotAngle: number }) {
  const x = cx + R * Math.cos(dotAngle);
  const y = cy + R * Math.sin(dotAngle);

  const glowR = useSharedValue(14);

  useEffect(() => {
    glowR.value = withRepeat(
      withSequence(
        withTiming(18, { duration: 1500, easing: Easing.inOut(Easing.sine) }),
        withTiming(12, { duration: 1500, easing: Easing.inOut(Easing.sine) }),
      ),
      -1,
      true,
    );
  }, []);

  const glowProps = useAnimatedProps(() => ({
    r: glowR.value,
    opacity: 0.4 + (glowR.value - 12) / 15,
  }));

  return (
    <>
      <AnimatedCircle
        cx={x}
        cy={y}
        fill="url(#dotGlow)"
        animatedProps={glowProps}
      />
      <Circle
        cx={x}
        cy={y}
        r={8}
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth={1.5}
      />
      <Circle
        cx={x}
        cy={y}
        r={5}
        fill="#EDEDEF"
      />
    </>
  );
}

export function CycleRing({ cycleDay, cycleLength, phase }: Props) {
  const currentPhaseInfo = phases.find(p => p.key === phase)!;
  const dotAngle = degToRad(dayToAngle(cycleDay) - 90);
  const cx = SIZE / 2;
  const cy = SIZE / 2;

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE}>
        <Defs>
          <RadialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#fff" stopOpacity={0.9} />
            <Stop offset="100%" stopColor="#fff" stopOpacity={0} />
          </RadialGradient>
        </Defs>

        <Circle
          cx={cx}
          cy={cy}
          r={R}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={STROKE}
          fill="none"
        />

        {phases.map((p, index) => (
          <PhaseArc
            key={p.key}
            phaseData={p}
            isActive={p.key === phase}
            index={index}
          />
        ))}

        <PulseDot cx={cx} cy={cy} dotAngle={dotAngle} />
      </Svg>

      <View style={styles.center}>
        <Text style={styles.dayNumber}>{cycleDay}</Text>
        <Text style={styles.dayLabel}>of {cycleLength}</Text>
        <View style={styles.phasePill}>
          <View style={[styles.phaseDot, { backgroundColor: currentPhaseInfo.color }]} />
          <Text style={[styles.phaseName, { color: currentPhaseInfo.color }]}>
            {currentPhaseInfo.shortName}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZE,
    height: SIZE,
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
  },
  dayNumber: {
    fontSize: 56,
    fontWeight: font.weight.bold,
    color: colors.textPrimary,
    letterSpacing: -2,
    lineHeight: 60,
  },
  dayLabel: {
    fontSize: 14,
    color: colors.textTertiary,
    marginTop: 2,
  },
  phasePill: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  phaseDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  phaseName: {
    fontSize: 13,
    fontWeight: font.weight.medium,
  },
});
