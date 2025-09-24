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
} from '@/stores/EventCreationForm';
import { useUser } from '@clerk/clerk-expo';
import { useMutation, useQuery } from 'convex/react';
import { router } from 'expo-router';
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

  const eventName = useEventNameStore((state) => state.eventName);
  const eventStartTime = useEventStartTimeStore((state) => state.eventStartTime);
  const eventEndTime = useEventEndTimeStore((state) => state.eventEndTime);
  const eventContactPerson = useEventContactPersonStore((state) => state.eventContactPerson);
  const eventContactEmail = useEventContactEmailStore((state) => state.eventContactEmail);
  const eventContactPhone = useEventContactPhoneStore((state) => state.eventContactPhone);
  const eventDate = useEventDateStore((state) => state.eventDate);
  const createEvent = useMutation(api.eventCreation.addEvent);
  const schoolEventTags = ['tag1', 'tag2', 'tag3'];

  const handleFormSubmit = () => {
    if (!user) return;
    const formData: EventCreationFormData = {
      eventName,
      eventDate,
      eventStartTime,
      eventEndTime,
      eventContactPerson,
      eventContactEmail,
      eventContactPhone,
      eventSchoolName: currentUser?.schoolName!,
      createdBy: currentUser?._id!,
      eventTags: schoolEventTags,
    };
    createEvent(formData);
    router.dismissAll();
    router.replace('/');
  };

  return (
    <View className="flex-1 items-center justify-center gap-2 px-6">
      <Text className="mb-4 text-lg font-bold">Event Confirmation</Text>
      <View>
        <Text>📛 Event Name: {eventName || 'Not provided'}</Text>
        <Text>🕒 Start Time: {eventStartTime || 'Not set'}</Text>
        <Text>🕔 End Time: {eventEndTime || 'Not set'}</Text>
        <Text>👤 Contact Person: {eventContactPerson || 'Not provided'}</Text>
        <Text>📧 Contact Email: {eventContactEmail || 'Not provided'}</Text>
        <Text>📱 Contact Phone: {eventContactPhone || 'Not provided'}</Text>
      </View>
      <Button onPress={handleFormSubmit}>
        <Text>Submit</Text>
      </Button>
    </View>
  );
}
