import AuthScreen from '@/components/AuthScreen';
import BottomTabSpacer from '@/components/BottomTabSpacer';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { api } from '@/convex/_generated/api';
import { THEME } from '@/lib/theme';
import { useAuth } from '@clerk/clerk-expo';
import { useQuery } from 'convex/react';
import { Link } from 'expo-router';
import { ArrowBigRight } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { colorScheme } = useColorScheme();
  const { isSignedIn, isLoaded } = useAuth();
  const currentUser = useQuery(api.users.currentUser);
  const [isSplashScreenActive, setIsSplashScreenActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsSplashScreenActive(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isSplashScreenActive || !isLoaded || (isSignedIn && currentUser === undefined)) {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center bg-background">
          <View className="items-center">
            <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-primary">
              <Text className="text-2xl">✨</Text>
            </View>
            <Text className="text-3xl font-bold text-foreground">Luminari</Text>
            <Text className="mt-2 text-sm text-muted-foreground">Loading your experience...</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (!isSignedIn) {
    return (
      <SafeAreaView className="h-full flex-1 items-center">
        <View className="flex-1 bg-background">
          <AuthScreen />
        </View>
      </SafeAreaView>
    );
  }

  if (!currentUser) {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 bg-background">
          <View className="px-6 pb-6 pt-4">
            <Text className="mb-2 text-3xl font-bold text-foreground">Welcome!</Text>
            <Text className="text-sm text-muted-foreground">Let's complete your profile setup</Text>
          </View>

          <View className="flex-1 justify-center px-6">
            <View className="items-center rounded-2xl border border-border bg-card p-6 shadow-sm">
              <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-primary">
                <Text className="text-2xl">🎓</Text>
              </View>
              <Text className="mb-2 text-center text-xl font-bold text-foreground">
                Almost Ready!
              </Text>
              <Text className="mb-6 text-center text-sm leading-5 text-muted-foreground">
                Complete your onboarding to start discovering events and connecting with your school
                community.
              </Text>

              <Link href="/(home)/PersonalInfoForm" asChild>
                <Button className="h-12 w-full rounded-xl bg-primary">
                  <View className="flex-row items-center">
                    <Text className="mr-2 text-base font-semibold text-primary-foreground">
                      Complete Setup
                    </Text>
                    <ArrowBigRight
                      size={20}
                      color={
                        colorScheme === 'dark'
                          ? THEME.dark.primaryForeground
                          : THEME.light.primaryForeground
                      }
                    />
                  </View>
                </Button>
              </Link>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-background">
        <View className="px-6 pb-6 pt-4">
          <Text className="mb-2 text-3xl font-bold text-foreground">Home</Text>
          <Text className="text-sm text-muted-foreground">
            Welcome back, {currentUser.username}
          </Text>
        </View>

        <View className="flex-1 justify-center px-6">
          <View className="items-center rounded-2xl border border-border bg-card p-6 shadow-sm">
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Text className="text-2xl">👋</Text>
            </View>
            <Text className="mb-2 text-xl font-bold text-foreground">Welcome to Luminari</Text>
            <Text className="text-center text-sm leading-5 text-muted-foreground">
              Discover events, connect with your school community, and make the most of your campus
              experience.
            </Text>
          </View>
        </View>

        <BottomTabSpacer />
      </View>
    </SafeAreaView>
  );
}
