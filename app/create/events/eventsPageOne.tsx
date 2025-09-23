import DatePicker from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { api } from '@/convex/_generated/api';
import { useEventDateStore } from '@/stores/EventCreationForm';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { useQuery } from 'convex/react';
import { Link } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

export default function EventsPageOne() {
  const [date, setDate] = useState(new Date());
  const updatEventDate = useEventDateStore((state) => state.updateEventDate);
  const currentUser = useQuery(api.users.currentUser);

  return (
    <>
      <SignedIn>
        {currentUser ? (
          <View className="flex-1 items-center justify-center">
            <Card className="w-full max-w-sm">
              <CardHeader className="flex-row">
                <View className="flex-1 gap-1.5">
                  <CardTitle>Create a new event</CardTitle>
                  <CardDescription>Let's start with the basics!</CardDescription>
                </View>
              </CardHeader>
              <CardContent>
                <View className="w-full gap-4">
                  <View className="gap-2">
                    <Label htmlFor="eventName">Event Name</Label>
                    <Input id="eventName" placeholder="Event name..." />
                  </View>
                  <View className="justify-center">
                    <Label className="items-start justify-start" htmlFor="eventDate">
                      Event Date
                    </Label>
                    <DatePicker />
                  </View>
                </View>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Link href="/create/events/eventsPageTwo" asChild>
                  <Button>
                    <Text>Continue</Text>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </View>
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
    </>
  );
}
