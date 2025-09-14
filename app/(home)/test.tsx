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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/clerk-expo';
import { useMutation, useQuery } from 'convex/react';
import { Link, router } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import {
  Keyboard,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as z from 'zod';

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

const ROLES = [
  { label: 'Student', value: 'student' },
  { label: 'Faculty', value: 'faculty' },
  { label: 'Organization', value: 'organization' },
] as const;

export default function OnboardingForm() {
  const { user } = useUser();
  const [username, setUsername] = useState('');
  const [email] = useState(user?.emailAddresses[0].emailAddress ?? '');
  const [role, setRole] = useState<'student' | 'faculty' | 'organization'>('student');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [schoolSearch, setSchoolSearch] = useState('');
  const schoolSearchInputRef = useRef<TextInput>(null);
  const allSchools = useQuery(api.schools.getAllSchools) || [];
  const addUser = useMutation(api.users.addUser);

  const filteredSchools = useMemo(
    () =>
      allSchools.filter((school) =>
        school.schoolName.toLowerCase().includes(schoolSearch.toLowerCase())
      ),
    [allSchools, schoolSearch]
  );

  const handleSchoolSelect = (selectedSchool: string) => {
    setSchoolName(selectedSchool);
    setSchoolSearch('');
  };

  const handleSubmit = () => {
    const formData: OnboardingFormData = {
      role,
      email,
      username,
      firstName,
      lastName,
      schoolName,
      hasCompletedOnboarding: true,
    };
    if (!user) {
      return;
    }
    addUser({ ...formData, clerkId: user.id });
    router.replace('/');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 items-center justify-center">
        <Text className="my-4 text-center font-bold">Please Enter Your Information</Text>

        <Card className="w-full max-w-sm">
          <CardHeader className="flex-row">
            <View className="flex-1 gap-1.5">
              <CardTitle>Subscribe to our newsletter</CardTitle>
              <CardDescription>Enter your details to receive updates and tips</CardDescription>
            </View>
          </CardHeader>
          <CardContent>
            <View className="w-full justify-center gap-4">
              <View className="gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </View>
              <View className="gap-2">
                <Label htmlFor="firstname">First name</Label>
                <Input
                  placeholder="First name"
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </View>
              <View className="gap-2">
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  placeholder="Last name"
                  value={lastName}
                  onChangeText={setLastName}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </View>
            </View>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Link href="/(home)/SchoolSelectionForm" className="w-full" asChild>
              <Button>
                <Text>Continue</Text>
              </Button>
            </Link>
          </CardFooter>
        </Card>
        {/* <ScrollView>
          <View className="min-w-full gap-2 px-4">
            <Input
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Input
              placeholder="First name"
              value={firstName}
              onChangeText={setFirstName}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Input
              placeholder="Last name"
              value={lastName}
              onChangeText={setLastName}
              autoCorrect={false}
              autoCapitalize="none"
            />

    
          </View>
        </ScrollView> */}
      </View>
    </TouchableWithoutFeedback>
  );
}
