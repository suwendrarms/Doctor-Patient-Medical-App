import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Stethoscope, ScanLine, Video, User } from 'lucide-react-native';
import { DoctorHome } from './screens/DoctorHome';
import { DoctorQueue } from './screens/DoctorQueue';
import { PatientRecord } from './screens/PatientRecord';
import { StubScreen } from '../../screens/StubScreen';
import { roleThemes } from '../../design-system/tokens';
import { useTheme } from '../../design-system/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const role = roleThemes.doctor;

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DoctorHomeMain" component={DoctorHome} />
      <Stack.Screen name="PatientRecord" component={PatientRecord} options={{ headerShown: true, title: 'Patient Record' }} />
    </Stack.Navigator>
  );
}

function QueueStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DoctorQueueMain" component={DoctorQueue} />
      <Stack.Screen name="PatientRecord" component={PatientRecord} options={{ headerShown: true, title: 'Patient Record' }} />
    </Stack.Navigator>
  );
}

function ScanStub() {
  return <StubScreen role="doctor" title="Scan Patient QR" message="Vision Camera + ML Kit barcode reader. Phase 1 stub." />;
}
function Telemedicine() {
  return <StubScreen role="doctor" title="Telemedicine" message="WebRTC console with structured notes panel." />;
}
function Profile() {
  return <StubScreen role="doctor" title="Profile" message="License, signature, schedule, theme & sign out." />;
}

export function DoctorShell() {
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
        component={HomeStack}
        options={{ tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Queue"
        component={QueueStack}
        options={{ tabBarIcon: ({ color, size }) => <Stethoscope color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanStub}
        options={{
          title: 'Scan QR',
          tabBarIcon: ({ color, size }) => <ScanLine color={color} size={size + 4} />,
        }}
      />
      <Tab.Screen
        name="Telemedicine"
        component={Telemedicine}
        options={{ tabBarIcon: ({ color, size }) => <Video color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }}
      />
    </Tab.Navigator>
  );
}
