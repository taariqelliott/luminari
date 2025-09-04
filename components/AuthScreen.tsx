import { Text } from './ui/text';
import { useCallback } from 'react';
import { View } from 'react-native';
import { Button } from './ui/button';
import { useSSO } from '@clerk/clerk-expo';
import SignInPage from '@/app/(auth)/sign-in';
import * as AuthSession from 'expo-auth-session';

export default function AuthScreen() {
  const { startSSOFlow: startGoogle } = useSSO();

  const { startSSOFlow: startGithub } = useSSO();

  const handleSSO = useCallback(async (provider: 'google' | 'github') => {
    try {
      const { createdSessionId, setActive } = await (provider === 'google'
        ? startGoogle({
            strategy: 'oauth_google',
            redirectUrl: AuthSession.makeRedirectUri({ scheme: 'umoja' }),
          })
        : startGithub({
            strategy: 'oauth_github',
            redirectUrl: AuthSession.makeRedirectUri({ scheme: 'umoja' }),
          }));

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <View className="w-full max-w-sm items-center">
      <Text className="mb-6 text-2xl font-bold">Sign in to continue</Text>

      <Button variant="secondary" onPress={() => handleSSO('google')} className="mb-3 w-full">
        <Text className="text-center font-medium">Continue with Google</Text>
      </Button>

      <Button variant="default" onPress={() => handleSSO('github')} className="mb-3 w-full">
        <Text className="text-center font-medium">Continue with GitHub</Text>
      </Button>

      <SignInPage />
    </View>
  );
}
