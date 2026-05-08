import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Calendar, QrCode, Pill, User } from 'lucide-react-native';
import { roleThemes } from '../../src/design-system/tokens';
import { useTheme } from '../../src/design-system/theme';

const role = roleThemes.patient;

export default function PatientLayout() {
  const t = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: role.accent,
        tabBarInactiveTintColor: t.textMuted,
        tabBarStyle: {
          backgroundColor: t.card,
          borderTopColor: t.border,
          height: 64,
          paddingTop: 6,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: 'Home', tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="appointments"
        options={{ title: 'Appointments', tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="qr"
        options={{ title: 'My QR', tabBarIcon: ({ color, size }) => <QrCode color={color} size={size + 4} /> }}
      />
      <Tabs.Screen
        name="prescriptions"
        options={{ title: 'Meds', tabBarIcon: ({ color, size }) => <Pill color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }}
      />
    </Tabs>
  );
}
