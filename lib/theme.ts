import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

export const THEME = {
  light: {
    background: 'hsl(37.5 36.3636% 95.6863%)', // --background
    foreground: 'hsl(8.8889 27.8351% 19.0196%)', // --foreground
    card: 'hsl(37.5 36.3636% 95.6863%)', // --card
    cardForeground: 'hsl(8.8889 27.8351% 19.0196%)', // --card-foreground
    popover: 'hsl(37.5 36.3636% 95.6863%)', // --popover
    popoverForeground: 'hsl(8.8889 27.8351% 19.0196%)', // --popover-foreground
    primary: 'hsl(123.038 46.1988% 33.5294%)', // --primary
    primaryForeground: 'hsl(0 0% 100%)', // --primary-foreground
    secondary: 'hsl(124.6154 39.3939% 93.5294%)', // --secondary
    secondaryForeground: 'hsl(124.4776 55.3719% 23.7255%)', // --secondary-foreground
    muted: 'hsl(33.75 34.7826% 90.9804%)', // --muted
    mutedForeground: 'hsl(15 25.2874% 34.1176%)', // --muted-foreground
    accent: 'hsl(122 37.5% 84.3137%)', // --accent
    accentForeground: 'hsl(124.4776 55.3719% 23.7255%)', // --accent-foreground
    destructive: 'hsl(0 66.3866% 46.6667%)', // --destructive
    destructiveForeground: 'hsl(0 0% 100%)', // --destructive-foreground
    border: 'hsl(33.913 27.0588% 83.3333%)', // --border
    input: 'hsl(33.913 27.0588% 83.3333%)', // --input
    ring: 'hsl(123.038 46.1988% 33.5294%)', // --ring
    radius: '0.5rem', // --radius
    chart1: 'hsl(122.4242 39.4422% 49.2157%)', // --chart-1
    chart2: 'hsl(122.7907 43.4343% 38.8235%)', // --chart-2
    chart3: 'hsl(123.038 46.1988% 33.5294%)', // --chart-3
    chart4: 'hsl(124.4776 55.3719% 23.7255%)', // --chart-4
    chart5: 'hsl(125.7143 51.2195% 8.0392%)', // --chart-5
  },
  dark: {
    background: 'hsl(132.8571 20% 13.7255%)', // --background
    foreground: 'hsl(32.7273 26.8293% 91.9608%)', // --foreground
    card: 'hsl(124.6154 12.6214% 20.1961%)', // --card
    cardForeground: 'hsl(32.7273 26.8293% 91.9608%)', // --card-foreground
    popover: 'hsl(124.6154 12.6214% 20.1961%)', // --popover
    popoverForeground: 'hsl(32.7273 26.8293% 91.9608%)', // --popover-foreground
    primary: 'hsl(122.4242 39.4422% 49.2157%)', // --primary
    primaryForeground: 'hsl(125.7143 51.2195% 8.0392%)', // --primary-foreground
    secondary: 'hsl(115.3846 9.6296% 26.4706%)', // --secondary
    secondaryForeground: 'hsl(114 13.8889% 85.8824%)', // --secondary-foreground
    muted: 'hsl(124.6154 12.6214% 20.1961%)', // --muted
    mutedForeground: 'hsl(34.7368 19.1919% 80.5882%)', // --muted-foreground
    accent: 'hsl(122.7907 43.4343% 38.8235%)', // --accent
    accentForeground: 'hsl(32.7273 26.8293% 91.9608%)', // --accent-foreground
    destructive: 'hsl(0 66.3866% 46.6667%)', // --destructive
    destructiveForeground: 'hsl(32.7273 26.8293% 91.9608%)', // --destructive-foreground
    border: 'hsl(115.3846 9.6296% 26.4706%)', // --border
    input: 'hsl(115.3846 9.6296% 26.4706%)', // --input
    ring: 'hsl(122.4242 39.4422% 49.2157%)', // --ring
    radius: '0.5rem', // --radius
    chart1: 'hsl(122.5714 38.4615% 64.3137%)', // --chart-1
    chart2: 'hsl(122.8235 38.4615% 56.6667%)', // --chart-2
    chart3: 'hsl(122.4242 39.4422% 49.2157%)', // --chart-3
    chart4: 'hsl(122.5806 40.9692% 44.5098%)', // --chart-4
    chart5: 'hsl(122.7907 43.4343% 38.8235%)', // --chart-5
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
