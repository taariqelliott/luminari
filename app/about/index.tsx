import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { Button } from '@/components/ui/button';
import { useUsernameStore } from '@/stores/stores';

export default function AboutScreen() {
  const username = useUsernameStore((user) => user.username);

  return (
    <View className="flex-1 items-center justify-center">
      <Text>About Page</Text>
      <Text>
        Welcome{' '}
        <Text className="font-bold text-primary">
          {username.charAt(0).toUpperCase() + username.slice(1)}!
        </Text>
      </Text>
      <Link href="/about/edit" asChild>
        <Button>
          <Text>Edit About</Text>
        </Button>
      </Link>
    </View>
  );
}
