import BottomTabSpacer from '@/components/BottomTabSpacer';
import { Text } from '@/components/ui/text';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Link } from 'expo-router';
import { ScrollView, TouchableOpacity, View } from 'react-native';

export default function DiscoverScreen() {
  const allEvents = useQuery(api.eventCreation.getAllEvents);
  allEvents?.forEach((event) => {
    console.log(event);
  });

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-semibold text-primary">Discover Screen</Text>
      <ScrollView>
        <View className="flex-row flex-wrap items-center justify-center gap-4 py-4">
          {allEvents?.map((event) => (
            <Link key={event._id} href={`/discover/${event._id}`} asChild>
              <TouchableOpacity>
                <View className="h-72 w-48 gap-2 rounded bg-primary p-4 text-muted-foreground">
                  <Text>{event.eventName}</Text>
                  <Text>{event.eventSchoolName}</Text>
                  <Text>{event.eventContactPerson}</Text>
                  <Text>{event.eventContactEmail}</Text>
                  <Text>{event.eventStartTime}</Text>
                  <Text>{event.eventEndTime}</Text>
                  <Text>{event.eventTags}</Text>
                </View>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
      <BottomTabSpacer />
    </View>
  );
}
