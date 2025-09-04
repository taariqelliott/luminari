import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { View } from 'react-native';
import React from 'react';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SignInPage() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="w-full gap-2">
      <Text>Sign in with email & password</Text>
      <Input
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email..."
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <Input
        value={password}
        placeholder="Enter password..."
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button onPress={onSignInPress}>
        <Text>Continue</Text>
      </Button>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
        <Text>Don't have an account?</Text>
        <Link href="/sign-up">
          <Text className="text-primary">Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
