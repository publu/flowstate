import React, { useEffect, useState } from 'react';
import { Text, TextStyle } from 'react-native';
import { useSharedValue, useAnimatedReaction, withTiming, withDelay, Easing, runOnJS } from 'react-native-reanimated';

interface Props {
  to: number;
  duration?: number;
  delay?: number;
  style?: TextStyle;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({ to, duration = 800, delay = 0, style, prefix = '', suffix = '' }: Props) {
  const [display, setDisplay] = useState(0);
  const val = useSharedValue(0);

  useEffect(() => {
    val.value = withDelay(
      delay,
      withTiming(to, { duration, easing: Easing.out(Easing.cubic) }),
    );
  }, [to]);

  useAnimatedReaction(
    () => Math.round(val.value),
    (current) => {
      runOnJS(setDisplay)(current);
    },
  );

  return <Text style={style}>{prefix}{display}{suffix}</Text>;
}
