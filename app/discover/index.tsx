import BottomTabSpacer from '@/components/BottomTabSpacer';
import { Text } from '@/components/ui/text';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Link } from 'expo-router';
import { ScrollView, TouchableOpacity, View } from 'react-native';

export default function DiscoverScreen() {
  const events = useQuery(api.eventCreation.getAllEvents);

  return (
    <View className="flex-1">
      <View className="px-4">
        <Text className="text-2xl font-semibold">Discover</Text>
      </View>

      <ScrollView contentContainerClassName="px-4 py-4" showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between gap-y-4">
          {events?.map((event) => (
            <Link key={event._id} href={`/discover/${event._id}`} asChild>
              <TouchableOpacity className="w-[48%]">
                <View className="h-72 rounded-2xl border border-card-foreground bg-primary p-4 shadow-sm">
                  <Text className="text-lg font-bold text-primary-foreground">
                    {event.eventName}
                  </Text>
                  <Text className="text-sm text-card">{event.eventSchoolName}</Text>

                  <View className="mt-3">
                    <Text className="text-sm text-secondary-foreground">
                      {event.eventContactPerson}
                    </Text>
                    <Text className="text-sm text-secondary-foreground">
                      {event.eventContactEmail}
                    </Text>
                  </View>

                  <View className="mt-3">
                    <Text className="text-sm text-accent-foreground">
                      Start: {event.eventStartTime}
                    </Text>
                    <Text className="text-sm text-accent-foreground">
                      End: {event.eventEndTime}
                    </Text>
                  </View>

                  <View className="mt-auto">
                    <Text className="text-xs text-card">{event.eventTags}</Text>
                  </View>
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
