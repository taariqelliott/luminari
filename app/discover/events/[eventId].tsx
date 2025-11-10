import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EventsPage() {
  const { eventId } = useLocalSearchParams();
  const deleteEventMutation = useMutation(api.eventCreation.deleteEventById);
  const currentUser = useQuery(api.users.currentUser);
  const currentEvent = useQuery(api.eventCreation.getEventById, {
    id: eventId as Id<'events'>,
  });
  const navigation = useNavigation();

  const [aspectRatio, setAspectRatio] = useState(1);

  const uri =
    currentEvent?.eventImgUrl ??
    'https://marketplace.canva.com/EAGS_qOXjpI/1/0/1600w/canva-blue-and-purple-gradient-background-instagram-post-wE1uA0M0RPU.jpg';

  useEffect(() => {
    if (!uri) return;
    Image.getSize(
      uri,
      (width, height) => {
        setAspectRatio(width / height);
      },
      () => setAspectRatio(1)
    );
  }, [uri]);

  const deleteEvent = () => {
    if (currentEvent) {
      deleteEventMutation({ id: currentEvent._id });
    }
    router.push('/discover');
  };

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
    <ScrollView className="mb-20 flex-1 bg-background px-6 pt-4">
      <View className="mb-3 rounded-2xl">
        <Dialog>
          <DialogTrigger asChild>
            <TouchableOpacity activeOpacity={0}>
              <View className="flex justify-center">
                <Image
                  source={{ uri }}
                  className="w-full rounded-2xl"
                  style={{ aspectRatio }}
                  resizeMode="cover"
                />
              </View>
            </TouchableOpacity>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <View className="flex justify-center">
              <Image
                source={{ uri }}
                className="w-full rounded-2xl"
                style={{ aspectRatio }}
                resizeMode="contain"
              />
            </View>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">
                  <Text>Close</Text>
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>
      <Separator className="my-2" />
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
              {field.key !== 'attendingUserIds' ? field.value || 'Not specified' : field.value || 0}
            </Text>
          </View>
        ))}
      </View>

      {currentUser?._id === currentEvent.createdBy && (
        <View>
          <Button onPress={deleteEvent}>
            <Text>Delete</Text>
          </Button>
        </View>
      )}

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
    </ScrollView>
  );
}
