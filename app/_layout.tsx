import '@/global.css';
import { Tabs } from 'expo-router';
import { NAV_THEME } from '@/lib/theme';
import { StatusBar } from 'expo-status-bar';
export { ErrorBoundary } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Home, User } from 'lucide-react-native';
import { PortalHost } from '@rn-primitives/portal';
import ThemeToggle from '@/components/ThemeToggle';
import { ThemeProvider } from '@react-navigation/native';
import { ConvexReactClient } from 'convex/react';
import { Platform } from 'react-native';
import { ConvexAuthProvider } from '@convex-dev/auth/react';
import * as SecureStore from 'expo-secure-store';

import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const secureStorage = {
  getItem: SecureStore.getItemAsync,
  setItem: SecureStore.setItemAsync,
  removeItem: SecureStore.deleteItemAsync,
};

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <ConvexAuthProvider
      client={convex}
      storage={Platform.OS === 'android' || Platform.OS === 'ios' ? secureStorage : undefined}>
      <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
        <StatusBar style="auto" />
        <Tabs>
          <Tabs.Screen
            name="index"
            options={{
              headerTitle: 'Home',
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
            }}
          />
          <Tabs.Screen
            name="about"
            options={{
              headerTitle: 'About',
              tabBarLabel: 'About',
              headerShown: false,
              tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
            }}
          />
        </Tabs>
        <ThemeToggle />
        <PortalHost />
      </ThemeProvider>
    </ConvexAuthProvider>
  );
}
