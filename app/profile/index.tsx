import { SafeAreaView, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-expo';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function ProfileScreen() {
  const { user } = useUser();
  const currentUser = useQuery(api.users.currentUser);

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

        <View className="gap-2">
          {Object.entries(currentUser as object).map(([key, value]) => (
            <Text>
              {key}: {value.toString()}
            </Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
