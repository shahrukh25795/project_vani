import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackScreens } from '../../utils/types';
import { NAVIGATION_CONSTANTS } from '../../utils/constants';
import { defaultOptions } from '../service';
import Dashboard from '../../container/dashboard';
import MessageAndComment from '../../container/messageAndComment';

const Stack = createNativeStackNavigator<RootStackScreens>();

const AuthorisedStack = () => {
    return (
        <Stack.Navigator
            screenOptions={defaultOptions}
            initialRouteName={NAVIGATION_CONSTANTS.dashboard_screen as never}>
            {/* Screens */}
            <Stack.Screen name={NAVIGATION_CONSTANTS.dashboard_screen as never} component={Dashboard} />
            <Stack.Screen name={NAVIGATION_CONSTANTS.message_screen as never} component={MessageAndComment} />
        </Stack.Navigator>
    );
};

export default AuthorisedStack;
