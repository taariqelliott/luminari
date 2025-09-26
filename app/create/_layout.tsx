import { Stack } from 'expo-router';

export default function CreateLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, headerShadowVisible: false, title: 'Create' }}
      />
      <Stack.Screen
        name="events/eventsPageOne"
        options={{
          title: 'Event & Schedule',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="events/eventsPageTwo"
        options={{
          title: 'Contact Information',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="events/eventsCreationConfimration"
        options={{
          title: 'Review & Publish',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="requests/index"
        options={{
          title: 'Requests',
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
    </Stack>
  );
}
