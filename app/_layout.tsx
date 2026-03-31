import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '../src/constants/theme';

let Wrapper: React.ComponentType<{ style?: any; children: React.ReactNode }>;
try {
  Wrapper = require('react-native-gesture-handler').GestureHandlerRootView;
} catch {
  Wrapper = View;
}

export default function RootLayout() {
  return (
    <Wrapper style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
            animation: 'fade',
          }}
        />
      </SafeAreaProvider>
    </Wrapper>
  );
}
