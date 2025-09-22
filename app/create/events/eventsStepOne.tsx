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
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

export default function EventsPageOne() {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <SignedIn>
        <View className="flex-1 items-center justify-center">
          <Card className="w-full max-w-sm">
            <CardHeader className="flex-row">
              <View className="flex-1 gap-1.5">
                <CardTitle>Create a new event</CardTitle>
                <CardDescription>Be Descriptive!</CardDescription>
              </View>
            </CardHeader>
            <CardContent>
              <ScrollView horizontal={false}>
                <View className="w-full justify-center gap-4">
                  <View className="gap-2">
                    <Label htmlFor="eventName">Event Name</Label>
                    <Input id="eventName" placeholder="Event name..." />
                  </View>
                  <View className="w-[100%] gap-2">
                    <Label htmlFor="eventDate">Event Date</Label>
                    <Button onPress={() => console.log(Math.floor(Math.random() * 902347))}>
                      <Text>Open</Text>
                    </Button>
                  </View>
                </View>
              </ScrollView>
            </CardContent>
            <CardFooter className="flex-col gap-2"></CardFooter>
          </Card>
        </View>
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
