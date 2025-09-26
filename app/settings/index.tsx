import BottomTabSpacer from '@/components/BottomTabSpacer';
import DeleteUserButton from '@/components/DeleteUserButton';
import { SignOutButton } from '@/components/SignOutButton';
import ThemeToggle from '@/components/ThemeToggle';
import { Text } from '@/components/ui/text';
import { SignedIn } from '@clerk/clerk-expo';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-background">
        <View className="px-6 pb-6 pt-4">
          <Text className="mb-2 text-3xl font-bold text-foreground">Settings</Text>
          <Text className="text-sm text-muted-foreground">Manage your account settings</Text>
        </View>

        <View className="flex-1 px-6 py-24">
          <View className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <View className="mb-6">
              <Text className="mb-4 text-lg font-semibold text-foreground">Appearance</Text>
              <ThemeToggle />
            </View>

            <SignedIn>
              <View className="border-t border-border pt-6">
                <Text className="mb-4 text-lg font-semibold text-foreground">Account</Text>
                <View className="gap-2 space-y-3">
                  <SignOutButton />
                  <DeleteUserButton />
                </View>
              </View>
            </SignedIn>
          </View>
        </View>

        <BottomTabSpacer />
      </View>
    </SafeAreaView>
  );
}
