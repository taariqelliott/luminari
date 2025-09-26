import BottomTabSpacer from '@/components/BottomTabSpacer';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-background">
        <View className="px-6 pb-4 pt-4">
          <Text className="mb-2 text-3xl font-bold text-foreground">Create</Text>
          <Text className="text-sm text-muted-foreground">
            What would you like to create today?
          </Text>
        </View>

        <View className="flex-1 justify-center px-6">
          <View className="gap-2 space-y-4">
            <Link href="/create/events/eventsPageOne" asChild>
              <Button className="h-24 w-full rounded-2xl bg-primary">
                <View className="items-center">
                  <Text className="mb-1 text-xl">🎉</Text>
                  <Text className="mb-1 text-base font-semibold text-primary-foreground">
                    Create Event
                  </Text>
                  <Text
                    className="text-center text-xs text-primary-foreground/80"
                    numberOfLines={1}>
                    Organize activities and meetings
                  </Text>
                </View>
              </Button>
            </Link>

            <Link href="/create/requests" asChild>
              <Button variant="outline" className="h-24 w-full rounded-2xl border-2 border-border">
                <View className="items-center">
                  <Text className="mb-1 text-xl">📝</Text>
                  <Text className="mb-1 text-base font-semibold text-foreground">Make Request</Text>
                  <Text className="text-center text-xs text-muted-foreground" numberOfLines={1}>
                    Request clubs and organizations
                  </Text>
                </View>
              </Button>
            </Link>
          </View>

          <View className="mt-6 rounded-2xl bg-muted/30 p-4">
            <View className="mb-2 flex-row items-center">
              <Text className="mr-2 text-base">💡</Text>
              <Text className="text-sm font-medium text-foreground">How it works</Text>
            </View>
            <Text className="text-xs leading-5 text-muted-foreground">
              Requests are a way to make your school aware of clubs, organizations, or activities
              you'd like to see available on campus.
            </Text>
          </View>
        </View>

        <BottomTabSpacer />
      </View>
    </SafeAreaView>
  );
}
