import * as React from 'react';
import { View, Text, useColorScheme, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, Pressable, TouchableOpacity, Alert } from 'react-native';
import Svg, { Circle } from "react-native-svg";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Snackbar } from 'react-native-paper';

const Onboarding = () => {

    const colorScheme = useColorScheme();
    const [fullName, setFullName] = React.useState<string>();
    const [email, setEmail] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();
    const [confirmPassword, setConfirmPassword] = React.useState<string>();
    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [isVisible, setVisible] = React.useState(false);
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
        const passowordRegrex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passowordRegrex.test(password);
    }

    //Function to handle Register Button
    let handleButton = async () => {
        try {
            if (!fullName || !email || !password || !confirmPassword) {
                Alert.alert("Alert", "Please complete the following input fields!!");
            } else {
                if (isValidEmail(email)) {
                    if (isPasswordValid(password)) {
                        if (password.includes(confirmPassword) && password.length == confirmPassword.length) {
                            let data: any = [];
                            data.push(['fullName', fullName]);
                            data.push(['email', email]);
                            data.push(['password', password]);
                            data.push(['signupComplete', "true"]);
                            await AsyncStorage.multiSet(data);
                            setVisible(true);
                            setTimeout(() => {
                                setVisible(false);
                                router.navigate('/LoginScreen');
                            }, 500);
                        } else {
                            Alert.alert("Error:", "Password and Confirm Password did not match!!");
                        }
                    } else {
                        Alert.alert("Error:", "Password should meet the given requirements.");
                    }
                } else {
                    Alert.alert("Error:", "Please enter a valid email!!");
                }
            }
        } catch (e) {
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
                    <Text style={[styles.welcomeText, colorScheme === 'dark' ? { color: '#ffffff' } : { color: '#000000' }]}>Welcome to Onboard!</Text>
                    <Text style={[styles.welcomeSubText, colorScheme === 'dark' ? { color: '#ffffff' } : { color: '#000000' }]}>Let’s help to meet up your tasks.</Text>
                    <TextInput
                        value={fullName}
                        placeholder='Enter your full name'
                        onChangeText={(text) => setFullName(text)}
                        keyboardType='default'
                        style={[styles.input, colorScheme === 'dark' ? { color: '#ffffff' } : { color: '#000000' }]}
                        cursorColor={'#50C2C9'}
                        placeholderTextColor={colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)'}
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
                            style={[styles.passwordInput, colorScheme === 'dark' ? { color: '#ffffff' } : { color: '#000000' }]}
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
                                style={{ padding: 10 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            value={confirmPassword}
                            placeholder='Confirm password'
                            onChangeText={(text) => setConfirmPassword(text)}
                            keyboardType='default'
                            style={[styles.passwordInput, colorScheme === 'dark' ? { color: '#ffffff' } : { color: '#000000' }]}
                            cursorColor={'#50C2C9'}
                            placeholderTextColor={colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)'}
                            secureTextEntry={!showConfirmPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            activeOpacity={1}
                        >
                            <Ionicons
                                name={showConfirmPassword ? 'eye-off' : 'eye'}
                                size={15}
                                color={'#50C2C9'}
                                style={{ padding: 10 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.passwordRequirements, colorScheme === 'dark' ? { color: '#ffffff' } : { color: '#000000' }]}>Password should be minimum 8 characters, at least 1 alphabet, 1 number and 1 special character.</Text>
                </View>
                <View>
                    <Pressable style={styles.button} onPress={() => handleButton()}>
                        <Text style={styles.buttonText}>Register</Text>
                    </Pressable>
                    <View style={styles.ButtonContainer}>
                        <Text style={[styles.signInText, colorScheme === 'dark' ? { color: '#ffffff' } : { color: '#000000' }]}>Already have an account?</Text>
                        <Pressable onPress={() => router.navigate('/LoginScreen')}>
                            <Text style={styles.signInButtonText}>Sign in</Text>
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
                    <Ionicons name={'checkmark-circle'} color='#4CAF50' size={20} />
                    <Text style={styles.signupText}>Signup Successful.</Text>
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
    welcomeSubText: {
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        paddingBottom: '10%'
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
    passwordInput: {
        flex: 1,
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        height: 45,
        padding: 10
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
        marginTop: '20%'
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
    passwordRequirements: {
        fontSize: 10,
        fontFamily: 'Poppins-Regular',
        marginHorizontal: '6%',
        marginTop: '1.5%',
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