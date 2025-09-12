import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';

export default function DiscoverScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-semibold text-primary">Discover Screen</Text>
      <Link href="/discover/edit">
        <Text>To Edit</Text>
      </Link>
    </View>
  );
}
