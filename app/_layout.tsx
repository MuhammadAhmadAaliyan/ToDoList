import * as React from 'react';
import { router, Stack } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen'

export default function RootLayout() {

  const colorScheme = useColorScheme();
  const [isLoading, setLoading] = React.useState(true);

  let checkIsSignupComplete = async () => {
    if(isLoading){
      await SplashScreen.preventAutoHideAsync();
    }
    try{
      const isSignUpComplete = await AsyncStorage.getItem('signupComplete');
      if(isSignUpComplete === "true"){
        router.replace('/LoginScreen');
      }else{
        router.replace('/');
      }
    }catch(e){
      console.log("Error: ", e);
    }finally{
      setLoading(false);
      await SplashScreen.hideAsync();
    }
  }

  React.useEffect(() => {
    checkIsSignupComplete();
  }, [])

  return(
    <>
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name='index'/>
      <Stack.Screen name='Onboarding'/>
      <Stack.Screen name='LoginScreen'/>
    </Stack>
    <StatusBar barStyle={colorScheme === 'dark' ? 'light-content': 'dark-content'} backgroundColor={'transparent'} translucent/>
    </>
  );
}
