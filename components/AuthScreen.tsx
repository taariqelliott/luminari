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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { useSignIn, useSignUp, useSSO } from '@clerk/clerk-expo';
import * as AuthSession from 'expo-auth-session';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import GithubSVG from './GitHubSVG';
import GoogleSVG from './GoogleSVG';
import { OrSeparator } from './OrSeparator';

export default function AuthScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const { startSSOFlow: startGoogle } = useSSO();
  const { startSSOFlow: startGithub } = useSSO();
  const { isLoaded: signInLoaded, signIn, setActive: setActiveSignIn } = useSignIn();
  const { isLoaded: signUpLoaded, signUp, setActive: setActiveSignUp } = useSignUp();

  const handleSSO = async (provider: 'google' | 'github') => {
    try {
      const { createdSessionId, setActive } = await (provider === 'google'
        ? startGoogle({
            strategy: 'oauth_google',
            redirectUrl: AuthSession.makeRedirectUri({ scheme: 'luminari' }),
          })
        : startGithub({
            strategy: 'oauth_github',
            redirectUrl: AuthSession.makeRedirectUri({ scheme: 'luminari' }),
          }));
      if (createdSessionId) setActive!({ session: createdSessionId });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignIn = async () => {
    if (!signInLoaded) return;
    try {
      const attempt = await signIn.create({ identifier: signInEmail, password: signInPassword });
      if (attempt.createdSessionId) {
        await setActiveSignIn({ session: attempt.createdSessionId });
        router.replace('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignUp = async () => {
    if (!signUpLoaded) return;
    try {
      await signUp.create({ emailAddress: signUpEmail, password: signUpPassword });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerify = async () => {
    if (!signUpLoaded) return;
    try {
      const attempt = await signUp.attemptEmailAddressVerification({ code: verificationCode });
      if (attempt.status === 'complete') {
        await setActiveSignUp({ session: attempt.createdSessionId });
        router.replace('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (pendingVerification) {
    return (
      <View className="flex-1 items-center justify-center gap-4 px-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Verify your email</CardTitle>
            <CardDescription>Enter the code sent to your email.</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Enter verification code"
              value={verificationCode}
              onChangeText={setVerificationCode}
            />
          </CardContent>
          <CardFooter>
            <Button onPress={handleVerify} className="w-full">
              <Text>Verify</Text>
            </Button>
          </CardFooter>
        </Card>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1 items-center justify-center px-4">
          <Text className="mb-2 text-2xl font-bold">
            {tab === 'signin' ? 'Sign In To luminari' : 'Sign Up For luminari'}
          </Text>
          <Text className="mb-6 text-muted-foreground">
            {tab === 'signin'
              ? 'Welcome back! Please sign in to continue'
              : 'Create your account to get started'}
          </Text>

          <Tabs value={tab} onValueChange={(v) => setTab(v as 'signin' | 'signup')}>
            <TabsList>
              <TabsTrigger value="signin">
                <Text>Sign In</Text>
              </TabsTrigger>
              <TabsTrigger value="signup">
                <Text>Sign Up</Text>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <Card>
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>Use a social provider or enter your credentials</CardDescription>
                </CardHeader>
                <CardContent className="gap-4">
                  <View className="flex-row justify-between gap-2">
                    <Button
                      variant="default"
                      className="flex-1"
                      onPress={() => handleSSO('google')}>
                      <GoogleSVG />
                      <Text className="ml-2">Google</Text>
                    </Button>
                    <Button
                      variant="default"
                      className="flex-1"
                      onPress={() => handleSSO('github')}>
                      <GithubSVG />
                      <Text className="ml-2">GitHub</Text>
                    </Button>
                  </View>

                  <OrSeparator />

                  <Input
                    placeholder="Email address"
                    value={signInEmail}
                    onChangeText={setSignInEmail}
                  />
                  <Input
                    placeholder="Password"
                    secureTextEntry
                    value={signInPassword}
                    onChangeText={setSignInPassword}
                  />
                </CardContent>
                <CardFooter className="w-full">
                  <Button onPress={handleSignIn} className="w-full">
                    <Text>Sign In</Text>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Sign Up</CardTitle>
                  <CardDescription>Use a social provider or create a new account</CardDescription>
                </CardHeader>
                <CardContent className="gap-4">
                  <View className="flex-row justify-between gap-2">
                    <Button
                      variant="default"
                      className="flex-1"
                      onPress={() => handleSSO('google')}>
                      <GoogleSVG />
                      <Text className="ml-2">Google</Text>
                    </Button>
                    <Button
                      variant="default"
                      className="flex-1"
                      onPress={() => handleSSO('github')}>
                      <GithubSVG />
                      <Text className="ml-2">GitHub</Text>
                    </Button>
                  </View>

                  <OrSeparator />

                  <Input
                    placeholder="Email address"
                    value={signUpEmail}
                    onChangeText={setSignUpEmail}
                  />
                  <Input
                    placeholder="Password"
                    secureTextEntry
                    value={signUpPassword}
                    onChangeText={setSignUpPassword}
                  />
                </CardContent>
                <CardFooter className="w-full">
                  <Button onPress={handleSignUp} className="w-full">
                    <Text>Sign Up</Text>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
