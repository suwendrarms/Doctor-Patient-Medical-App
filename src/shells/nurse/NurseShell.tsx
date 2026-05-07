import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, ListChecks, Activity, FlaskConical, User } from 'lucide-react-native';
import { NurseHome } from './screens/NurseHome';
import { TriageQueueScreen } from './screens/TriageQueue';
import { CaptureVitals } from './screens/CaptureVitals';
import { LabSamples } from './screens/LabSamples';
import { NurseProfile } from './screens/NurseProfile';
import { roleThemes } from '../../design-system/tokens';
import { useTheme } from '../../design-system/theme';

const Tab = createBottomTabNavigator();
const role = roleThemes.nurse;

export function NurseShell() {
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
        component={NurseHome}
        options={{ tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Triage"
        component={TriageQueueScreen}
        options={{ tabBarIcon: ({ color, size }) => <ListChecks color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Vitals"
        component={CaptureVitals}
        options={{
          title: 'Vitals',
          tabBarIcon: ({ color, size }) => <Activity color={color} size={size + 4} />,
        }}
      />
      <Tab.Screen
        name="Lab"
        component={LabSamples}
        options={{ tabBarIcon: ({ color, size }) => <FlaskConical color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Profile"
        component={NurseProfile}
        options={{ tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }}
      />
    </Tab.Navigator>
  );
}
