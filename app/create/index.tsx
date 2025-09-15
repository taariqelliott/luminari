import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { View } from 'react-native';
import EventCreationForm from './EventCreationForm';

export default function CreateScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-1">
      <Text className="text-2xl font-semibold text-primary">Create Screen</Text>
      <EventCreationForm />
    </View>
  );
}
