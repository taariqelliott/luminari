import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

export const THEME = {
  light: {
    background: 'hsl(43.8462 86.6667% 94.1176%)', // --background
    foreground: 'hsl(192.2034 80.8219% 14.3137%)', // --foreground
    card: 'hsl(45.6 42.3729% 88.4314%)', // --card
    cardForeground: 'hsl(192.2034 80.8219% 14.3137%)', // --card-foreground
    popover: 'hsl(45.6 42.3729% 88.4314%)', // --popover
    popoverForeground: 'hsl(192.2034 80.8219% 14.3137%)', // --popover-foreground
    primary: 'hsl(330.9554 64.0816% 51.9608%)', // --primary
    primaryForeground: 'hsl(0 0% 100%)', // --primary-foreground
    secondary: 'hsl(175.4622 58.6207% 39.8039%)', // --secondary
    secondaryForeground: 'hsl(0 0% 100%)', // --secondary-foreground
    muted: 'hsl(180 6.9307% 60.3922%)', // --muted
    mutedForeground: 'hsl(192.2034 80.8219% 14.3137%)', // --muted-foreground
    accent: 'hsl(17.5691 80.4444% 44.1176%)', // --accent
    accentForeground: 'hsl(0 0% 100%)', // --accent-foreground
    destructive: 'hsl(1.0405 71.1934% 52.3529%)', // --destructive
    destructiveForeground: 'hsl(0 0% 100%)', // --destructive-foreground
    border: 'hsl(186.3158 8.2969% 55.098%)', // --border
    input: 'hsl(186.3158 8.2969% 55.098%)', // --input
    ring: 'hsl(330.9554 64.0816% 51.9608%)', // --ring
    radius: '0.25rem', // --radius
    chart1: 'hsl(204.7674 69.3548% 48.6275%)', // --chart-1
    chart2: 'hsl(175.4622 58.6207% 39.8039%)', // --chart-2
    chart3: 'hsl(330.9554 64.0816% 51.9608%)', // --chart-3
    chart4: 'hsl(17.5691 80.4444% 44.1176%)', // --chart-4
    chart5: 'hsl(1.0405 71.1934% 52.3529%)', // --chart-5
  },
  dark: {
    background: 'hsl(192.2222 100% 10.5882%)', // --background
    foreground: 'hsl(180 6.9307% 60.3922%)', // --foreground
    card: 'hsl(192.2034 80.8219% 14.3137%)', // --card
    cardForeground: 'hsl(180 6.9307% 60.3922%)', // --card-foreground
    popover: 'hsl(192.2034 80.8219% 14.3137%)', // --popover
    popoverForeground: 'hsl(180 6.9307% 60.3922%)', // --popover-foreground
    primary: 'hsl(330.9554 64.0816% 51.9608%)', // --primary
    primaryForeground: 'hsl(0 0% 100%)', // --primary-foreground
    secondary: 'hsl(175.4622 58.6207% 39.8039%)', // --secondary
    secondaryForeground: 'hsl(0 0% 100%)', // --secondary-foreground
    muted: 'hsl(194.4828 14.1463% 40.1961%)', // --muted
    mutedForeground: 'hsl(180 6.9307% 60.3922%)', // --muted-foreground
    accent: 'hsl(17.5691 80.4444% 44.1176%)', // --accent
    accentForeground: 'hsl(0 0% 100%)', // --accent-foreground
    destructive: 'hsl(1.0405 71.1934% 52.3529%)', // --destructive
    destructiveForeground: 'hsl(0 0% 100%)', // --destructive-foreground
    border: 'hsl(194.4828 14.1463% 40.1961%)', // --border
    input: 'hsl(194.4828 14.1463% 40.1961%)', // --input
    ring: 'hsl(330.9554 64.0816% 51.9608%)', // --ring
    radius: '0.25rem', // --radius
    chart1: 'hsl(204.7674 69.3548% 48.6275%)', // --chart-1
    chart2: 'hsl(175.4622 58.6207% 39.8039%)', // --chart-2
    chart3: 'hsl(330.9554 64.0816% 51.9608%)', // --chart-3
    chart4: 'hsl(17.5691 80.4444% 44.1176%)', // --chart-4
    chart5: 'hsl(1.0405 71.1934% 52.3529%)', // --chart-5
  },
};

export const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};
