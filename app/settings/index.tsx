import { View } from 'react-native';
import React from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import { Text } from '@/components/ui/text';
import { SignedIn } from '@clerk/clerk-expo';
import { SignOutButton } from '@/components/SignOutButton';

export default function Settings() {
  return (
    <View className="w-full flex-1 justify-center px-6 py-8">
      {/* Header */}
      <View className="mb-6">
        <Text className="text-center text-3xl font-bold text-primary">Settings</Text>
        <Text className="mt-1 text-center text-muted-foreground">Customize your preferences</Text>
      </View>

      <View className="gap-2 space-y-4 rounded-2xl bg-card p-4 shadow-lg shadow-primary">
        <View className="flex-row items-center justify-center gap-2">
          <Text>Toggle Theme</Text>
          <ThemeToggle />
        </View>
        <SignedIn>
          <View>
            <SignOutButton />
          </View>
        </SignedIn>
      </View>
    </View>
  );
}
