import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/clerk-expo';
import { useQuery } from 'convex/react';
import { Link } from 'expo-router';
import { View, ScrollView } from 'react-native';

export default function ProfileScreen() {
  const { user } = useUser();
  const currentUser = useQuery(api.users.currentUser);

  const formatKey = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/Id$/, 'ID');
  };

  const formatValue = (value: any) => {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    if (value === null || value === undefined) {
      return 'Not set';
    }
    return value.toString();
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
          <Text className="text-lg text-muted-foreground">
            Welcome{' '}
            <Text className="font-semibold text-primary">
              {currentUser?.firstName ||
                user?.emailAddresses[0].emailAddress?.split('@')[0] ||
                'Guest'}
            </Text>
            !
          </Text>
        </CardHeader>

        {currentUser && (
          <CardContent className="space-y-4">
            <View className="gap-2 space-y-3">
              {Object.entries(currentUser as object)
                .filter(([key]) => !key.startsWith('_') && key !== 'clerkId')
                .map(([key, value]) => (
                  <View key={key} className="flex-row items-center justify-between">
                    <Text className="flex-1 text-sm font-medium text-muted-foreground">{key}:</Text>
                    <View className="flex-shrink">
                      <Badge>
                        <Text className="text-xs">{value?.toString() || 'Not set'}</Text>
                      </Badge>
                    </View>
                  </View>
                ))}
            </View>

            {!currentUser && (
              <View className="items-center py-8">
                <Text className="text-center text-muted-foreground">Loading your profile...</Text>
              </View>
            )}
          </CardContent>
        )}

        <CardFooter>
          <Link href="/profile/edit" asChild className="w-full">
            <Button className="w-full">
              <Text>Edit Profile</Text>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </View>
  );
}
