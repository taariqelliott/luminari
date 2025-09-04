import { View } from 'react-native';
import React from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import { Text } from '@/components/ui/text';

export default function Settings() {
  return (
    <View className="flex-1 items-center justify-center gap-2">
      <Text className="text-2xl font-bold text-primary">Settings</Text>
      <ThemeToggle />
    </View>
  );
}
