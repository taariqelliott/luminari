import { Stack } from 'expo-router';

export default function DiscoverLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: '', headerShadowVisible: false, headerShown: false }}
      />
      <Stack.Screen name="edit" options={{ title: 'Edit', headerShadowVisible: false }} />
      <Stack.Screen name="[id]" options={{ title: '', headerShadowVisible: false }} />
      <Stack.Screen name="all-requests/[id]" options={{ title: '', headerShadowVisible: false }} />
      <Stack.Screen
        name="all-requests/index"
        options={{ title: 'All Requests', headerShadowVisible: false }}
      />
    </Stack>
  );
}
