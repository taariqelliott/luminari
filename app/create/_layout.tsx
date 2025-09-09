import { Stack } from 'expo-router';

export default function CreateLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Create', headerShadowVisible: false }} />
      <Stack.Screen name="edit" options={{ title: 'Edit', headerShadowVisible: false }} />
    </Stack>
  );
}
