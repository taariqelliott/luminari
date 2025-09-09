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

  console.log('=== RENDER START ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('splashScreenActive:', splashScreenActive);
  console.log('isLoaded:', isLoaded);
  console.log('isSignedIn:', isSignedIn);
  console.log('currentUser:', currentUser);
  console.log('currentUser type:', typeof currentUser);

  if (currentUser !== null && currentUser !== undefined) {
    console.log('🔍 USER DATA DETAILS:');
    console.log('  hasCompletedOnboarding:', currentUser.hasCompletedOnboarding);
    console.log('  hasCompletedOnboarding type:', typeof currentUser.hasCompletedOnboarding);
    console.log('  username:', currentUser.username);
    console.log('  _id:', currentUser._id);
  }

  useEffect(() => {
    console.log('⏰ Setting splash screen timer');
    const timer = setTimeout(() => {
      console.log('⏰ Splash screen timer finished - setting splashScreenActive to false');
      setSplashScreenActive(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  console.log('🔍 CHECKING CONDITIONS:');
  console.log('  splashScreenActive:', splashScreenActive);
  console.log('  !isLoaded:', !isLoaded);
  console.log(
    '  isSignedIn && currentUser === undefined:',
    isSignedIn && currentUser === undefined
  );

  if (
    splashScreenActive ||
    !isLoaded ||
    (isSignedIn && currentUser === undefined) ||
    (isSignedIn && currentUser === null)
  ) {
    console.log('✋ SHOWING LOADING SCREEN');
    console.log('=== RENDER END (LOADING) ===\n');
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold">Umoja</Text>
      </View>
    );
  }

  if (!isSignedIn) {
    console.log('✋ SHOWING AUTH SCREEN');
    console.log('=== RENDER END (AUTH) ===\n');
    return (
      <View className="flex-1 items-center justify-center">
        <AuthScreen />
      </View>
    );
  }

  console.log('🎯 ABOUT TO RENDER MAIN UI');
  console.log('  currentUser exists:', !!currentUser);
  console.log('  Will show onboarding button:', !currentUser);
  console.log('  Will show welcome message:', !!currentUser);

  if (currentUser) {
    console.log('👋 RENDERING WELCOME MESSAGE');
  } else {
    console.log('🚀 RENDERING ONBOARDING BUTTON');
  }

  console.log('=== RENDER END (MAIN UI) ===\n');

  return (
    <View className="flex-1 items-center justify-center p-4">
      <View className="flex items-center justify-center">
        <Text className="text-xl font-bold">•Welcome To Umoja•</Text>
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
