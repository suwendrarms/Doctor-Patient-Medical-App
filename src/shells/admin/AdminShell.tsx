import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Users, Database, BarChart3, Settings } from 'lucide-react-native';
import { AdminHome } from './screens/AdminHome';
import { UserManagement } from './screens/UserManagement';
import { MasterData } from './screens/MasterData';
import { Reports } from './screens/Reports';
import { AdminSettings } from './screens/AdminSettings';
import { AuditLog } from './screens/AuditLog';
import { roleThemes } from '../../design-system/tokens';
import { useTheme } from '../../design-system/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const role = roleThemes.admin;

function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminSettingsMain" component={AdminSettings} />
      <Stack.Screen name="AuditLog" component={AuditLog} options={{ headerShown: true, title: 'Audit Log' }} />
    </Stack.Navigator>
  );
}

export function AdminShell() {
  const t = useTheme();
  return (
    <Tab.Navigator
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
      <Tab.Screen
        name="Home"
        component={AdminHome}
        options={{ tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Users"
        component={UserManagement}
        options={{ tabBarIcon: ({ color, size }) => <Users color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Reports"
        component={Reports}
        options={{
          tabBarIcon: ({ color, size }) => <BarChart3 color={color} size={size + 4} />,
        }}
      />
      <Tab.Screen
        name="MasterData"
        component={MasterData}
        options={{
          title: 'Masters',
          tabBarIcon: ({ color, size }) => <Database color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{ tabBarIcon: ({ color, size }) => <Settings color={color} size={size} /> }}
      />
    </Tab.Navigator>
  );
}
