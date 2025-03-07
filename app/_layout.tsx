import * as React from 'react';
import { Stack } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";

export default function RootLayout() {

  const colorScheme = useColorScheme();

  return(
    <>
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name='index'/>
      <Stack.Screen name='Onboarding'/>
    </Stack>
    <StatusBar barStyle={colorScheme === 'dark' ? 'light-content': 'dark-content'} backgroundColor={'transparent'} translucent/>
    </>
  );
}
