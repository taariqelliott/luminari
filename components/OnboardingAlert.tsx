import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { router } from 'expo-router';
import { ArrowBigRight } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

export function OnboardingAlert() {
  const { colorScheme } = useColorScheme();

  const handleOnboardingPress = () => {
    router.push('/(home)/onboardingForm');
  };

  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Complete Your Setup</AlertDialogTitle>
          <AlertDialogDescription>
            Let's finish setting up your profile to get the most out of Luminari.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Text>Later</Text>
          </AlertDialogCancel>
          <AlertDialogAction onPress={handleOnboardingPress}>
            <ArrowBigRight
              color={
                colorScheme === 'dark'
                  ? THEME.dark.primaryForeground
                  : THEME.light.primaryForeground
              }
            />
            <Text>Complete Onboarding</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
