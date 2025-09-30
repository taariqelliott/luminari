import BottomTabSpacer from '@/components/BottomTabSpacer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import {
  useEventRequestContactEmailStore,
  useEventRequestDescriptionStore,
  useEventRequestNameStore,
  useEventRequestTagsStore,
} from '@/stores/EventRequestForm';
import { CommonActions, StackActions, useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from 'convex/react';
import { View } from 'react-native';
import z from 'zod';

export const eventRequestCreationSchema = z.object({
  eventRequestName: z.string(),
  eventRequestCreatedById: z.custom<Id<'users'>>(),
  eventRequestCreatedBy: z.string(),
  eventRequestDescription: z.string(),
  eventRequestSchoolId: z.optional(z.custom<Id<'schools'>>()),
  eventRequestSchoolName: z.string(),
  eventRequestOrganizationId: z.optional(z.custom<Id<'organizations'>>()),
  eventRequestTags: z.array(z.string()),
  eventRequestContactEmail: z.string(),
  eventRequestLikeCount: z.optional(z.number()),
  likedByUsers: z.optional(z.array(z.custom<Id<'users'>>())),
  eventRequestMessages: z.optional(
    z.array(
      z.object({
        authorId: z.custom<Id<'users'>>(),
        message: z.string(),
        timestamp: z.string(),
      })
    )
  ),
  eventRequestStatus: z.optional(z.string()),
});

export type EventRequestCreationFormData = z.infer<typeof eventRequestCreationSchema>;

export default function EventRequestConfirmation() {
  const currentUser = useQuery(api.users.currentUser);
  const navigation = useNavigation();
  const createEventRequest = useMutation(api.requestCreation.addEventRequest);

  const eventRequestName = useEventRequestNameStore((s) => s.eventRequestName);
  const eventRequestCreatedBy = currentUser?.username;
  const eventRequestSchoolName = currentUser?.schoolName;
  const eventRequestTags = useEventRequestTagsStore((s) => s.eventRequestTags);
  const eventRequestDescription = useEventRequestDescriptionStore((s) => s.eventRequestDescription);
  const eventRequestContactEmail = useEventRequestContactEmailStore(
    (s) => s.eventRequestContactEmail
  );

  const submitRequest = () => {
    if (
      !eventRequestName ||
      !eventRequestCreatedBy ||
      !eventRequestSchoolName ||
      !eventRequestDescription ||
      !eventRequestContactEmail ||
      !currentUser
    )
      return;

    const formData: EventRequestCreationFormData = {
      eventRequestName,
      eventRequestCreatedById: currentUser._id,
      eventRequestCreatedBy,
      eventRequestDescription,
      eventRequestSchoolName,
      eventRequestTags,
      eventRequestContactEmail,
      eventRequestStatus: 'pending',
    };

    createEventRequest(formData);
    navigation.dispatch(StackActions.popToTop());
    navigation.dispatch(CommonActions.navigate('discover'));
  };

  const requestDetails = [
    { icon: '📌', label: 'Request Name', value: eventRequestName },
    { icon: '📝', label: 'Description', value: eventRequestDescription },
    { icon: '🏫', label: 'School', value: eventRequestSchoolName },
    { icon: '👤', label: 'Created By', value: eventRequestCreatedBy },
    { icon: '📧', label: 'Contact Email', value: eventRequestContactEmail },
    { icon: '📊', label: 'Status', value: 'pending' },
  ];

  return (
    <View className="flex-1 bg-background">
      <View className="px-6 pb-4 pt-4">
        <Text className="text-2xl font-bold text-foreground">Request Confirmation</Text>
        <Text className="text-sm text-muted-foreground">Review your request details</Text>
      </View>

      <View className="px-6 pb-6">
        <View className="mb-6 rounded-2xl border border-border bg-card shadow">
          <View className="bg-gradient-to-r from-primary to-primary/80 p-4">
            <Text className="mb-2 text-lg font-bold" numberOfLines={2}>
              {eventRequestName || 'Request Name'}
            </Text>
            <View className="self-start rounded-full bg-background/20 px-2 py-1">
              <Badge>
                <Text className="text-xs font-medium">
                  {eventRequestSchoolName || 'School Name'}
                </Text>
              </Badge>
            </View>
          </View>

          <View className="space-y-3 p-4">
            {requestDetails.map((detail, index) => (
              <View key={index} className="flex-row items-center">
                <Text className="mr-3 text-base">{detail.icon}</Text>
                <View className="flex-1">
                  <Text className="mb-0.5 text-xs font-medium text-muted-foreground">
                    {detail.label}
                  </Text>
                  <Text className="text-sm text-foreground">{detail.value || 'N/A'}</Text>
                </View>
              </View>
            ))}

            {eventRequestTags && eventRequestTags.length > 0 && (
              <View className="mt-3 border-t border-border pt-3">
                <Text className="mb-2 text-xs font-medium text-muted-foreground">Tags</Text>
                <View className="flex-row flex-wrap gap-1.5">
                  {eventRequestTags.map((tag, index) => (
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
          {(!eventRequestName ||
            !eventRequestCreatedBy ||
            !eventRequestDescription ||
            !eventRequestContactEmail) && (
            <View className="rounded-2xl border border-destructive/20 bg-destructive/10 p-4">
              <View className="mb-2 flex-row items-center">
                <Text className="mr-2 text-lg">⚠️</Text>
                <Text className="text-sm font-semibold text-destructive">Missing Information</Text>
              </View>
              <Text className="text-xs text-destructive/80">
                Please fill in all required fields before submitting your request.
              </Text>
            </View>
          )}
        </View>

        <View className="gap-2 space-y-3">
          <Button
            onPress={submitRequest}
            className="h-14 w-full rounded-2xl bg-primary shadow-lg"
            disabled={
              !eventRequestName ||
              !eventRequestCreatedBy ||
              !eventRequestDescription ||
              !eventRequestContactEmail
            }>
            <Text className="text-base font-semibold">🚀 Publish Request</Text>
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
