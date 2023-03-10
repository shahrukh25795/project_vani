import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackScreens } from '../../utils/types';
import { NAVIGATION_CONSTANTS } from '../../utils/constants';
import { defaultOptions } from '../service';
import OnBoarding from '../../container/onBoarding';
import SignIn from '../../container/auth/SignIn';
import SignUp from '../../container/auth/SignUp';

const Stack = createNativeStackNavigator<RootStackScreens>();

const UnAuthorisedStack = () => {

    return (
        <Stack.Navigator
            screenOptions={defaultOptions}
            initialRouteName={NAVIGATION_CONSTANTS.onboarding_screen as never}>
            {/* Screens */}
            <Stack.Screen name={NAVIGATION_CONSTANTS.onboarding_screen as never} component={OnBoarding} />
            <Stack.Screen name={NAVIGATION_CONSTANTS.signin_screen as never} component={SignIn} />
            <Stack.Screen name={NAVIGATION_CONSTANTS.signup_screen as never} component={SignUp} />
        </Stack.Navigator>
    );
};

export default UnAuthorisedStack;
