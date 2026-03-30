import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { colors, font } from '../../src/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 84,
          paddingBottom: 24,
          paddingTop: 10,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: font.size.xs,
          fontWeight: font.weight.medium,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22 }}>{'\u{1F4A1}'}</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Cycle',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22 }}>{'\u{1F504}'}</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="checkin"
        options={{
          title: 'Check In',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22 }}>{'\u{1F4DD}'}</Text>
          ),
        }}
      />
    </Tabs>
  );
}
