import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { View } from 'react-native';

export default function CreateScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-1">
      <Link href="/create/events/eventsStepOne" asChild>
        <Button>
          <Text>Events</Text>
        </Button>
      </Link>
    </View>
  );
}
