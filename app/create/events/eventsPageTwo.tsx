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
} from '@/stores/EventCreationForm';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { useQuery } from 'convex/react';
import { Link } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

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

  return (
    <>
      <SignedIn>
        {currentUser ? (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              className="flex-1 items-center justify-center">
              <View className="mx-auto w-full items-center px-4">
                <Card className="w-full max-w-sm shadow-md">
                  <CardHeader className="pb-2">
                    <CardDescription variant="h1" className="text-center text-lg font-semibold">
                      Event Contact Details
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="gap-5 px-4">
                    <View className="gap-4">
                      <View className="gap-2">
                        <Label htmlFor="eventContactPerson" className="text-sm">
                          Name
                        </Label>
                        <Input
                          id="eventContactPerson"
                          placeholder="e.g. Alex Johnson"
                          className="h-11 rounded-lg"
                          onChangeText={updateEventContactPerson}
                        />
                      </View>

                      <View className="gap-2">
                        <Label htmlFor="eventContactEmail" className="text-sm">
                          Email
                        </Label>
                        <Input
                          autoCapitalize="none"
                          id="eventContactEmail"
                          placeholder="e.g. alex@email.com"
                          className="h-11 rounded-lg"
                          onChangeText={updateEventContactEmail}
                        />
                      </View>

                      <View className="gap-2">
                        <Label htmlFor="eventContactPhone" className="text-sm">
                          Phone (optional)
                        </Label>
                        <Input
                          id="eventContactPhone"
                          placeholder="e.g. +1 555 123 5678"
                          className="h-11 rounded-lg"
                          onChangeText={updateEventContactPhone}
                        />
                      </View>
                    </View>
                  </CardContent>

                  <CardFooter className="flex-col items-center gap-4 py-4">
                    <Link href="/create/events/eventsCreationConfimration" asChild>
                      <Button className="h-12 w-12 rounded-full">
                        <ArrowRight
                          color={THEME.dark.cardForeground}
                          className="rounded-full"
                          size={24}
                        />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        ) : (
          <View className="flex-1 items-center justify-center">
            <Link href="/SchoolSelectionForm" asChild>
              <Button>
                <Text>Please Complete Onboarding</Text>
              </Button>
            </Link>
          </View>
        )}
      </SignedIn>

      <SignedOut>
        <View className="flex-1 items-center justify-center px-6">
          <Text className="mb-6 text-center text-base font-medium">
            Welcome! Please sign in to start creating events
          </Text>
          <Link href="/(home)" asChild>
            <Button className="rounded-xl px-6 py-3">
              <Text>Get Started</Text>
            </Button>
          </Link>
        </View>
      </SignedOut>

      <BottomTabSpacer />
    </>
  );
}
