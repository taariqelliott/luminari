import '@/global.css';
import { Tabs } from 'expo-router';
import { NAV_THEME, THEME } from '@/lib/theme';
import { StatusBar } from 'expo-status-bar';
export { ErrorBoundary } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Home, User, Settings, Telescope, Plus } from 'lucide-react-native';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeProvider } from '@react-navigation/native';
import { ConvexReactClient } from 'convex/react';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { HapticTab } from '@/components/HapticTab';

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
const convex = new ConvexReactClient(convexUrl!);
const clerkKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const tabBarOptions = {
    tabBarActiveTintColor: colorScheme === 'dark' ? THEME.dark.primary : THEME.light.primary,
  };
  return (
    <ClerkProvider publishableKey={clerkKey} tokenCache={tokenCache}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
          <StatusBar style="auto" />
          <Tabs screenOptions={tabBarOptions}>
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
              name="discover"
              options={{
                title: 'Discover',
                tabBarLabel: 'Discover',
                tabBarButton: HapticTab,
                headerShown: false,
                tabBarIcon: ({ color, size }) => <Telescope color={color} size={size} />,
              }}
            />
            <Tabs.Screen
              name="create"
              options={{
                title: 'Create',
                tabBarLabel: 'Create',
                tabBarButton: HapticTab,
                headerShown: false,
                tabBarIcon: ({ color, size }) => <Plus color={color} size={size} />,
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
