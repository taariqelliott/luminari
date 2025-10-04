import { Stack } from 'expo-router';

export default function RequestsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[requestId]"
        options={{ title: '', headerShadowVisible: false, headerShown: false }}
      />
      <Stack.Screen
        name="index"
        options={{ title: '', headerShadowVisible: false, headerShown: false }}
      />
    </Stack>
  );
}
