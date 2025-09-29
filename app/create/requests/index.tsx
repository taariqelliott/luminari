import BottomTabSpacer from '@/components/BottomTabSpacer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import {
  useEventRequestContactEmailStore,
  useEventRequestDescriptionStore,
  useEventRequestNameStore,
  useEventRequestTagsStore,
} from '@/stores/EventRequestForm';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function Index() {
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

  return (
    <>
      <SignedIn>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 items-center justify-center">
            <View className="w-full max-w-sm">
              <Card className="rounded-2xl shadow-md">
                <CardHeader>
                  <CardDescription variant="h1">Let&apos;s create a request!</CardDescription>
                </CardHeader>

                <ScrollView className="max-h-[80vh]">
                  <CardContent className="gap-4">
                    <View className="gap-1">
                      <Label htmlFor="eventRequestName">Request Name</Label>
                      <Input
                        id="eventRequestName"
                        placeholder="e.g. Summer Festival 2025"
                        value={eventRequestName}
                        onChangeText={updateEventRequestName}
                      />
                    </View>

                    <View className="gap-1">
                      <Label htmlFor="eventRequestDescription">Description</Label>
                      <Input
                        id="eventRequestDescription"
                        placeholder="Briefly describe the event"
                        value={eventRequestDescription}
                        onChangeText={updateEventRequestDescription}
                      />
                    </View>

                    <View className="gap-1">
                      <Label htmlFor="eventRequestTags">Tags (comma separated)</Label>
                      <Input
                        autoCapitalize="none"
                        id="eventRequestTags"
                        placeholder="music, food, community"
                        value={eventRequestTags.join(', ')}
                        onChangeText={(txt) =>
                          updateEventRequestTags(txt.split(',').map((t) => t.trim()))
                        }
                      />
                    </View>

                    <View className="gap-1">
                      <Label htmlFor="eventRequestContactEmail">Contact Email</Label>
                      <Input
                        id="eventRequestContactEmail"
                        placeholder="you@example.com"
                        value={eventRequestContactEmail}
                        onChangeText={updateEventRequestContactEmail}
                        keyboardType="email-address"
                      />
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
                </ScrollView>
              </Card>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
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
