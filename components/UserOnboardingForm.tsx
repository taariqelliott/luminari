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
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useUser } from '@clerk/clerk-expo';
import { Text } from './ui/text';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';

interface School {
  _id: Id<'schools'>;
  _creationTime: number;
  county?: string;
  schoolType?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  schoolName: string;
}

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
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
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
      hasCompletedOnboarding: isOnboardingComplete,
    };
    if (!user) {
      return;
    }
    addUser({ ...formData, clerkId: user.id });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <Text>Complete Onboarding</Text>
        <ScrollView>
          <View className="min-w-full gap-2 px-4">
            <Input
              placeholder="Search for schools"
              value={schoolSearch !== '' ? schoolSearch : schoolName}
              onChangeText={(text) => {
                setSchoolSearch(text);
                setSchoolName('');
              }}
              ref={schoolSearchInputRef}
            />

            {schoolSearch.trim() !== '' &&
              filteredSchools.map(({ _id, schoolName }) => (
                <TouchableOpacity
                  key={_id}
                  onPress={() => handleSchoolSelect(schoolName.trim())}
                  className="rounded bg-secondary-foreground p-3">
                  <Text className="text-primary-foreground">{schoolName.trim()}</Text>
                </TouchableOpacity>
              ))}

            <Input placeholder="Username" value={username} onChangeText={setUsername} />
            <Input placeholder="First name" value={firstName} onChangeText={setFirstName} />
            <Input placeholder="Last name" value={lastName} onChangeText={setLastName} />

            <TouchableOpacity onPress={() => setIsOnboardingComplete((prev) => !prev)}>
              <Text>{isOnboardingComplete ? 'Completed' : 'Not Completed'}</Text>
            </TouchableOpacity>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent className="w-[180px]">
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  {ROLES.map(({ label, value }) => (
                    <SelectItem
                      label={label}
                      key={value}
                      value={value}
                      onPress={() => setRole(value)}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button onPress={handleSubmit}>
              <Text>Add User</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
