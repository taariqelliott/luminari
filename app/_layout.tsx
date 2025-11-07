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
import { useEffect } from 'react';
import { LogBox, Platform } from 'react-native';
import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();
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

export type ColorSelection = 'light' | 'dark' | undefined;

export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();

  const tabBarOptions = {
    tabBarActiveTintColor: colorScheme === 'dark' ? THEME.dark.primary : THEME.light.primary,
  };

  const screenListeners = ({ route, navigation }: { route: any; navigation: any }) => ({
    tabPress: (e: { preventDefault: () => void }) => {
      const platformVersion = Platform.Version;
      if (platformVersion === '26.1') {
        const rootState = navigation.getState();
        const tabRoute = rootState.routes.find((r: { name: any }) => r.name === route.name);
        const stackState = tabRoute?.state;
        const isNested = stackState && stackState.index ? stackState.index > 0 : false;
        if (isNested) {
          e.preventDefault();
        }
      } else {
        return;
      }
    },
  });

  useEffect(() => {
    const storedMode = storage.getString('colorScheme') as ColorSelection;
    if (storedMode && storedMode !== colorScheme) {
      setColorScheme(storedMode);
    }
  }, []);

  useEffect(() => {
    if (colorScheme) {
      storage.set('colorScheme', colorScheme);
    }
  }, [colorScheme]);

  return (
    <ClerkProvider publishableKey={clerkKey} tokenCache={tokenCache} telemetry={false}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
          <StatusBar style="auto" />
          <Tabs screenOptions={tabBarOptions}>
            <Tabs.Screen
              listeners={screenListeners}
              name="(home)"
              options={{
                title: 'Home',
                tabBarLabel: 'Home',
                tabBarIcon: () => ({ sfSymbol: 'house' }),
              }}
            />
            <Tabs.Screen
              listeners={screenListeners}
              name="discover"
              options={{
                title: 'Discover',
                tabBarLabel: 'Discover',
                tabBarIcon: () => ({ sfSymbol: 'magnifyingglass' }),
              }}
            />
            <Tabs.Screen
              listeners={screenListeners}
              name="create"
              options={{
                title: 'Create',
                tabBarLabel: 'Create',
                tabBarIcon: () => ({ sfSymbol: 'plus' }),
              }}
            />
            <Tabs.Screen
              listeners={screenListeners}
              name="profile"
              options={{
                title: 'Profile',
                tabBarLabel: 'Profile',
                tabBarIcon: () => ({ sfSymbol: 'person' }),
              }}
            />
            <Tabs.Screen
              listeners={screenListeners}
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
