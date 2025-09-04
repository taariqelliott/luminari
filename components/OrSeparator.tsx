import { View } from 'react-native';
import { Text } from '@/components/ui/text';

export function OrSeparator({ text = 'or' }: { text?: string }) {
  return (
    <View className="my-2 flex-row items-center">
      <View className="h-px flex-1 bg-muted-foreground" />
      <Text className="px-2 text-muted-foreground">{text}</Text>
      <View className="h-px flex-1 bg-muted-foreground" />
    </View>
  );
}
