import { View } from 'react-native';
import AuthenticatedView from '@/components/AuthenticatedView';
import UnauthenticatedView from '@/components/UnauthenticatedView';
import { useUsernameStore } from '@/stores/stores';
import SignIn from './SignIn';

export default function HomeScreen() {
  const username = useUsernameStore((user) => user.username);

  return (
    <View className="flex-1 items-center justify-center">
      {username ? <AuthenticatedView /> : <SignIn />}
      {/* {username ? <AuthenticatedView /> : <UnauthenticatedView username={username} />} */}
    </View>
  );
}
