import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Luminari', headerShadowVisible: false }} />
      <Stack.Screen
        name="PersonalInfoForm"
        options={{ title: 'Get Started', headerShadowVisible: false }}
      />
      <Stack.Screen
        name="SchoolSelectionForm"
        options={{ title: 'Select Your School', headerShadowVisible: false }}
      />
      <Stack.Screen
        name="UserDetailConfirmation"
        options={{ title: 'Confirm Your Details', headerShadowVisible: false }}
      />
    </Stack>
  );
}
