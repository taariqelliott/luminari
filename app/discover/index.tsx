import { View, ScrollView } from 'react-native';
import EventsScreen from './events';
import RequestsScreen from './requests';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';

export default function DiscoverIndex() {
  const [eventsViewIsActive, setEventsViewIsActive] = useState(true);
  const [requestsViewIsActive, setRequestsViewIsActive] = useState(false);

  const makeEventsViewVisible = () => {
    setEventsViewIsActive(true);
    setRequestsViewIsActive(false);
  };
  const makeRequestsViewVisible = () => {
    setRequestsViewIsActive(true);
    setEventsViewIsActive(false);
  };
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <View className="px-6 pb-2 pt-4">
        <Text className="text-3xl font-bold text-foreground">Event Requests</Text>
        <Text className="mt-2 text-sm text-muted-foreground">
          Browse requests for upcoming events
        </Text>
      </View>
      <View className="flex-row items-center justify-center gap-2">
        <Button className="w-32" onPress={makeEventsViewVisible}>
          <Text>Events</Text>
        </Button>
        <Button className="w-32" onPress={makeRequestsViewVisible}>
          <Text>Requests</Text>
        </Button>
      </View>

      <ScrollView>
        {eventsViewIsActive && <EventsScreen />}
        {requestsViewIsActive && <RequestsScreen />}
      </ScrollView>
    </SafeAreaView>
  );
}
