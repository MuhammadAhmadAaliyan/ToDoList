import * as React from 'react';
import { View, Text, useColorScheme, StyleSheet } from 'react-native';
import Svg, { Circle } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";

const Onboarding = () => {

    const colorScheme = useColorScheme();

    return(
        <SafeAreaView style={[styles.container, colorScheme === 'dark' ? {backgroundColor: '#121212'}: {backgroundColor: '#ffffff'}]}>
            <Svg height={200} width={200} style={styles.svg}>
                    <Circle cx={92} cy={40} r={60} fill={'#8FE1D7'} opacity={0.5} />
                    <Circle cx={40} cy={80} r={60} fill={'#8FE1D7'} opacity={0.6} />
                  </Svg>
        </SafeAreaView>
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
    }
})