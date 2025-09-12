import React from 'react';
import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'luminari', headerShadowVisible: false }} />
      <Stack.Screen
        name="onboardingForm"
        options={{ title: 'Onboarding', headerShadowVisible: false }}
      />
    </Stack>
  );
}
