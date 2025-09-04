import { Stack } from 'expo-router';

export default function AboutLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'About' }} />
      <Stack.Screen name="edit" options={{ title: 'Edit' }} />
    </Stack>
  );
}
