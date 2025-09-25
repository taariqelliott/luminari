import BottomTabSpacer from '@/components/BottomTabSpacer';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { View } from 'react-native';

export default function CreateScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-1">
      <Text>What do you want to create?</Text>
      <View className="flex-row gap-2">
        <Link href="/create/events/eventsPageOne" asChild>
          <Button className="w-36">
            <Text>Event</Text>
          </Button>
        </Link>
        <Link href="/create/events/eventsPageOne" asChild>
          <Button className="w-36">
            <Text>Request</Text>
          </Button>
        </Link>
      </View>
      <BottomTabSpacer />
    </View>
  );
}
