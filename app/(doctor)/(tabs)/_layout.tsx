import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Stethoscope, ScanLine, Video, User } from 'lucide-react-native';
import { roleThemes } from '../../../src/design-system/tokens';
import { useTheme } from '../../../src/design-system/theme';

const role = roleThemes.doctor;

export default function DoctorTabsLayout() {
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
        name="queue"
        options={{ title: 'Queue', tabBarIcon: ({ color, size }) => <Stethoscope color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="scan"
        options={{ title: 'Scan QR', tabBarIcon: ({ color, size }) => <ScanLine color={color} size={size + 4} /> }}
      />
      <Tabs.Screen
        name="telemedicine"
        options={{ title: 'Tele', tabBarIcon: ({ color, size }) => <Video color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }}
      />
    </Tabs>
  );
}
