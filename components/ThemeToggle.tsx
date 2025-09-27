import { MoonStarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Button } from './ui/button';
import { Icon } from './ui/icon';
import { Text } from './ui/text';
import { useEffect } from 'react';

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  // useEffect(() => {
  //   console.log(colorScheme);
  // }, [colorScheme]);
  return (
    <Button onPressIn={toggleColorScheme} size="icon" variant="ghost" className="w-full">
      <Text>Toggle Theme</Text>
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}
