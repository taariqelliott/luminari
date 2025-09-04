import { View } from 'react-native';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';

export default function AboutEdit() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>About Edit Page</Text>
      <Button onPress={() => router.back()}>
        <Text>Back To About Index</Text>
      </Button>
    </View>
  );
}
