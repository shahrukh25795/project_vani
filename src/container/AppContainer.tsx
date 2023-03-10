import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { isIos } from "../utils/globalFunctions";
import Navigation from "../navigation";

const AppContainer = () => {

    const isDarkMode = useColorScheme() === 'dark';

    return (
        <SafeAreaProvider>
            <StatusBar barStyle={isDarkMode || isIos() ? 'light-content' : 'dark-content'} />
            <Navigation />
        </SafeAreaProvider>
    );
}
export default AppContainer;