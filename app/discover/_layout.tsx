import { Stack } from 'expo-router';

export default function DiscoverLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Discover', headerShadowVisible: false }} />
      <Stack.Screen name="edit" options={{ title: 'Edit', headerShadowVisible: false }} />
      <Stack.Screen name="[id]" options={{ title: '', headerShadowVisible: false }} />
    </Stack>
  );
}
