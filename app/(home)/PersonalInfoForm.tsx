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
import { useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

const USER_ROLES = [
  { label: 'Student', value: 'student' },
  { label: 'Faculty', value: 'faculty' },
  { label: 'Organization', value: 'organization' },
] as const;

export default function PersonalInfoForm() {
  const { user } = useUser();
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState<'student' | 'faculty' | 'organization'>('student');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="w-full flex-1 items-center justify-center">
        <Text className="my-4 text-center font-bold">Tell us about yourself</Text>
        <Card className="w-full max-w-sm">
          <CardHeader className="flex-row">
            <View className="flex-1 gap-1.5">
              <CardTitle>Get Started</CardTitle>
              <CardDescription>Enter your basic information to continue</CardDescription>
            </View>
          </CardHeader>
          <CardContent>
            <View className="w-full justify-center gap-4">
              <View className="gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  placeholder="Choose your username"
                  value={username}
                  onChangeText={setUsername}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </View>
              <View className="gap-2">
                <Label htmlFor="firstname">First name</Label>
                <Input
                  placeholder="What's your first name?"
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </View>
              <View className="gap-2">
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  placeholder="What's your last name?"
                  value={lastName}
                  onChangeText={setLastName}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </View>
              <View className="gap-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="What's your role?" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectGroup>
                      <SelectLabel>Select Role</SelectLabel>
                      {USER_ROLES.map(({ label, value }) => (
                        <SelectItem
                          label={label}
                          key={value}
                          value={value}
                          onPress={() => setUserRole(value)}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
      </View>
    </TouchableWithoutFeedback>
  );
}
