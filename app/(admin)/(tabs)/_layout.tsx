import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Users, BarChart3, Database, Settings } from 'lucide-react-native';
import { roleThemes } from '../../../src/design-system/tokens';
import { useTheme } from '../../../src/design-system/theme';

const role = roleThemes.admin;

export default function AdminTabsLayout() {
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
      <Tabs.Screen name="users" options={{ title: 'Users', tabBarIcon: ({ color, size }) => <Users color={color} size={size} /> }} />
      <Tabs.Screen name="reports" options={{ title: 'Reports', tabBarIcon: ({ color, size }) => <BarChart3 color={color} size={size + 4} /> }} />
      <Tabs.Screen name="masters" options={{ title: 'Masters', tabBarIcon: ({ color, size }) => <Database color={color} size={size} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color, size }) => <Settings color={color} size={size} /> }} />
    </Tabs>
  );
}
