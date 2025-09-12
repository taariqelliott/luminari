import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { View } from 'react-native';

export default function CreateScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-semibold text-primary">Create Screen</Text>
      <Link href="/create/edit">
        <Text>To Edit</Text>
      </Link>
    </View>
  );
}
