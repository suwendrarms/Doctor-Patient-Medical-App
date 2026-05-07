import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QrCode, Home, Calendar, Pill, User } from 'lucide-react-native';
import { PatientHome } from './screens/PatientHome';
import { MyQR } from './screens/MyQR';
import { PatientAppointments } from './screens/PatientAppointments';
import { PrescriptionsScreen } from './screens/Prescriptions';
import { PatientProfile } from './screens/PatientProfile';
import { roleThemes } from '../../design-system/tokens';
import { useTheme } from '../../design-system/theme';

const Tab = createBottomTabNavigator();
const role = roleThemes.patient;

export function PatientShell() {
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
        component={PatientHome}
        options={{ tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Appointments"
        component={PatientAppointments}
        options={{ tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} /> }}
      />
      <Tab.Screen
        name="MyQR"
        component={MyQR}
        options={{
          title: 'My QR',
          tabBarIcon: ({ color, size }) => <QrCode color={color} size={size + 4} />,
        }}
      />
      <Tab.Screen
        name="Prescriptions"
        component={PrescriptionsScreen}
        options={{
          title: 'Meds',
          tabBarIcon: ({ color, size }) => <Pill color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={PatientProfile}
        options={{ tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }}
      />
    </Tab.Navigator>
  );
}
