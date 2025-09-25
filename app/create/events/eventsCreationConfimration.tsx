import BottomTabSpacer from '@/components/BottomTabSpacer';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import {
  useEventContactEmailStore,
  useEventContactPersonStore,
  useEventContactPhoneStore,
  useEventDateStore,
  useEventEndTimeStore,
  useEventNameStore,
  useEventStartTimeStore,
  useEventTagsStore,
} from '@/stores/EventCreationForm';
import { useUser } from '@clerk/clerk-expo';
import { CommonActions, StackActions, useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from 'convex/react';
import { View } from 'react-native';
import z from 'zod';

export const eventCreationSchema = z.object({
  eventName: z.string(),
  eventDate: z.string(),
  eventStartTime: z.string(),
  eventEndTime: z.string(),
  eventContactPerson: z.string(),
  eventContactEmail: z.string(),
  eventContactPhone: z.optional(z.string()),
  eventSchoolName: z.string(),
  createdBy: z.custom<Id<'users'>>(),
  eventTags: z.array(z.string()),
});

export type EventCreationFormData = z.infer<typeof eventCreationSchema>;

export default function EventsCreationConfimrationPage() {
  const { user } = useUser();
  const currentUser = useQuery(api.users.currentUser);

  const eventDate = useEventDateStore((state) => state.eventDate);
  const eventName = useEventNameStore((state) => state.eventName);
  const eventStartTime = useEventStartTimeStore((state) => state.eventStartTime);
  const eventEndTime = useEventEndTimeStore((state) => state.eventEndTime);
  const eventContactPerson = useEventContactPersonStore((state) => state.eventContactPerson);
  const eventContactEmail = useEventContactEmailStore((state) => state.eventContactEmail);
  const eventContactPhone = useEventContactPhoneStore((state) => state.eventContactPhone);
  const eventTags = useEventTagsStore((state) => state.eventTags);
  const createEvent = useMutation(api.eventCreation.addEvent);
  const navigation = useNavigation();

  const submitEventForm = () => {
    if (
      !user ||
      !eventDate ||
      !eventName ||
      !eventStartTime ||
      !eventEndTime ||
      !eventContactPerson ||
      !eventContactEmail ||
      !eventContactPhone ||
      !eventTags
    )
      return;

    const formData: EventCreationFormData = {
      eventName,
      eventDate,
      eventStartTime,
      eventEndTime,
      eventContactPerson,
      eventContactEmail,
      eventTags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6'],
      eventContactPhone,
      eventSchoolName: currentUser?.schoolName!,
      createdBy: currentUser?._id!,
    };
    createEvent(formData);
    navigation.dispatch(StackActions.popToTop());
    navigation.dispatch(CommonActions.navigate('discover'));
  };

  const eventDetails = [
    { icon: '🎉', label: 'Event Name', value: eventName },
    { icon: '📅', label: 'Date', value: eventDate },
    { icon: '🕒', label: 'Start Time', value: eventStartTime },
    { icon: '🕔', label: 'End Time', value: eventEndTime },
    { icon: '👤', label: 'Contact Person', value: eventContactPerson },
    { icon: '📧', label: 'Email', value: eventContactEmail },
    { icon: '📱', label: 'Phone', value: eventContactPhone },
    { icon: '🏫', label: 'School', value: currentUser?.schoolName },
  ];

  return (
    <View className="flex-1 bg-background">
      <View className="px-6 pb-4 pt-4">
        <Text className="text-2xl font-bold text-foreground">Event Confirmation</Text>
        <Text className="text-sm text-muted-foreground">Review your event details</Text>
      </View>

      <View className="px-6 pb-6">
        <View className="mb-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <View className="bg-gradient-to-r from-primary to-primary/80 p-4">
            <Text className="mb-2 text-lg font-bold" numberOfLines={2}>
              {eventName || 'Event Name'}
            </Text>
            <View className="self-start rounded-full bg-background/20 px-2 py-1">
              <Text className="text-xs font-medium">
                {currentUser?.schoolName || 'School Name'}
              </Text>
            </View>
          </View>

          <View className="space-y-3 p-4">
            {eventDetails.slice(1).map((detail, index) => (
              <View key={index} className="flex-row items-center">
                <Text className="mr-3 text-base">{detail.icon}</Text>
                <View className="flex-1">
                  <Text className="mb-0.5 text-xs font-medium text-muted-foreground">
                    {detail.label}
                  </Text>
                  <Text className="text-sm text-foreground">{detail.value || 'Not provided'}</Text>
                </View>
              </View>
            ))}

            {eventTags && eventTags.length > 0 && (
              <View className="mt-3 border-t border-border pt-3">
                <Text className="mb-2 text-xs font-medium text-muted-foreground">Tags</Text>
                <View className="flex-row flex-wrap gap-1.5">
                  {eventTags.map((tag, index) => (
                    <View key={index} className="rounded-full bg-primary/10 px-2 py-1">
                      <Text className="text-xs text-primary">#{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>

        <View className="mb-6">
          {(!eventName ||
            !eventStartTime ||
            !eventEndTime ||
            !eventContactPerson ||
            !eventContactEmail) && (
            <View className="rounded-2xl border border-destructive/20 bg-destructive/10 p-4">
              <View className="mb-2 flex-row items-center">
                <Text className="mr-2 text-lg">⚠️</Text>
                <Text className="text-sm font-semibold text-destructive">Missing Information</Text>
              </View>
              <Text className="text-xs text-destructive/80">
                Please fill in all required fields before submitting your event.
              </Text>
            </View>
          )}
        </View>

        <View className="gap-2 space-y-3">
          <Button
            onPress={submitEventForm}
            className="h-14 w-full rounded-2xl bg-primary shadow-lg"
            disabled={
              !eventName ||
              !eventStartTime ||
              !eventEndTime ||
              !eventContactPerson ||
              !eventContactEmail
            }>
            <Text className="text-base font-semibold">🚀 Publish Event</Text>
          </Button>

          <Button
            variant="outline"
            className="h-12 w-full rounded-2xl border-border"
            onPress={() => navigation.goBack()}>
            <Text className="text-sm font-medium text-muted-foreground">← Go Back & Edit</Text>
          </Button>
        </View>
      </View>

      <BottomTabSpacer />
    </View>
  );
}
