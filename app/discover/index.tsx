import { Text } from '@/components/ui/text';
import { useState } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventsScreen from './events';
import RequestsScreen from './requests';

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
    <SafeAreaView className="flex-1">
      <View className="px-6 pb-2 pt-4">
        <Text className="text-3xl font-bold text-foreground">Event Requests</Text>
        <Text className="mt-2 text-sm text-muted-foreground">
          Browse requests for upcoming events
        </Text>
      </View>

      <View className="mx-auto flex-row items-center justify-center gap-2 rounded border border-secondary">
        <Pressable
          className={`h-10 w-32 items-center justify-center ${eventsViewIsActive ? 'bg-secondary' : 'bg-transparent'}`}
          onPress={makeEventsViewVisible}>
          <Text className="text-center">Events</Text>
        </Pressable>

        <Pressable
          className={`h-10 w-32 items-center justify-center ${requestsViewIsActive ? 'bg-secondary' : 'bg-transparent'}`}
          onPress={makeRequestsViewVisible}>
          <Text className="text-center">Requests</Text>
        </Pressable>
      </View>

      <View className="w-full flex-1">
        {eventsViewIsActive && <EventsScreen />}
        {requestsViewIsActive && <RequestsScreen />}
      </View>
    </SafeAreaView>
  );
}
