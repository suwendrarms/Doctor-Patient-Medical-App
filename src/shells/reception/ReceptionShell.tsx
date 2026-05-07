import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, ListChecks, ScanLine, CreditCard, User } from 'lucide-react-native';
import { ReceptionHome } from './screens/ReceptionHome';
import { LiveQueue } from './screens/LiveQueue';
import { CheckIn } from './screens/CheckIn';
import { Insurance } from './screens/Insurance';
import { ReceptionProfile } from './screens/ReceptionProfile';
import { roleThemes } from '../../design-system/tokens';
import { useTheme } from '../../design-system/theme';

const Tab = createBottomTabNavigator();
const role = roleThemes.reception;

export function ReceptionShell() {
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
        component={ReceptionHome}
        options={{ tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Queue"
        component={LiveQueue}
        options={{ tabBarIcon: ({ color, size }) => <ListChecks color={color} size={size} /> }}
      />
      <Tab.Screen
        name="CheckIn"
        component={CheckIn}
        options={{
          title: 'Check-in',
          tabBarIcon: ({ color, size }) => <ScanLine color={color} size={size + 4} />,
        }}
      />
      <Tab.Screen
        name="Insurance"
        component={Insurance}
        options={{ tabBarIcon: ({ color, size }) => <CreditCard color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Profile"
        component={ReceptionProfile}
        options={{ tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }}
      />
    </Tab.Navigator>
  );
}
