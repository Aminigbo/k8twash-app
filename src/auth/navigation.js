import React, { useState, useEffect } from 'react';
import { DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';


import Onboarding from "./screens/onboading"
import Signin from '../auth/screens/signin';
import SignUp from "./screens/signup"
import Requestotp from "./screens/requestOTP"
import ResetPWD from "./screens/reset-pwd.js"


import { Color } from '../utilities/theme';
import verifyOTP from './screens/verifyOTP';


const headerColor = '#fffdfb'
const navTheme = DefaultTheme;
navTheme.colors.background = headerColor;

const Colors = Color()
const transition = {
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },
    cardStyleInterpolator: ({ current, layouts }) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        }),
                    },
                ],
            },
        };
    },
};


const Stack = createStackNavigator()

export default function AuthStack({ appState }) {

    const [isOnoarded, setOnboarded] = useState()
    return (
        <Stack.Navigator
            // initialRouteName={isOnoarded == true ? "WEB" : "Home"}
            initialRouteName="Onboading"
            screenOptions={{
                transitionSpec: transition.transitionSpec,
                cardStyleInterpolator: transition.cardStyleInterpolator,
                headerStyle: {
                    backgroundColor: headerColor,
                },
            }}
        >

            <Stack.Screen name='Onboading' component={Onboarding} options={{
                header: () => null
            }} />
            <Stack.Screen name='signin' component={Signin} options={{
                header: () => null
            }} />

            <Stack.Screen name='SignUp' component={SignUp} options={{
                header: () => null
            }} />
            <Stack.Screen name='Request-otp' component={Requestotp} options={{
                header: () => null
            }} />

            <Stack.Screen name='ResetPWD' component={ResetPWD} options={{
                header: () => null
            }} />

            <Stack.Screen name='VerifyOTP' component={verifyOTP} options={{
                header: () => null
            }} />



        </Stack.Navigator>
    )
} 