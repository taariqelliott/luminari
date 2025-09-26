import BottomTabSpacer from '@/components/BottomTabSpacer';
import { Button } from '@/components/ui/button';
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
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView className="flex-1">
      <SignedIn>
        {currentUser ? (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              className="flex-1 bg-background">
              <View className="px-6 pb-2 pt-4">
                <Text className="mb-1 text-2xl font-bold text-foreground">Contact Information</Text>
                <Text className="text-sm text-muted-foreground">
                  How can people reach you about this event?
                </Text>
              </View>

              <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="px-6 py-4">
                  <View className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <View className="gap-4 space-y-5">
                      <View className="gap space-y-2">
                        <Label
                          htmlFor="eventContactPerson"
                          className="text-sm font-medium text-foreground">
                          Your Name *
                        </Label>
                        <Input
                          id="eventContactPerson"
                          placeholder="e.g. Alex Johnson"
                          className="h-12 rounded-xl border-border bg-background text-foreground"
                          onChangeText={updateEventContactPerson}
                        />
                        <Text className="text-xs text-muted-foreground">
                          This will be shown as the contact person for the event
                        </Text>
                      </View>

                      <View className="space-y-2">
                        <Label
                          htmlFor="eventContactEmail"
                          className="text-sm font-medium text-foreground">
                          Email Address *
                        </Label>
                        <Input
                          autoCapitalize="none"
                          keyboardType="email-address"
                          id="eventContactEmail"
                          placeholder="e.g. alex@school.edu"
                          className="h-12 rounded-xl border-border bg-background text-foreground"
                          onChangeText={updateEventContactEmail}
                        />
                        <Text className="text-xs text-muted-foreground">
                          People can email you with questions about the event
                        </Text>
                      </View>

                      <View className="space-y-2">
                        <Label
                          htmlFor="eventContactPhone"
                          className="text-sm font-medium text-foreground">
                          Phone Number
                        </Label>
                        <Input
                          keyboardType="phone-pad"
                          id="eventContactPhone"
                          placeholder="e.g. (555) 123-4567"
                          className="h-12 rounded-xl border-border bg-background text-foreground"
                          onChangeText={updateEventContactPhone}
                        />
                        <Text className="text-xs text-muted-foreground">
                          Optional - for urgent event-related contact
                        </Text>
                      </View>
                    </View>

                    <View className="mt-8 items-center">
                      <Link href="/create/events/eventsCreationConfirmation" asChild>
                        <Button className="h-14 w-full rounded-xl bg-primary">
                          <View className="flex-row items-center">
                            <Text className="mr-2 text-base font-semibold text-primary-foreground">
                              Continue to Review
                            </Text>
                            <ArrowRight color={THEME.dark.primaryForeground} size={20} />
                          </View>
                        </Button>
                      </Link>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        ) : (
          <View className="flex-1 items-center justify-center bg-background px-6">
            <View className="items-center rounded-2xl border border-border bg-card p-6 shadow-sm">
              <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Text className="text-2xl">⚠️</Text>
              </View>
              <Text className="mb-2 text-lg font-semibold text-foreground">Setup Required</Text>
              <Text className="mb-6 text-center text-sm leading-5 text-muted-foreground">
                Please complete your profile setup to create events
              </Text>
              <Link href="/SchoolSelectionForm" asChild>
                <Button className="h-12 w-full rounded-xl bg-primary">
                  <Text className="text-base font-semibold text-primary-foreground">
                    Complete Setup
                  </Text>
                </Button>
              </Link>
            </View>
          </View>
        )}
      </SignedIn>

      <SignedOut>
        <View className="flex-1 items-center justify-center bg-background px-6">
          <View className="items-center rounded-2xl border border-border bg-card p-6 shadow-sm">
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Text className="text-2xl">👋</Text>
            </View>
            <Text className="mb-2 text-lg font-semibold text-foreground">Welcome!</Text>
            <Text className="mb-6 text-center text-sm leading-5 text-muted-foreground">
              Please sign in to start creating events
            </Text>
            <Link href="/(home)" asChild>
              <Button className="h-12 w-full rounded-xl bg-primary">
                <Text className="text-base font-semibold text-primary-foreground">Get Started</Text>
              </Button>
            </Link>
          </View>
        </View>
      </SignedOut>

      <BottomTabSpacer />
    </SafeAreaView>
  );
}
