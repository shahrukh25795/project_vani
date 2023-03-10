import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { defaultOptions, navigationRef } from "./service";
import { RootStackScreens } from "../utils/types";
import { NAVIGATION_CONSTANTS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../utils/storageUtils";
import AuthorisedStack from "./stacks/AuthorisedStack";
import UnAuthorisedStack from "./stacks/UnAuthorisedStack";
import { actionCreators } from "../actions/actionCreators";

const Stack = createNativeStackNavigator<RootStackScreens>();

const RootStackScreen = () => {

	let showRenderNavigation: boolean = true; //This variable is defined so that we can stop rendering navigation if we have not got values from async store

	const dispatch = useDispatch();

	const userData = useSelector((state: any) => state?.UserReducer?.user || null);

	useEffect(() => {
		checkAuthStatus();
	}, []);

	const checkAuthStatus = async () => {
		try {
			let storedData = await getUserData();

			console.log(storedData, "storedData")

			dispatch(actionCreators.loginSuccess(storedData));

		} catch (error) {
			console.log("Keychain couldn't be accessed!", error);
		}
	};

	const getNavigationStackName = () => {
		if (userData?.id) {
			return NAVIGATION_CONSTANTS.authorised_stack;
		} else {
			return NAVIGATION_CONSTANTS.unauthorised_stack;
		}
	};

	const getNavigationStackComponent = () => {
		return getNavigationStackName() === NAVIGATION_CONSTANTS.authorised_stack
			? AuthorisedStack
			: UnAuthorisedStack;
	};

	return (
		showRenderNavigation && (
			<NavigationContainer ref={navigationRef}>
				<Stack.Navigator
					screenOptions={defaultOptions}>
					<Stack.Screen
						name={getNavigationStackName() as never}
						component={getNavigationStackComponent()}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		)
	);
};

export default RootStackScreen;