import { View } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { Text } from '@/components/ui/text';
import AuthScreen from '@/components/AuthScreen';
import { useEffect, useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Link } from 'expo-router';
import { Button } from '@/components/ui/button';

export default function HomeScreen() {
  const [splashScreenActive, setSplashScreenActive] = useState(true);
  const { isSignedIn, isLoaded } = useAuth();
  const currentUser = useQuery(api.users.currentUser);
  const [onboardingChecked, setOnboardingChecked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashScreenActive(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (splashScreenActive || !isLoaded || (isSignedIn && currentUser === undefined)) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold">luminari</Text>
      </View>
    );
  }

  if (!isSignedIn) {
    return (
      <View className="flex-1 items-center justify-center">
        <AuthScreen />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center p-4">
      <View className="flex items-center justify-center">
        <Text className="text-xl font-bold">•Welcome To luminari•</Text>
      </View>
      {currentUser ? (
        <Text className="mt-2">Hello, {currentUser.username} 👋</Text>
      ) : (
        <View className="mt-4">
          <Link href="/(home)/onboardingForm" asChild>
            <Button>
              <Text>Complete Your Onboarding</Text>
            </Button>
          </Link>
        </View>
      )}
    </View>
  );
}
