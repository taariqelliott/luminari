import { Stack } from 'expo-router';

export default function DiscoverLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: '', headerShadowVisible: false, headerShown: false }}
      />
      <Stack.Screen name="[eventId]" options={{ title: '', headerShadowVisible: false }} />
      <Stack.Screen name="requests" options={{ title: 'Requests', headerShadowVisible: false,headerShown:false }} />
    </Stack>
  );
}
