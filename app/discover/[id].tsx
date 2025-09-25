import { Text } from '@/components/ui/text';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';

export default function EventsPage() {
  const { id } = useLocalSearchParams();
  const currentEvent = useQuery(api.eventCreation.getEventById, { id: id as Id<'events'> });
  const navigation = useNavigation();

  useEffect(() => {
    if (currentEvent?.eventName) {
      navigation.setOptions({ title: currentEvent.eventName });
    }
  }, [currentEvent, navigation]);

  return (
    <View className="flex-1 px-4 py-6">
      <Text className="mb-4 text-2xl font-bold">Events Page {currentEvent?.eventName}</Text>
      {currentEvent &&
        Object.entries(currentEvent).map(([key, value]) => (
          <View
            key={key}
            className="flex-row items-center justify-between border-b border-primary py-3">
            <Text className="text-base font-medium">{key}</Text>
            <Text className="text-base">
              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
            </Text>
          </View>
        ))}
    </View>
  );
}
