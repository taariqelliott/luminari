import '@/global.css';
import { NAV_THEME, THEME } from '@/lib/theme';
import {
  createNativeBottomTabNavigator,
  NativeBottomTabNavigationEventMap,
  NativeBottomTabNavigationOptions,
} from '@bottom-tabs/react-navigation';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { ParamListBase, TabNavigationState, ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { withLayoutContext } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { LogBox } from 'react-native';
export { ErrorBoundary } from 'expo-router';

LogBox.ignoreLogs(['Open debugger to view warnings.']);

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
const convex = new ConvexReactClient(convexUrl!);
const clerkKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const BottomTabNavigator = createNativeBottomTabNavigator().Navigator;
const Tabs = withLayoutContext<
  NativeBottomTabNavigationOptions,
  typeof BottomTabNavigator,
  TabNavigationState<ParamListBase>,
  NativeBottomTabNavigationEventMap
>(BottomTabNavigator);

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const tabBarOptions = {
    tabBarActiveTintColor: colorScheme === 'dark' ? THEME.dark.primary : THEME.light.primary,
  };

  return (
    <ClerkProvider publishableKey={clerkKey} tokenCache={tokenCache} telemetry={false}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
          <StatusBar style="auto" />
          <Tabs screenOptions={tabBarOptions}>
            <Tabs.Screen
              name="(home)"
              options={{
                title: 'Home',
                tabBarLabel: 'Home',
                tabBarIcon: () => ({ sfSymbol: 'house' }),
              }}
            />
            <Tabs.Screen
              name="discover"
              options={{
                title: 'Discover',
                tabBarLabel: 'Discover',
                tabBarIcon: () => ({ sfSymbol: 'magnifyingglass' }),
              }}
            />
            <Tabs.Screen
              name="create"
              options={{
                title: 'Create',
                tabBarLabel: 'Create',
                tabBarIcon: () => ({ sfSymbol: 'plus' }),
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: 'Profile',
                tabBarLabel: 'Profile',
                tabBarIcon: () => ({ sfSymbol: 'person' }),
              }}
            />
            <Tabs.Screen
              name="settings"
              options={{
                title: 'Settings',
                tabBarLabel: 'Settings',
                tabBarIcon: () => ({ sfSymbol: 'gearshape.2' }),
              }}
            />
            <Tabs.Screen
              name="(auth)"
              options={{
                tabBarItemHidden: true,
              }}
            />
          </Tabs>
          <PortalHost />
        </ThemeProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
