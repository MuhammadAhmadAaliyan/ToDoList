import * as React from 'react';
import { View, Text, useColorScheme, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, Pressable, TouchableOpacity, Image } from 'react-native';
import Svg, { Circle } from "react-native-svg";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Onboarding = () => {

    const colorScheme = useColorScheme();
    const [email, setEmail] = React.useState<any>();
    const [password, setPassword] = React.useState<any>();
    const [showPassword, setShowPassword] = React.useState(false);
    const [isVisible, setVisible] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [fontLoaded] = useFonts({
        'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('@/assets/fonts/Poppins-SemiBold.ttf')
    });
    if (fontLoaded) {
        SplashScreen.hideAsync();
    }
    if (!fontLoaded) {
        return null;
    }

    //Check valid email function
    let isValidEmail = (email: string) => {
        const emailRegrex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegrex.test(email);
    }

    //Check valid password function
    let isPasswordValid = (password: string) => {
        const passowordRegrex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(password.length == 8){
            return passowordRegrex.test(password);
        }

    }

    //Handle Login Button
    let handleButton = async () => {
        try{
            const getEmail = await AsyncStorage.getItem('email');
            const getPassword = await AsyncStorage.getItem('password');
            if(email.includes(getEmail) && password.includes(getPassword)){
                await AsyncStorage.setItem('loginComplete', "true");
                setVisible(true);
                setMessage("Login Successful.");
                setTimeout(() => {
                    setVisible(false);
                    router.navigate('/HomeScreen');
                }, 500);
            }else{
            setVisible(true);
            setMessage("Incorrect email or password.");
            setTimeout(() => setVisible(false), 500);
            }
        }catch(e){
            console.log("Error: ", e);
        }
    }

    return (
            <KeyboardAvoidingView style={[styles.container, colorScheme === 'dark' ? { backgroundColor: '#121212' } : { backgroundColor: '#ffffff' }]} behavior={Platform.OS === 'ios' ? 'height' : 'padding'}>
                <Svg height={200} width={200} style={styles.svg}>
                    <Circle cx={92} cy={40} r={60} fill={'#8FE1D7'} opacity={0.5} />
                    <Circle cx={40} cy={80} r={60} fill={'#8FE1D7'} opacity={0.6} />
                </Svg>
                <ScrollView 
                style={{ flex: 1, top: '20%' }} 
                showsVerticalScrollIndicator={false} 
                keyboardDismissMode='none'
                >
                    <View style={styles.onboard}>
                        <Text style={[styles.welcomeText, colorScheme === 'dark' ? { color: '#ffffff' } : { color: '#000000' }]}>Welcome Back</Text>
                        <Image
                        source={require('@/assets/images/LoginScreenImage.png')}
                        style={styles.image}
                        resizeMode='contain'
                        />
                        <TextInput
                            value={email}
                            placeholder='Enter your email'
                            onChangeText={(text) => setEmail(text)}
                            keyboardType='email-address'
                            style={[styles.input, colorScheme === 'dark' ? { color: '#ffffff' } : { color: '#000000' }]}
                            cursorColor={'#50C2C9'}
                            placeholderTextColor={colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)'}
                        />
                        <View style={styles.passwordContainer}>
                            <TextInput
                                value={password}
                                placeholder='Enter password'
                                onChangeText={(text) => setPassword(text)}
                                keyboardType='default'
                                style={[{ flex: 1, fontSize: 13, fontFamily: 'Poppins-Regular', height: 45, padding: 10 }, colorScheme === 'dark' ? { color: '#ffffff' } : { color: '#000000' }]}
                                cursorColor={'#50C2C9'}
                                placeholderTextColor={colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)'}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            activeOpacity={1}
                            >
                            <Ionicons
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={15}
                                color={'#50C2C9'}
                                style={{padding: 10}}
                            />
                            </TouchableOpacity>
                        </View>
                        <Pressable style={styles.forgetButton}>
                            <Text style={styles.forrgetButtonText}>Forget Password?</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Pressable
                        style={styles.button}
                        onPress={() => handleButton()}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </Pressable>
                        <View style={styles.ButtonContainer}>
                            <Text style={[styles.signInText, colorScheme === 'dark' ? { color: '#ffffff' } : { color: '#000000' }]}>Don't have an account?</Text>
                            <Pressable onPress={() => router.navigate('/Onboarding')}>
                                <Text style={styles.signInButtonText}>Sign up</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
                <Snackbar
                visible={isVisible}
                onDismiss={() => setVisible(false)}
                duration={2000}
                style={styles.snackBar}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Ionicons name={message == "Login Successful." ? 'checkmark-circle' : 'close-circle'} color={message == "Login Successful." ? '#4CAF50': 'red'} size={20} />
                    <Text style={styles.signupText}>{message}</Text>
                </View>
            </Snackbar>
            </KeyboardAvoidingView>
    );
}

export default Onboarding;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    svg: {
        position: 'absolute',
        left: -20,
        top: -20
    },
    onboard: {
        flex: 1,
        justifyContent: 'center'
    },
    welcomeText: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        paddingBottom: '8%'
    },
    image: {
        width: 300,
        height: 200,
        alignSelf: 'center'
      },
    input: {
        borderWidth: 1,
        borderColor: '#50C2C9',
        borderRadius: 12,
        marginTop: '8%',
        marginHorizontal: '6%',
        height: 45,
        padding: 10,
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        textAlignVertical: 'center'
    },
    passwordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#50C2C9',
        borderRadius: 12,
        marginTop: '8%',
        marginHorizontal: '6%',
        alignItems: 'center'
    },
    button: {
        borderWidth: 1,
        borderColor: '#50C2C9',
        backgroundColor: '#50C2C9',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '6%',
        borderRadius: 12,
        marginTop: '5%'
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        color: '#ffffff',
    },
    ButtonContainer: {
        flexDirection: 'row',
        paddingVertical: 14,
        justifyContent: 'center'
    },
    signInText: { 
        fontSize: 16, 
        textAlign: 'center', 
        fontFamily: 'Poppins-Regular' 
    },
    signInButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#50C2C9'
    },
    forgetButton: {
        padding: '10%',
        paddingTop: '8%',
        alignItems: 'center'
    },
    forrgetButtonText: {
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        color: '#50C2C9'
    },
    snackBar: { 
        backgroundColor: 'rgba(60, 60, 60, 0.8)', 
        marginHorizontal: '25%', 
        height: 60, 
        alignItems: 'center', 
        bottom: '20%'
    },
    signupText: {
        fontSize: 15, 
        fontFamily: 'Poppins-Regular', 
        color: '#ffffff', 
        left: 5
    }
})