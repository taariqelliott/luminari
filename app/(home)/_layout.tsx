import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Luminari', headerShadowVisible: false }} />
      <Stack.Screen
        name="onboardingForm"
        options={{ title: 'Onboarding', headerShadowVisible: false }}
      />
    </Stack>
  );
}
