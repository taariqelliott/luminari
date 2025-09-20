import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { api } from '@/convex/_generated/api';
import {
  useFirstNameStore,
  useLastNameStore,
  useRoleStore,
  useSchoolNameStore,
  useUsernameStore,
} from '@/stores/UserInformationStore';
import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { router } from 'expo-router';
import { View } from 'react-native';
import z from 'zod';

export const onboardingSchema = z.object({
  role: z.enum(['student', 'faculty', 'organization']),
  email: z.email(),
  username: z.string().min(6).max(30),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  schoolName: z.string(),
  hasCompletedOnboarding: z.boolean(),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;

export default function UserDetailConfirmation() {
  const { user } = useUser();

  const username = useUsernameStore((state) => state.username) || 'Username';
  const firstName = useFirstNameStore((state) => state.firstName) || 'First Name';
  const lastName = useLastNameStore((state) => state.lastName) || 'Last Name';
  const role = useRoleStore((state) => state.role) || 'Role';
  const email = user?.emailAddresses[0].emailAddress ?? 'Email';
  const schoolName = useSchoolNameStore((state) => state.schoolName);

  const createUser = useMutation(api.users.addUser);

  const handleFormSubmit = () => {
    if (!user) return;

    const formData: OnboardingFormData = {
      role,
      email,
      username,
      firstName,
      lastName,
      schoolName,
      hasCompletedOnboarding: true,
    };

    createUser({ ...formData, clerkId: user.id });

    router.dismissAll();
    router.replace('/');
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">Confirm Your Details</CardTitle>
          <Text className="text-center text-muted-foreground">
            Please review your information before completing setup
          </Text>
        </CardHeader>

        <CardContent className="space-y-4">
          <View className="space-y-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-medium text-muted-foreground">Username:</Text>
              <Text className="text-sm font-semibold">{username}</Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-medium text-muted-foreground">First Name:</Text>
              <Text className="text-sm font-semibold">{firstName}</Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-medium text-muted-foreground">Last Name:</Text>
              <Text className="text-sm font-semibold">{lastName}</Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-medium text-muted-foreground">Role:</Text>
              <Text className="text-sm font-semibold capitalize">{role}</Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-medium text-muted-foreground">Email:</Text>
              <Text className="text-sm font-semibold">{email}</Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-medium text-muted-foreground">School:</Text>
              <Text className="text-sm font-semibold">{schoolName}</Text>
            </View>
          </View>
        </CardContent>

        <CardFooter>
          <View className="w-full flex-row items-center justify-center gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onPress={() => {
                router.back();
              }}>
              <Text>Back</Text>
            </Button>
            <Button onPress={handleFormSubmit} className="flex-1">
              <Text>Confirm & Continue</Text>
            </Button>
          </View>
        </CardFooter>
      </Card>
    </View>
  );
}
