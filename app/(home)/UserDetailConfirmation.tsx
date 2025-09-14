import { View } from 'react-native';
import React from 'react';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { router } from 'expo-router';

export default function UserDetailConfirmation() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-bold">User Detail Confirmation</Text>
      <View className="flex-row items-center justify-center gap-4">
        <Button
          className="w-36"
          onPress={() => {
            router.back();
          }}>
          <Text>Back</Text>
        </Button>
        <Button className="w-36">
          <Text>Confirm</Text>
        </Button>
      </View>
    </View>
  );
}
