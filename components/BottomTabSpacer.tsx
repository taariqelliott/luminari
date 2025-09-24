import { View } from 'react-native';
import { useBottomTabBarHeight } from 'react-native-bottom-tabs';

export default function BottomTabSpacer() {
  const tabBarHeight = useBottomTabBarHeight();

  return <View style={{ height: tabBarHeight }} />;
}
