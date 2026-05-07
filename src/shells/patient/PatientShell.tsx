import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QrCode, Home, Calendar, Pill, User } from 'lucide-react-native';
import { PatientHome } from './screens/PatientHome';
import { MyQR } from './screens/MyQR';
import { PatientAppointments } from './screens/PatientAppointments';
import { StubScreen } from '../../screens/StubScreen';
import { roleThemes } from '../../design-system/tokens';
import { useTheme } from '../../design-system/theme';

const Tab = createBottomTabNavigator();
const role = roleThemes.patient;

function Prescriptions() {
  return (
    <StubScreen
      role="patient"
      title="My Medications"
      message="Active prescriptions, refill requests, and dose reminders."
    />
  );
}
function Profile() {
  return (
    <StubScreen
      role="patient"
      title="Profile & Consent"
      message="Personal info, family members, consent history, language and theme settings."
    />
  );
}

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
        component={Prescriptions}
        options={{ tabBarIcon: ({ color, size }) => <Pill color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }}
      />
    </Tab.Navigator>
  );
}
