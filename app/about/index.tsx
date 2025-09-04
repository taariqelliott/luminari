import { SafeAreaView, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-expo';

export default function AboutScreen() {
  const { user } = useUser();

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 70 }}>
      <View className="flex-1 items-center justify-center">
        <Text>About Page</Text>
        <Text>
          Welcome{' '}
          <Text className="font-bold text-primary">
            {user?.emailAddresses[0].emailAddress ?? 'Guest'}!
          </Text>
        </Text>
        <Link href="/about/edit" asChild>
          <Button>
            <Text>Edit About</Text>
          </Button>
        </Link>
      </View>
    </SafeAreaView>
  );
}
