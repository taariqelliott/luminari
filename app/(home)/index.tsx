import { View } from 'react-native';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Text } from '@/components/ui/text';
import AuthScreen from '@/components/AuthScreen';
import UserOnboardingForm from '@/components/UserOnboardingForm';

export default function HomeScreen() {
  const { user } = useUser();

  return (
    <View className="flex-1 items-center justify-center p-4">
      <SignedIn>
        <Text className="text-xl font-bold">Welcome {user?.emailAddresses[0].emailAddress}</Text>
        <UserOnboardingForm />
      </SignedIn>
      <SignedOut>
        <AuthScreen />
      </SignedOut>
    </View>
  );
}
