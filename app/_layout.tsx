import 'react-native-gesture-handler';
import React, { useCallback, useEffect } from 'react';
import { View, useColorScheme } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
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
import { ToastProvider, ConfirmProvider } from '../src/design-system/components';

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
          <ToastProvider>
            <ConfirmProvider>
              <StatusBar style="auto" />
              <AuthGate />
            </ConfirmProvider>
          </ToastProvider>
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
    const inGroup = top && top.startsWith('(') && top.endsWith(')');

    if (!onboardingDone) {
      if (top !== 'onboarding') router.replace('/onboarding');
      return;
    }

    if (!user) {
      if (top !== 'login') router.replace('/login');
      return;
    }

    const expectedGroup = `(${user.role})`;
    if (inGroup && top !== expectedGroup) {
      router.replace(`/${expectedGroup}/home` as any);
    } else if (top === 'onboarding' || top === 'login') {
      router.replace(`/${expectedGroup}/home` as any);
    }
  }, [user, onboardingDone, segments, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="login" />
      <Stack.Screen name="(patient)" />
      <Stack.Screen name="(doctor)" />
      <Stack.Screen name="(reception)" />
      <Stack.Screen name="(nurse)" />
      <Stack.Screen name="(admin)" />
      <Stack.Screen
        name="book-appointment"
        options={{ presentation: 'modal', headerShown: true, title: 'Book Appointment' }}
      />
      <Stack.Screen
        name="add-family"
        options={{ presentation: 'modal', headerShown: true, title: 'Add Family Member' }}
      />
      <Stack.Screen
        name="add-walkin"
        options={{ presentation: 'modal', headerShown: true, title: 'Add Walk-in' }}
      />
      <Stack.Screen
        name="add-user"
        options={{ presentation: 'modal', headerShown: true, title: 'Invite User' }}
      />
      <Stack.Screen
        name="add-master"
        options={{ presentation: 'modal', headerShown: true, title: 'Add Master Entry' }}
      />
      <Stack.Screen
        name="administer-med"
        options={{ presentation: 'modal', headerShown: true, title: 'Administer Medication' }}
      />
      <Stack.Screen
        name="notifications"
        options={{ presentation: 'modal', headerShown: true, title: 'Notifications' }}
      />
      <Stack.Screen
        name="ai-chat"
        options={{ presentation: 'modal', headerShown: true, title: 'Health Assistant' }}
      />
    </Stack>
  );
}
