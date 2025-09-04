import { SafeAreaView, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-expo';

export default function ProfileScreen() {
  const { user } = useUser();

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 70 }}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold">Profile Page</Text>
        <Text className="text-xl font-semibold">
          Welcome{' '}
          <Text className="text-xl font-bold text-primary">
            {user?.emailAddresses[0].emailAddress ?? 'Guest'}!
          </Text>
        </Text>
        <Link href="/profile/edit" asChild>
          <Button>
            <Text>Edit Profile</Text>
          </Button>
        </Link>
      </View>
    </SafeAreaView>
  );
}
