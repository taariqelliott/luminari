import '@/global.css';
import { Tabs } from 'expo-router';
import { NAV_THEME } from '@/lib/theme';
import { StatusBar } from 'expo-status-bar';
export { ErrorBoundary } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Home, User, Settings } from 'lucide-react-native';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeProvider } from '@react-navigation/native';
import { ConvexReactClient } from 'convex/react';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { HapticTab } from '@/components/HapticTab';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const clerkKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!clerkKey) {
  throw new Error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in environment');
}

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <ClerkProvider publishableKey={clerkKey} tokenCache={tokenCache}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
          <StatusBar style="auto" />
          <Tabs>
            <Tabs.Screen
              name="(home)"
              options={{
                title: 'Home',
                tabBarLabel: 'Home',
                tabBarButton: HapticTab,
                headerShown: false,
                tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: 'Profile',
                tabBarLabel: 'Profile',
                tabBarButton: HapticTab,
                headerShown: false,
                tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
              }}
            />
            <Tabs.Screen
              name="settings"
              options={{
                title: 'Settings',
                tabBarLabel: 'Settings',
                tabBarButton: HapticTab,
                headerShown: false,
                tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
              }}
            />
            <Tabs.Screen
              name="(auth)"
              options={{
                headerShown: false,
                href: null,
              }}
            />
          </Tabs>
          <PortalHost />
        </ThemeProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
