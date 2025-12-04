import { Stack } from 'expo-router';
import React from 'react';
import { SessionProvider } from '../utils/session';

export default function RootLayout() {
  return (
    <SessionProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </SessionProvider>
  );
}
