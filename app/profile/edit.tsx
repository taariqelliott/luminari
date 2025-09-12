import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';

export default function ProfileEdit() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Profile Edit Page</Text>
      <Button onPress={() => router.back()}>
        <Text>Back To Profile Index</Text>
      </Button>
    </View>
  );
}
