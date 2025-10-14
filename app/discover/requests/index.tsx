import { Text } from '@/components/ui/text';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Link } from 'expo-router';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DiscoverRequestsScreen() {
  const requests = useQuery(api.requestCreation.getAllEventRequests);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-background">
        <View className="px-6 pb-2 pt-4">
          <Text className="text-3xl font-bold text-foreground">Event Requests</Text>
          <Text className="mt-2 text-sm text-muted-foreground">
            Browse requests for upcoming events
          </Text>
        </View>

        {requests?.length === 0 && (
          <View className="flex-1 items-center justify-center px-8 pb-32">
            <View className="items-center rounded-2xl border border-border bg-card p-8 shadow-sm">
              <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Text className="text-2xl">📅</Text>
              </View>
              <Text className="mb-2 text-xl font-semibold text-foreground">No Requests Yet</Text>
              <Text className="text-center text-sm leading-5 text-muted-foreground">
                Check back later for event requests in your area
              </Text>
            </View>
          </View>
        )}

        <ScrollView
          contentContainerClassName="px-4 py-2"
          showsVerticalScrollIndicator={false}
          className="flex-1">
          <View className="flex-row flex-wrap justify-between gap-y-2">
            {requests?.map((request) => (
              <View key={request._id} className="w-[48%]">
                <View className="min-h-[290px] rounded-2xl border border-border bg-card shadow-sm">
                  <Link href={`/discover/requests/${request._id}`} asChild>
                    <TouchableOpacity activeOpacity={0.8} className="flex-1">
                      <View className="p-4 pb-0">
                        <Text className="mb-2 text-lg font-bold leading-tight" numberOfLines={2}>
                          {request.eventRequestName}
                        </Text>
                        <View className="rounded-full py-1">
                          <Text className="text-xs font-medium">
                            {request.eventRequestSchoolName}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-1 p-4">
                        <View className="mb-4">
                          <Text className="mb-1 text-sm font-semibold text-foreground">
                            {request.eventRequestCreatedBy}
                          </Text>
                          <Text className="text-xs text-muted-foreground">
                            {request.eventRequestContactEmail}
                          </Text>
                        </View>

                        <View>
                          <View className="flex-row items-center">
                            <View className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                            <Text className="mr-2 text-xs text-muted-foreground">Status:</Text>
                            <Text
                              className="flex-1 text-xs font-medium text-foreground"
                              numberOfLines={1}>
                              {request.eventRequestStatus}
                            </Text>
                          </View>
                          <View className="flex-row items-center">
                            <View className="mr-2 h-2 w-2 rounded-full bg-blue-500" />
                            <Text className="mr-2 text-xs text-muted-foreground">School ID:</Text>
                            <Text
                              className="flex-1 text-xs font-medium text-foreground"
                              numberOfLines={1}>
                              {request.eventRequestDescription}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Link>

                  <View className="px-4 pb-4">
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      className={`w-full rounded-md ${
                        request.eventRequestTags.length > 0 && 'bg-primary/10'
                      } px-2 py-1`}
                      contentContainerClassName="flex-row gap-x-2">
                      {request.eventRequestTags.map((tag) => (
                        <Text className="text-xs font-medium text-primary" key={tag}>
                          #{tag}
                        </Text>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
