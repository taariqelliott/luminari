import {
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as z from 'zod';
import { Text } from './ui/text';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Id } from '@/convex/_generated/dataModel';

interface SchoolType {
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

export default function UserOnboardingForm() {
  const onboardingSchema = z.object({
    role: z.union([z.literal('student'), z.literal('faculty'), z.literal('organization')]),
    email: z.email(),
    username: z.string().min(6).max(25),
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    schoolName: z.string(),
  });

  const [searchText, setSearchText] = useState('');
  const [filteredSchools, setFilteredSchools] = useState<SchoolType[]>([]);
  const allSchools = useQuery(api.schools.getAllSchools) || [];

  useEffect(() => {
    const filtered = allSchools.filter((school) =>
      school.schoolName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredSchools(filtered);
  }, [searchText]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <Input
          placeholder="Search for schools"
          onChangeText={setSearchText}
          className="min-w-full"
        />
        <ScrollView>
          <View className="gap-2 py-2">
            {searchText.trim() !== '' &&
              filteredSchools.map(({ _id, schoolName }) => (
                <TouchableOpacity
                  className="rounded bg-secondary-foreground p-3"
                  key={`${_id}_${schoolName}`}>
                  <Text className="text-primary-foreground" key={_id}>
                    {schoolName}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
