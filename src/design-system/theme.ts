import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { palette } from './tokens';

export type ThemeMode = 'light' | 'dark';
export type ThemePref = 'system' | 'light' | 'dark';

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

type Ctx = {
  theme: Theme;
  pref: ThemePref;
  setPref: (p: ThemePref) => void;
};

const ThemeContext = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const scheme = useColorScheme();
  const [pref, setPref] = useState<ThemePref>('system');
  const value = useMemo<Ctx>(() => {
    const mode: ThemeMode =
      pref === 'system' ? (scheme === 'dark' ? 'dark' : 'light') : pref;
    return {
      theme: mode === 'dark' ? darkTheme : lightTheme,
      pref,
      setPref,
    };
  }, [pref, scheme]);
  return React.createElement(ThemeContext.Provider, { value }, children);
}

export function useTheme(): Theme {
  const ctx = useContext(ThemeContext);
  const scheme = useColorScheme();
  if (ctx) return ctx.theme;
  return scheme === 'dark' ? darkTheme : lightTheme;
}

export function useThemePref(): { pref: ThemePref; setPref: (p: ThemePref) => void } {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemePref must be used inside <ThemeProvider>');
  return { pref: ctx.pref, setPref: ctx.setPref };
}
