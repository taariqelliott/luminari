import { SafeAreaView, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-expo';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Badge } from '@/components/ui/badge';

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

        {currentUser !== null && (
          <View className="mt-2 w-full gap-2 px-3">
            {Object.entries(currentUser as object).map(([key, value]) => (
              <View key={key} className="flex-row gap-2">
                <Text>{key}:</Text>
                <Badge>
                  <Text>{value.toString()}</Text>
                </Badge>
              </View>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
