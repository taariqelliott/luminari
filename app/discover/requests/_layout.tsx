import { Stack } from 'expo-router';


export default function RequestsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Requests' }} />
      <Stack.Screen name="[requestId]" options={{ title: '', headerShadowVisible: false }} />
    </Stack>
  );
}
