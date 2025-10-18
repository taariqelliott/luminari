import { Stack } from 'expo-router';

export default function DiscoverLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: '', headerShadowVisible: false, headerShown: false }}
      />
    </Stack>
  );
}
