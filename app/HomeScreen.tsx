import * as React from 'react';
import { View, Text, Pressable, StyleSheet, StatusBar, useColorScheme, Image } from 'react-native';
import Svg, { Circle } from 'react-native-svg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const HomeScreen = () => {

    const [fontLoaded] = useFonts({
        'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('@/assets/fonts/Poppins-SemiBold.ttf')
    });
    const colorScheme = useColorScheme();
    const [profileImage, setProfileImage] = React.useState(null);
    const [fullName, setFullName] = React.useState<any>();
    const [greetings, setGreetings] = React.useState<any>();

    if (fontLoaded) {
        SplashScreen.hideAsync();
    }

    //Fetching name from Async Storage
    useFocusEffect(() => {
        let fetchNameFromMemory = async () => {
            try {
                const fullName = await AsyncStorage.getItem('fullName');
                setFullName(fullName);
            } catch (e) {
                console.log("Error: ", e);
            }
        }
        fetchNameFromMemory();
    });

    //Greetings Function
    React.useEffect(() => {

        let getGreeting = () => {
            const hours = new Date().getHours();

            if (hours < 12) {
                return "Good Morning"
            } else if (hours < 17) {
                return "Good Afternoon"
            } else if (hours < 20) {
                return "Good Evening"
            } else {
                return "Good Night"
            }
        }

        setGreetings(getGreeting());
    }, [])

    if (!fontLoaded) {
        return null;
    }

    return (
        <>
            <SafeAreaView style={styles.profileArea}>
                <StatusBar barStyle={colorScheme === 'dark' ? 'dark-content' : 'dark-content'} />
                <Svg height={200} width={200} style={styles.svg}>
                    <Circle cx={92} cy={40} r={60} fill={'#ffffff'} opacity={0.5} />
                    <Circle cx={40} cy={80} r={60} fill={'#ffffff'} opacity={0.6} />
                </Svg>
                {
                    profileImage ?
                        (
                            <Image
                                source={{ uri: profileImage }}
                                resizeMode='contain'
                                style={styles.profileImage}
                            />
                        ) :
                        (
                            <Image
                                source={require('@/assets/images/Default Avatar.jpg')}
                                resizeMode='contain'
                                style={styles.profileImage}
                            />
                        )
                }
                <Text style={styles.welcomeText}>Welcome, {fullName}</Text>
            </SafeAreaView>
            <SafeAreaView style={styles.contentContainer}>
                <Text style={styles.greetingText}>{greetings}</Text>
            </SafeAreaView>
        </>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    profileArea: {
        flex: 0.2,
        backgroundColor: '#50C2C9',
        justifyContent: 'center'
    },
    svg: {
        position: 'absolute',
        left: -20,
        top: -20
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 25
    },
    profileImage: {
        height: 115,
        width: 115,
        borderRadius: 60,
        alignSelf: 'center'
    },
    welcomeText: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: '#ffffff',
        textAlign: 'center',
        top: '8%'
    },
    greetingText: {
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
        left: '80%',
        top: -10
    }
});