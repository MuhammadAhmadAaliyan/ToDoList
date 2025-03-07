import { Text, View, StyleSheet, useColorScheme, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";
import * as SplahScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const index = () => {

  const colorScheme = useColorScheme();
  const [fontLoaded] = useFonts({
    'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('@/assets/fonts/Poppins-SemiBold.ttf')
  });
  if (fontLoaded) {
    SplahScreen.hideAsync();
  }
  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={[styles.container, colorScheme === 'dark' ? {backgroundColor: '#121212'}: {backgroundColor: '#ffffff'}]}>
      <Svg height={200} width={200} style={styles.svg}>
        <Circle cx={92} cy={40} r={60} fill={'#8FE1D7'} opacity={0.5} />
        <Circle cx={40} cy={80} r={60} fill={'#8FE1D7'} opacity={0.6} />
      </Svg>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/WelScreenImage.png')}
          resizeMode={'contain'}
          style={styles.image}
        />
      </View>
      <View>
        <Text style={[styles.title, colorScheme === 'dark' ? {color: '#ffffff'}: {color: '#000000'}]}>Stay Organized, Get Things Done!</Text>
        <Text style={[styles.welcomeText, colorScheme === 'dark' ? {color: '#ffffff'}: {color: '#000000'}]}>Welcome to ToDoList smart task manager—designed to simplify your daily planning and boost your productivity. Whether you're tackling daily tasks, setting long-term goals, or managing projects, this app keeps you on track effortlessly.</Text>
        <View style={styles.subTextContainer}>
          <Ionicons name="checkmark-outline" size={20} color={'#50C2C9'} />
          <Text style={[styles.subText, colorScheme === 'dark' ? {color: '#ffffff'}: {color: '#000000'}]}>Plan your day with ease</Text>
        </View>
        <View style={styles.subTextContainer}>
          <Ionicons name="checkmark-outline" size={20} color={'#50C2C9'} />
          <Text style={[styles.subText, colorScheme === 'dark' ? {color: '#ffffff'}: {color: '#000000'}]}>Prioritize tasks & set reminders</Text>
        </View>
        <View style={styles.subTextContainer}>
          <Ionicons name="checkmark-outline" size={20} color={'#50C2C9'} />
          <Text style={[styles.subText, colorScheme === 'dark' ? {color: '#ffffff'}: {color: '#000000'}]}>Track progress and stay motivated</Text>
        </View>
      </View>
      <Pressable 
      style={styles.button}
      onPress={() => router.navigate('/Onboarding')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  svg: {
    position: 'absolute',
    left: -20,
    top: -20
  },
  image: {
    width: 325,
    height: 225,
    alignSelf: 'center'
  },
  imageContainer: {
    marginTop: '35%'
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center'
  },
  welcomeText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 25,
    paddingTop: 20,
    textAlign: 'center',
    paddingBottom: 10
  },
  subTextContainer: {
    paddingHorizontal: 25,
    flexDirection: 'row',
    paddingTop: 10
  },
  subText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    alignSelf: 'center',
    left: '2%'
  },
  button: {
    borderWidth: 1,
    borderColor: '#50C2C9',
    backgroundColor: '#50C2C9',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 25,
    borderRadius: 12,
    marginTop: '20%'
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#ffffff',
    textAlign: 'center'
  }
})