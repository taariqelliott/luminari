import { useClerk } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { Text } from './ui/text';
import { Button } from './ui/button';
import { router } from 'expo-router';

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk();
  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to your desired page
      Linking.openURL(Linking.createURL('/'));
      router.push('/');
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <Button onPress={handleSignOut}>
      <Text>Sign Out</Text>
    </Button>
  );
};
