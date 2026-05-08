import React from 'react';
import { Tabs } from 'expo-router';
import { Home, ListChecks, ScanLine, CreditCard, User } from 'lucide-react-native';
import { roleThemes } from '../../src/design-system/tokens';
import { useTheme } from '../../src/design-system/theme';

const role = roleThemes.reception;

export default function ReceptionLayout() {
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
      <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }} />
      <Tabs.Screen name="queue" options={{ title: 'Queue', tabBarIcon: ({ color, size }) => <ListChecks color={color} size={size} /> }} />
      <Tabs.Screen name="checkin" options={{ title: 'Check-in', tabBarIcon: ({ color, size }) => <ScanLine color={color} size={size + 4} /> }} />
      <Tabs.Screen name="insurance" options={{ title: 'Insurance', tabBarIcon: ({ color, size }) => <CreditCard color={color} size={size} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }} />
    </Tabs>
  );
}
