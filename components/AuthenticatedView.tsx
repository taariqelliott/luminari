import { View } from 'react-native';
import { useUsernameStore } from '@/stores/stores';
import { Text } from './ui/text';

export default function AuthenticatedView() {
  const username = useUsernameStore((user) => user.username);

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-muted-foreground">User Logged In {username}</Text>
    </View>
  );
}
