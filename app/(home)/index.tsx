import { View } from 'react-native';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Text } from '@/components/ui/text';
import AuthScreen from '@/components/AuthScreen';
import UserOnboardingForm from '@/components/UserOnboardingForm';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { BadgeCheckIcon } from 'lucide-react-native';

export default function HomeScreen() {
  const { user, isLoaded } = useUser();
  console.log(user?.primaryEmailAddress?.emailAddress);

  const currentUser = useQuery(api.users.currentUser);
  const [splashScreenActive, setSplashScreenActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setSplashScreenActive(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (splashScreenActive) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Umoja</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center p-4">
      <SignedIn>
        {currentUser === undefined || !isLoaded ? (
          <UserOnboardingForm />
        ) : (
          <View className="flex items-center justify-center">
            {currentUser && currentUser?.username !== '' && (
              <>
                <Text className="text-xl font-bold">•Welcome•</Text>
                <Badge variant="secondary" className="bg-primary">
                  <Icon as={BadgeCheckIcon} className="text-primary-foreground" />
                  <Text className="text-xl font-bold text-primary-foreground">
                    {currentUser.username}
                  </Text>
                </Badge>
              </>
            )}
          </View>
        )}
      </SignedIn>

      <SignedOut>
        <AuthScreen />
      </SignedOut>
    </View>
  );
}
