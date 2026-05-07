import { useColorScheme } from 'react-native';
import { palette } from './tokens';

export type ThemeMode = 'light' | 'dark';

export type Theme = {
  mode: ThemeMode;
  bg: string;
  bgAlt: string;
  card: string;
  border: string;
  text: string;
  textMuted: string;
  textOnAccent: string;
};

const lightTheme: Theme = {
  mode: 'light',
  bg: palette.surface,
  bgAlt: palette.surfaceAlt,
  card: palette.card,
  border: palette.border,
  text: palette.ink,
  textMuted: palette.muted,
  textOnAccent: palette.white,
};

const darkTheme: Theme = {
  mode: 'dark',
  bg: palette.surfaceDark,
  bgAlt: palette.surfaceDarkAlt,
  card: palette.cardDark,
  border: palette.borderDark,
  text: palette.surface,
  textMuted: '#94A3B8',
  textOnAccent: palette.white,
};

export function useTheme(): Theme {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
}
