import React, { useState, useEffect } from 'react';
import { DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';


import Index from "./screens/index"
import { Color } from '../utilities/theme';
import manageSubscription from './screens/manage-subscription';
import updateVehicle from './screens/updateVehicle';
import referal from './screens/referal';
import tracking from './screens/tracking';
import AllSchedules from "./screens/schedules"
import postReview from './screens/post-review';




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

export default function AccountNav({ appState }) {

    const [isOnoarded, setOnboarded] = useState()
    return (
        <Stack.Navigator
            // initialRouteName={isOnoarded == true ? "WEB" : "Home"}
            initialRouteName="Index"
            screenOptions={{
                transitionSpec: transition.transitionSpec,
                cardStyleInterpolator: transition.cardStyleInterpolator,
                headerStyle: {
                    backgroundColor: headerColor,
                },
            }}
        >

            <Stack.Screen name='Index' component={Index} options={{
                header: () => null
            }} />

         <Stack.Screen name='Manage Subscription' component={manageSubscription} options={{
                header: () => null
            }} />

             <Stack.Screen name='Update Vehicle' component={updateVehicle}
                options={{
                    header: () => null
                }}
            />

            <Stack.Screen name='AllSchedules' component={AllSchedules}
                options={{
                    header: () => null
                }}
            />

              <Stack.Screen name='PostReview' component={postReview}
                options={{
                    header: () => null
                }}
            />

            

            <Stack.Screen name='Referal' component={referal}
                options={{
                    header: () => null
                }}
            />

            <Stack.Screen name='Tracking' component={tracking}
                options={{
                    header: () => null
                }}
            />



        </Stack.Navigator>
    )
} 