import BottomTabSpacer from '@/components/BottomTabSpacer';
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
import { api } from '@/convex/_generated/api';
import { useSchoolNameStore } from '@/stores/UserInformationStore';
import { useQuery } from 'convex/react';
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

export default function SchoolSelectionForm() {
  const [selectedSchool, setSelectedSchool] = useState('');
  const [schoolSearchQuery, setSchoolSearchQuery] = useState('');
  const schoolInputRef = useRef<TextInput>(null);

  const schoolsList = useQuery(api.schools.getAllSchools) || [];
  const updateSchoolName = useSchoolNameStore((state) => state.updateSchoolName);

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
                          onPress={() => {
                            handleSchoolChoice(schoolName.trim());
                            updateSchoolName(schoolName.trim());
                          }}
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
            </CardFooter>
          </Card>
        </View>
        <BottomTabSpacer />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
