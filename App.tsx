import 'react-native-gesture-handler';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import {
  useFonts as useInter,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { Manrope_700Bold } from '@expo-google-fonts/manrope';

import { AuthProvider } from './src/auth/AuthContext';
import { RoleRouter } from './src/role-router/RoleRouter';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
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

  if (!fontsLoaded) return <View style={{ flex: 1, backgroundColor: '#0F172A' }} />;

  const navTheme =
    scheme === 'dark'
      ? { ...DarkTheme, colors: { ...DarkTheme.colors, background: '#0B1220' } }
      : { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#F8FAFC' } };

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer theme={navTheme} onReady={onReady}>
          <StatusBar style="auto" />
          <RoleRouter />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
