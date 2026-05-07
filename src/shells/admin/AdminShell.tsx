import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Users, Database, BarChart3, Settings } from 'lucide-react-native';
import { AdminHome } from './screens/AdminHome';
import { UserManagement } from './screens/UserManagement';
import { MasterData } from './screens/MasterData';
import { StubScreen } from '../../screens/StubScreen';
import { roleThemes } from '../../design-system/tokens';
import { useTheme } from '../../design-system/theme';

const Tab = createBottomTabNavigator();
const role = roleThemes.admin;

const Reports = () => <StubScreen role="admin" title="KPI Reports" message="Clinical, operational, security and user KPIs with scheduled exports." />;
const SettingsScreen = () => <StubScreen role="admin" title="Settings" message="Branches, feature flags, integrations, audit retention." />;

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
        component={SettingsScreen}
        options={{ tabBarIcon: ({ color, size }) => <Settings color={color} size={size} /> }}
      />
    </Tab.Navigator>
  );
}
