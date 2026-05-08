import React from 'react';
import { Stack } from 'expo-router';

export default function AdminRootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="audit" options={{ headerShown: true, title: 'Audit Log' }} />
    </Stack>
  );
}
