import { Text } from '@/components/ui/text';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EventsPage() {
  const { eventId } = useLocalSearchParams();
  const currentEvent = useQuery(api.eventCreation.getEventById, {
    id: eventId as Id<'events'>,
  });
  const navigation = useNavigation();

  useEffect(() => {
    if (currentEvent?.eventName) {
      navigation.setOptions({ title: currentEvent.eventName });
    }
  }, [currentEvent, navigation]);

  if (!currentEvent) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <Text className="text-muted-foreground">Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const displayFields = [
    { key: 'eventName', label: 'Event Name', value: currentEvent.eventName },
    { key: 'eventDate', label: 'Date', value: currentEvent.eventDate },
    { key: 'eventStartTime', label: 'Start Time', value: currentEvent.eventStartTime },
    { key: 'eventEndTime', label: 'End Time', value: currentEvent.eventEndTime },
    { key: 'eventSchoolName', label: 'School', value: currentEvent.eventSchoolName },
    { key: 'eventContactPerson', label: 'Contact Person', value: currentEvent.eventContactPerson },
    { key: 'eventContactEmail', label: 'Contact Email', value: currentEvent.eventContactEmail },
    { key: 'eventContactPhone', label: 'Contact Phone', value: currentEvent.eventContactPhone },
    {
      key: 'attendingUserIds',
      label: 'Attendance Count',
      value: currentEvent.attendingUserIds?.length,
    },
  ];

  return (
    <View className="flex-1 bg-background px-6 py-4">
      {currentEvent.eventImgUrl && (
        <View className="mb-6 overflow-hidden rounded-2xl">
          <Image
            source={{ uri: currentEvent.eventImgUrl }}
            className="h-48 w-full rounded-2xl"
            resizeMode="cover"
          />
        </View>
      )}

      <View className="mb-6">
        <Text className="mb-2 text-3xl font-bold text-foreground">{currentEvent.eventName}</Text>
        <View className="mt-1 self-start rounded-full bg-primary/10 px-3 py-1">
          <Text className="text-sm font-medium text-primary">{currentEvent.eventSchoolName}</Text>
        </View>
      </View>

      <View className="mb-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <Text className="mb-4 text-xl font-semibold text-foreground">Event Details</Text>
        {displayFields.slice(1).map((field) => (
          <View key={field.key} className="mb-3">
            <Text className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {field.label}
            </Text>
            <Text className="text-base leading-5 text-foreground">
              {field.value || 'Not specified'}
            </Text>
          </View>
        ))}
      </View>

      {currentEvent.eventTags && currentEvent.eventTags.length > 0 && (
        <View className="mb-6">
          <Text className="mb-3 text-lg font-semibold text-foreground">Tags</Text>
          <View className="flex-row flex-wrap gap-2">
            {currentEvent.eventTags.map((tag: string) => (
              <View key={tag} className="rounded-full bg-primary/10 px-3 py-1.5">
                <Text className="text-sm font-medium text-primary">#{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
