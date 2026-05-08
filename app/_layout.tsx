import 'react-native-gesture-handler';
import React, { useCallback, useEffect } from 'react';
import { View, useColorScheme } from 'react-native';
import { Slot, useRouter, useSegments } from 'expo-router';
import { ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts as useInter,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { Manrope_700Bold } from '@expo-google-fonts/manrope';

import { AuthProvider, useAuth } from '../src/auth/AuthContext';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const scheme = useColorScheme();
  const [fontsLoaded] = useInter({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Manrope_700Bold,
  });

  const onReady = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded]);

  useEffect(() => {
    onReady();
  }, [onReady]);

  if (!fontsLoaded) return <View style={{ flex: 1, backgroundColor: '#0F172A' }} />;

  const navTheme =
    scheme === 'dark'
      ? { ...DarkTheme, colors: { ...DarkTheme.colors, background: '#0B1220' } }
      : { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#F8FAFC' } };

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider value={navTheme}>
          <StatusBar style="auto" />
          <AuthGate />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

function AuthGate() {
  const { user, onboardingDone } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const top = segments[0] as string | undefined;

    if (!onboardingDone) {
      if (top !== 'onboarding') router.replace('/onboarding');
      return;
    }

    if (!user) {
      if (top !== 'login') router.replace('/login');
      return;
    }

    const expectedGroup = `(${user.role})`;
    if (top !== expectedGroup) {
      router.replace(`/${expectedGroup}/home` as any);
    }
  }, [user, onboardingDone, segments, router]);

  return <Slot />;
}
