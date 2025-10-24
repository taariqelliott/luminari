import { Text } from '@/components/ui/text';
import { api } from '@/convex/_generated/api';
import { THEME } from '@/lib/theme';
import { useMutation, useQuery } from 'convex/react';
import { Href, Link } from 'expo-router';
import { ThumbsUp } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { ScrollView, TouchableOpacity, View } from 'react-native';

export default function EventsScreen() {
  const events = useQuery(api.eventCreation.getAllEvents);
  const { colorScheme } = useColorScheme();
  const currentUser = useQuery(api.users.currentUser);
  const addAttendeeToEvent = useMutation(api.eventCreation.addUserToEventAttendees);
  const deleteAttendeeFromEvent = useMutation(api.eventCreation.deleteUserFromEventAttendees);

  return (
    <View className="mx-auto w-full flex-1">
      <View className="flex-1 bg-background">
        <View className="px-6 pb-2 pt-4">
          <Text className="text-3xl font-bold text-foreground">Events</Text>
          <Text className="mt-2 text-sm text-muted-foreground">
            Find exciting events happening around you
          </Text>
        </View>

        {events?.length === 0 && (
          <View className="flex-1 items-center justify-center px-8 pb-32">
            <View className="items-center rounded-2xl border border-border bg-card p-8 shadow-sm">
              <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Text className="text-2xl">📅</Text>
              </View>
              <Text className="mb-2 text-xl font-semibold text-foreground">No Events Yet</Text>
              <Text className="text-center text-sm leading-5 text-muted-foreground">
                Check back later for exciting events in your area
              </Text>
            </View>
          </View>
        )}

        <ScrollView
          contentContainerClassName="px-4 py-2"
          showsVerticalScrollIndicator={false}
          className="flex-1">
          <View className="flex-row flex-wrap justify-between gap-y-2">
            {events?.map((event) => (
              <View key={event._id} className="w-[48%]">
                <View className="min-h-[290px] rounded-2xl border border-border bg-card shadow-sm">
                  <Link href={`/discover/events/${event._id}` as Href} asChild>
                    <TouchableOpacity activeOpacity={0.8} className="flex-1">
                      <View className="p-4 pb-0">
                        <Text className="mb-2 text-lg font-bold leading-tight" numberOfLines={2}>
                          {event.eventName}
                        </Text>
                        <View className="rounded-full py-1">
                          <Text className="text-xs font-medium">{event.eventSchoolName}</Text>
                        </View>
                      </View>

                      <View className="flex-1 p-4">
                        <View className="mb-4">
                          <Text className="mb-1 text-sm font-semibold text-foreground">
                            {event.eventContactPerson}
                          </Text>
                          <Text className="text-xs text-muted-foreground">
                            {event.eventContactEmail}
                          </Text>
                        </View>

                        <View>
                          <View className="flex-row items-center">
                            <View className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                            <Text className="mr-2 text-xs text-muted-foreground">Start:</Text>
                            <Text
                              className="flex-1 text-xs font-medium text-foreground"
                              numberOfLines={1}>
                              {event.eventStartTime}
                            </Text>
                          </View>
                          <View className="flex-row items-center">
                            <View className="mr-2 h-2 w-2 rounded-full bg-red-500" />
                            <Text className="mr-2 text-xs text-muted-foreground">End:</Text>
                            <Text
                              className="flex-1 text-xs font-medium text-foreground"
                              numberOfLines={1}>
                              {event.eventEndTime}
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
                      className={`w-full rounded-md ${event.eventTags.length > 0 && 'bg-primary/10'} px-2 py-1`}
                      contentContainerClassName="flex-row gap-x-2">
                      {event.eventTags.map((tag) => (
                        <Text className="text-xs font-medium text-primary" key={tag}>
                          #{tag}
                        </Text>
                      ))}
                    </ScrollView>
                    <View className="ml-auto mt-1 flex-row items-end gap-1">
                      <TouchableOpacity
                        onPress={() => {
                          if (event.attendingUserIds && currentUser?._id) {
                            if (!event.attendingUserIds?.includes(currentUser?._id)) {
                              addAttendeeToEvent({
                                attendingUserIds: event.attendingUserIds,
                                eventId: event._id,
                                userId: currentUser?._id,
                              });
                            } else {
                              deleteAttendeeFromEvent({
                                attendingUserIds: event.attendingUserIds,
                                eventId: event._id,
                                userId: currentUser?._id,
                              });
                            }
                          }
                        }}>
                        <ThumbsUp
                          stroke={
                            currentUser?._id && event.attendingUserIds?.includes(currentUser?._id)
                              ? THEME.dark.primary
                              : colorScheme === 'dark'
                                ? THEME.light.input
                                : THEME.dark.input
                          }
                          size={24}
                          color={colorScheme === 'dark' ? THEME.dark.primary : THEME.light.primary}
                        />
                      </TouchableOpacity>
                      <Text className="font-medium">{event.attendingUserIds?.length}</Text>
                    </View>
                  </View>
                  <View></View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
