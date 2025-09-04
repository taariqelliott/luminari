import { Image, View } from 'react-native';
import React from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import { Text } from '@/components/ui/text';
import { SignedIn, useUser } from '@clerk/clerk-expo';
import { SignOutButton } from '@/components/SignOutButton';
import DeleteUserButton from '@/components/DeleteUserButton';

export default function Settings() {
  const { user } = useUser();

  return (
    <View className="w-full flex-1 justify-center px-6 py-8">
      <View className="mb-6">
        <Text className="text-center text-3xl font-bold text-primary">Settings</Text>
        <Text className="mt-1 text-center text-muted-foreground">Customize your preferences</Text>
      </View>

      <View className="w-full gap-2 space-y-4 rounded-2xl bg-card p-4 shadow">
        <View className="flex-row items-center justify-center gap-2">
          <Text>Toggle Theme</Text>
          <ThemeToggle />
        </View>

        <SignedIn>
          <View className="w-full items-center gap-2">
            {user?.imageUrl && (
              <Image source={{ uri: user.imageUrl }} className="h-12 w-12 rounded-full" />
            )}

            <View className="w-full gap-2">
              <SignOutButton />
              <DeleteUserButton />
            </View>
          </View>
        </SignedIn>
      </View>
    </View>
  );
}
