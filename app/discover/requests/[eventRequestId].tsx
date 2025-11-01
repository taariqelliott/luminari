import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EventRequestDetailsPage() {
  const { eventRequestId } = useLocalSearchParams();

  const deleteEventRequestMutation = useMutation(api.requestCreation.deleteEventRequestById);
  const currentEventRequest = useQuery(api.requestCreation.getEventRequestById, {
    id: eventRequestId as Id<'eventRequests'>,
  });
  const currentUser = useQuery(api.users.currentUser);
  const navigation = useNavigation();
  const deleteEventRequest = () => {
    if (currentEventRequest) {
      deleteEventRequestMutation({ id: currentEventRequest?._id });
    }
    router.push('/discover');
  };

  useEffect(() => {
    if (currentEventRequest?.eventRequestName) {
      navigation.setOptions({ title: currentEventRequest.eventRequestName });
    }
  }, [currentEventRequest, navigation]);

  if (!currentEventRequest) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <Text className="text-muted-foreground">Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const displayFields = [
    { key: 'eventRequestName', label: 'Event Name', value: currentEventRequest.eventRequestName },
    {
      key: 'eventRequestSchoolName',
      label: 'School',
      value: currentEventRequest.eventRequestSchoolName,
    },
    {
      key: 'eventRequestCreatedBy',
      label: 'Created By',
      value: currentEventRequest.createdBy,
    },
    {
      key: 'eventRequestContactEmail',
      label: 'Contact Email',
      value: currentEventRequest.eventRequestContactEmail,
    },
    { key: 'eventRequestStatus', label: 'Status', value: currentEventRequest.eventRequestStatus },
    {
      key: 'eventRequestDescription',
      label: 'Description',
      value: currentEventRequest.eventRequestDescription,
    },
  ];

  return (
    <View className="flex-1 px-6 py-4">
      <View className="mb-6">
        <Text className="mb-2 text-3xl font-bold text-foreground">
          {currentEventRequest.eventRequestName}
        </Text>
        <View className="mt-2 self-start rounded-full bg-primary/10 px-3 py-1">
          <Text className="text-sm font-medium text-primary">
            {currentEventRequest.eventRequestStatus}
          </Text>
        </View>
      </View>

      <View className="mb-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <Text className="mb-4 text-xl font-semibold text-foreground">Event Request Details</Text>
        {displayFields.slice(1).map((field) => (
          <View key={field.key} className="mb-2">
            <Text className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {field.label}
            </Text>
            <Text className="text-base leading-5 text-foreground">
              {field.value || 'Not specified'}
            </Text>
          </View>
        ))}
      </View>

      {currentUser?._id === currentEventRequest.createdBy && (
        <View>
          <Button onPress={deleteEventRequest}>
            <Text>Delete</Text>
          </Button>
        </View>
      )}

      {currentEventRequest.eventRequestTags && currentEventRequest.eventRequestTags.length > 0 && (
        <View className="mb-6">
          <Text className="mb-3 text-lg font-semibold text-foreground">Tags</Text>
          <View className="flex-row flex-wrap gap-2">
            {currentEventRequest.eventRequestTags.map((tag) => (
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
