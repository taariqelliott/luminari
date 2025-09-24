// components/ScreenContainer.tsx
import React from 'react';
import { View } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function ScreenContainer({ children, style }) {
  const tabBarHeight = useBottomTabBarHeight();
  return <View style={[{ flex: 1, paddingBottom: tabBarHeight }, style]}>{children}</View>;
}
