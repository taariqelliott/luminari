import BottomTabSpacer from '@/components/BottomTabSpacer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { api } from '@/convex/_generated/api';
import { THEME } from '@/lib/theme';
import {
  useEventContactEmailStore,
  useEventContactPersonStore,
  useEventContactPhoneStore,
  useEventTagsStore,
} from '@/stores/EventCreationForm';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { useQuery } from 'convex/react';
import { Link } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useState } from 'react';

export default function EventsPageTwo() {
  const currentUser = useQuery(api.users.currentUser);

  const updateEventContactPerson = useEventContactPersonStore(
    (state) => state.updateEventContactPerson
  );
  const updateEventContactPhone = useEventContactPhoneStore(
    (state) => state.updateEventContactPhone
  );
  const updateEventContactEmail = useEventContactEmailStore(
    (state) => state.updateEventContactEmail
  );

  const eventCreationTags = useEventTagsStore((state) => state.eventTags);
  const updateEventCreationTags = useEventTagsStore((state) => state.updateEventTags);

  const [currentTag, setCurrentTag] = useState('');

  return (
    <>
      <SignedIn>
        {currentUser ? (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              className="flex-1 items-center justify-center">
              <View className="w-full max-w-sm">
                <Card className="rounded-2xl shadow-md">
                  <CardHeader>
                    <Text className="text-2xl font-bold text-foreground">Contact Information</Text>
                    <CardDescription>How can people reach you about this event?</CardDescription>
                  </CardHeader>

                  <CardContent className="gap-4">
                    <View className="gap-1">
                      <Label htmlFor="eventContactPerson">Your Name *</Label>
                      <Input
                        id="eventContactPerson"
                        placeholder="e.g. Alex Johnson"
                        onChangeText={updateEventContactPerson}
                      />
                      <Text className="text-xs text-muted-foreground">
                        This will be shown as the contact person for the event
                      </Text>
                    </View>

                    <View className="gap-1">
                      <Label htmlFor="eventContactEmail">Email Address *</Label>
                      <Input
                        autoCapitalize="none"
                        keyboardType="email-address"
                        id="eventContactEmail"
                        placeholder="e.g. alex@school.edu"
                        onChangeText={updateEventContactEmail}
                      />
                      <Text className="text-xs text-muted-foreground">
                        People can email you with questions about the event
                      </Text>
                    </View>

                    <View className="gap-1">
                      <Label htmlFor="eventContactPhone">Phone Number</Label>
                      <Input
                        keyboardType="phone-pad"
                        id="eventContactPhone"
                        placeholder="e.g. (555) 123-4567"
                        onChangeText={updateEventContactPhone}
                      />
                      <Text className="text-xs text-muted-foreground">
                        Optional – for urgent event-related contact
                      </Text>
                    </View>

                    <View className="gap-1">
                      <Label htmlFor="eventTags">Tags</Label>
                      <Input
                        autoCapitalize="none"
                        id="eventTags"
                        placeholder="Type a tag and press enter"
                        value={currentTag}
                        onChangeText={setCurrentTag}
                        onSubmitEditing={() => {
                          const newTag = currentTag.trim();
                          if (newTag && !eventCreationTags.includes(newTag)) {
                            updateEventCreationTags([...eventCreationTags, newTag]);
                          }
                          setCurrentTag('');
                        }}
                      />
                      <View className="mt-2 flex-row flex-wrap gap-1.5">
                        {eventCreationTags.map((tag, index) => (
                          <Pressable
                            key={index}
                            onPress={() => {
                              const newTags = eventCreationTags.filter((_, i) => i !== index);
                              updateEventCreationTags(newTags);
                            }}>
                            <View className="rounded-full bg-primary/10 px-2 py-1">
                              <Text className="text-xs text-primary">#{tag} ×</Text>
                            </View>
                          </Pressable>
                        ))}
                      </View>
                    </View>
                  </CardContent>

                  <CardFooter className="mt-4 flex-col">
                    <Link href="/create/events/eventsCreationConfirmation" asChild>
                      <Button className="h-14 w-full flex-row items-center justify-center rounded-xl bg-primary">
                        <Text className="mr-2 text-base font-semibold text-primary-foreground">
                          Continue to Review
                        </Text>
                        <ArrowRight color={THEME.dark.primaryForeground} size={20} />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        ) : (
          <View className="flex-1 items-center justify-center px-6">
            <Card className="rounded-2xl p-6 shadow-md">
              <CardHeader>
                <Text className="text-xl font-bold text-foreground">Setup Required</Text>
                <CardDescription>
                  Please complete your profile setup to create events.
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-4">
                <Link href="/SchoolSelectionForm" asChild>
                  <Button className="w-full">
                    <Text>Complete Setup</Text>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </View>
        )}
      </SignedIn>

      <SignedOut>
        <View className="flex-1 items-center justify-center">
          <Text>Welcome! Please sign in to start creating events</Text>
          <Link href="/(home)" asChild>
            <Button>
              <Text>Get Started</Text>
            </Button>
          </Link>
        </View>
      </SignedOut>

      <BottomTabSpacer />
    </>
  );
}
