import { useUser } from '@clerk/clerk-expo';
import { useMutation, useQuery } from 'convex/react';
import { Link, router } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as z from 'zod';
import { api } from '@/convex/_generated/api';
import {
  useFirstNameStore,
  useLastNameStore,
  useRoleStore,
  useUsernameStore,
} from '@/stores/stores';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';

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

export default function SchoolSelectionForm() {
  const { user } = useUser();

  const [email] = useState(user?.emailAddresses[0].emailAddress ?? '');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [schoolSearchQuery, setSchoolSearchQuery] = useState('');
  const schoolInputRef = useRef<TextInput>(null);

  const schoolsList = useQuery(api.schools.getAllSchools) || [];
  const createUser = useMutation(api.users.addUser);

  const role = useRoleStore((state) => state.role);
  const username = useUsernameStore((state) => state.username);
  const firstName = useFirstNameStore((state) => state.firstName);
  const lastName = useLastNameStore((state) => state.lastName);

  const matchingSchools = useMemo(
    () =>
      schoolsList.filter((school) =>
        school.schoolName.toLowerCase().includes(schoolSearchQuery.toLowerCase())
      ),
    [schoolsList, schoolSearchQuery]
  );

  const handleSchoolChoice = (chosenSchool: string) => {
    setSelectedSchool(chosenSchool);
    setSchoolSearchQuery('');
  };

  const handleFormSubmit = () => {
    if (!user) return;

    const formData: OnboardingFormData = {
      role,
      email,
      username,
      firstName,
      lastName,
      schoolName: selectedSchool,
      hasCompletedOnboarding: true,
    };

    createUser({ ...formData, clerkId: user.id });
    router.replace('/');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <View className="w-full flex-1 items-center justify-center">
          <Text className="my-4 text-center font-bold">Select your school</Text>

          <Card className="w-full max-w-sm">
            <CardHeader className="flex-row">
              <View className="flex-1 gap-1.5">
                <CardTitle>Find Your School</CardTitle>
                <CardDescription>Search and select your educational institution</CardDescription>
              </View>
            </CardHeader>

            <CardContent>
              <View className="w-full justify-center gap-4">
                <Input
                  placeholder="Search for schools"
                  className="w-full"
                  autoCorrect={false}
                  value={schoolSearchQuery !== '' ? schoolSearchQuery : selectedSchool}
                  onChangeText={(text) => {
                    setSchoolSearchQuery(text);
                    setSelectedSchool('');
                  }}
                  ref={schoolInputRef}
                />
                <ScrollView className="flex h-[265px] w-full gap-3">
                  {schoolSearchQuery.trim() !== '' &&
                    matchingSchools.map(({ _id, schoolName }) => (
                      <View key={_id} className="my-1">
                        <TouchableOpacity
                          onPress={() => handleSchoolChoice(schoolName.trim())}
                          className="rounded bg-secondary-foreground p-3">
                          <Text className="text-secondary">{schoolName.trim()}</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                </ScrollView>
              </View>
            </CardContent>

            <CardFooter className="mx-auto flex-row items-center justify-center gap-2">
              <Button
                className="w-36"
                onPress={() => {
                  router.back();
                }}>
                <Text>Back</Text>
              </Button>
              <Link href="/(home)/UserDetailConfirmation" asChild>
                <Button className="w-36">
                  <Text>Continue</Text>
                </Button>
              </Link>

              {/* <Button onPress={handleFormSubmit} className="w-full">
                <Text>Complete Onboarding</Text>
              </Button> */}
            </CardFooter>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
