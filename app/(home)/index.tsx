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

export default function HomeScreen() {
  const { colorScheme } = useColorScheme();
  const { isSignedIn, isLoaded } = useAuth();
  const currentUser = useQuery(api.users.currentUser);
  const [isSplashScreenActive, setIsSplashScreenActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsSplashScreenActive(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isSplashScreenActive || !isLoaded || (isSignedIn && currentUser === undefined)) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold">Luminari</Text>
        <BottomTabSpacer />
      </View>
    );
  }

  if (!isSignedIn) {
    return (
      <View className="flex-1 items-center justify-center">
        <AuthScreen />
        <BottomTabSpacer />
      </View>
    );
  }

  if (!currentUser) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-xl">Welcome To Luminari!</Text>
        <Link href="/(home)/PersonalInfoForm" asChild>
          <Button variant="outline">
            <ArrowBigRight
              color={
                colorScheme === 'dark'
                  ? THEME.dark.secondaryForeground
                  : THEME.light.secondaryForeground
              }
            />
            <Text>Complete Onboarding</Text>
          </Button>
        </Link>
        <BottomTabSpacer />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-xl font-bold">•Welcome To Luminari•</Text>
      <Text className="mt-2">Hello, {currentUser.username} 👋</Text>
      <BottomTabSpacer />
    </View>
  );
}
