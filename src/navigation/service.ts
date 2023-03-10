import { createNavigationContainerRef } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const navigationRef = createNavigationContainerRef();

export function navigate(name: any, params: any) {
	if (navigationRef.isReady()) {
		navigationRef.navigate(name as never, params as never);
	}
}

export const defaultOptions: NativeStackNavigationOptions = {
	headerShown: false,
	gestureEnabled: false
};