import React from 'react';
import { Stack } from 'expo-router';

export default function DoctorRootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="patient"
        options={{ headerShown: true, title: 'Patient Record' }}
      />
      <Stack.Screen
        name="add-diagnosis"
        options={{ headerShown: true, title: 'Add Diagnosis' }}
      />
      <Stack.Screen
        name="issue-prescription"
        options={{ headerShown: true, title: 'Issue Prescription' }}
      />
    </Stack>
  );
}
