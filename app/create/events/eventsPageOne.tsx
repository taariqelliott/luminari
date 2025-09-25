import BottomTabSpacer from '@/components/BottomTabSpacer';
import DatePicker from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { api } from '@/convex/_generated/api';
import { THEME } from '@/lib/theme';
import { useEventNameStore } from '@/stores/EventCreationForm';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { useQuery } from 'convex/react';
import { Link } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function EventsPageOne() {
  const currentUser = useQuery(api.users.currentUser);
  const updateEventName = useEventNameStore((state) => state.updateEventName);

  return (
    <>
      <SignedIn>
        {currentUser ? (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView className="flex-1 items-center justify-center">
              <View>
                <Card className="w-full max-w-sm shadow-md">
                  <CardHeader className="flex-row">
                    <View className="flex-1 gap-1">
                      <CardDescription variant="h1">Let’s start with the basics!</CardDescription>
                    </View>
                  </CardHeader>
                  <ScrollView>
                    <CardContent>
                      <View className="w-full gap-2">
                        <View className="gap-1">
                          <Label htmlFor="eventName">Event Name</Label>
                          <Input
                            id="eventName"
                            placeholder="e.g. Summer Festival 2025"
                            onChangeText={updateEventName}
                          />
                        </View>
                        <View className="justify-center">
                          <Label className="items-start justify-start" htmlFor="eventDate">
                            Date of Event
                          </Label>
                          <DatePicker />
                        </View>
                      </View>
                    </CardContent>
                    <CardFooter className="flex-col gap-1">
                      <Link href="/create/events/eventsPageTwo" asChild>
                        <Button className="h-12 w-12 rounded-full">
                          <ArrowRight
                            color={THEME.dark.cardForeground}
                            className="rounded-full"
                            size={24}
                          />
                        </Button>
                      </Link>
                    </CardFooter>
                  </ScrollView>
                </Card>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        ) : (
          <View>
            <Link href="/SchoolSelectionForm" asChild>
              <Button>
                <Text>Please Complete Onboarding</Text>
              </Button>
            </Link>
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
