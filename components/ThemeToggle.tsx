import { useColorScheme } from 'nativewind';
import { Button } from './ui/button';
import { Icon } from './ui/icon';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      onPressIn={toggleColorScheme}
      size="icon"
      variant="ghost"
      className="absolute right-2 top-[3.75rem] rounded-full web:mx-4">
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}
