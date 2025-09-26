import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RequestsScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="px-6 pb-4 pt-4">
        <Text className="text-3xl font-bold text-foreground">Requests</Text>
        <Text className="text-sm text-muted-foreground">
          Create a request for something you'd like to see!
        </Text>
      </View>
    </SafeAreaView>
  );
}
