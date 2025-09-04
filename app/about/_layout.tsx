import { Stack } from 'expo-router';

export default function AboutLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'About',
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          headerTitle: 'Edit',
        }}
      />
    </Stack>
  );
}
