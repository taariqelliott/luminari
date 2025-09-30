import BottomTabSpacer from '@/components/BottomTabSpacer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { api } from '@/convex/_generated/api';
import { THEME } from '@/lib/theme';
import {
  useEventRequestContactEmailStore,
  useEventRequestDescriptionStore,
  useEventRequestNameStore,
  useEventRequestTagsStore,
} from '@/stores/EventRequestForm';
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

export default function Index() {
  const currentUser = useQuery(api.users.currentUser);

  const eventRequestName = useEventRequestNameStore((s) => s.eventRequestName);
  const eventRequestDescription = useEventRequestDescriptionStore((s) => s.eventRequestDescription);
  const eventRequestTags = useEventRequestTagsStore((s) => s.eventRequestTags);
  const eventRequestContactEmail = useEventRequestContactEmailStore(
    (s) => s.eventRequestContactEmail
  );

  const updateEventRequestName = useEventRequestNameStore((s) => s.updateEventRequestName);
  const updateEventRequestDescription = useEventRequestDescriptionStore(
    (s) => s.updateEventRequestDescription
  );
  const updateEventRequestTags = useEventRequestTagsStore((s) => s.updateEventRequestTags);
  const updateEventRequestContactEmail = useEventRequestContactEmailStore(
    (s) => s.updateEventRequestContactEmail
  );

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
                    <Text className="text-2xl font-bold text-foreground">Create a Request</Text>
                    <CardDescription>
                      Share your idea so others can discover, support, or collaborate with you.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="gap-4">
                    <View className="gap-1">
                      <Label htmlFor="eventRequestName">Request Name *</Label>
                      <Input
                        id="eventRequestName"
                        placeholder="e.g. Summer Festival 2025"
                        value={eventRequestName}
                        onChangeText={updateEventRequestName}
                      />
                      <Text className="text-xs text-muted-foreground">
                        A short, clear title that describes your request
                      </Text>
                    </View>

                    <View className="gap-1">
                      <Label htmlFor="eventRequestDescription">Description *</Label>
                      <Input
                        id="eventRequestDescription"
                        placeholder="Briefly describe what this request is about"
                        value={eventRequestDescription}
                        onChangeText={updateEventRequestDescription}
                      />
                      <Text className="text-xs text-muted-foreground">
                        Provide a summary so others understand your idea
                      </Text>
                    </View>

                    <View className="gap-1">
                      <Label htmlFor="eventRequestTags">Tags</Label>
                      <Input
                        autoCapitalize="none"
                        id="eventRequestTags"
                        placeholder="Type a tag and press enter"
                        value={currentTag}
                        onChangeText={setCurrentTag}
                        onSubmitEditing={() => {
                          const newTag = currentTag.trim();
                          if (newTag && !eventRequestTags.includes(newTag)) {
                            updateEventRequestTags([...eventRequestTags, newTag]);
                          }
                          setCurrentTag('');
                        }}
                      />
                      <View className="mt-2 flex-row flex-wrap gap-1.5">
                        {eventRequestTags.map((tag, index) => (
                          <Pressable
                            key={index}
                            onPress={() => {
                              const newTags = eventRequestTags.filter((_, i) => i !== index);
                              updateEventRequestTags(newTags);
                            }}>
                            <View className="rounded-full bg-primary/10 px-2 py-1">
                              <Text className="text-xs text-primary">#{tag} ×</Text>
                            </View>
                          </Pressable>
                        ))}
                      </View>
                    </View>

                    <View className="gap-1">
                      <Label htmlFor="eventRequestContactEmail">Contact Email *</Label>
                      <Input
                        id="eventRequestContactEmail"
                        placeholder="yourname@example.com"
                        value={eventRequestContactEmail}
                        onChangeText={updateEventRequestContactEmail}
                        keyboardType="email-address"
                      />
                      <Text className="text-xs text-muted-foreground">
                        Others can contact you with questions about your request
                      </Text>
                    </View>
                  </CardContent>

                  <CardFooter className="mt-4 flex-col">
                    <Link href="/create/requests/eventRequestConfirmation" asChild>
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
          <View className="flex-1 items-center justify-center">
            <Card className="rounded-2xl p-6 shadow-md">
              <CardHeader>
                <Text className="text-xl font-bold text-foreground">Complete Profile Setup</Text>
                <CardDescription>
                  You’ll need to finish setting up your account before creating requests.
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-4">
                <Link href="/(home)" asChild>
                  <Button>
                    <Text>Go to Home</Text>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </View>
        )}
      </SignedIn>

      <SignedOut>
        <View className="flex-1 items-center justify-center">
          <Text>Welcome! Please sign in to start creating requests</Text>
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
