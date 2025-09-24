import { Stack } from 'expo-router';

export default function CreateLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Create', headerShadowVisible: false }} />
      <Stack.Screen
        name="events/eventsPageOne"
        options={{
          title: 'Step 1',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="events/eventsPageTwo"
        options={{
          title: 'Step 2',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="events/eventsCreationConfimration"
        options={{
          title: 'Confirm Your Details',
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
