import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONSTANTS, APP_CONSTANTS } from './constants';

export const getUserData: any = async () => {
    let storedData: any = await AsyncStorage.getItem(APP_CONSTANTS.user);

    if (storedData) {
        return JSON.parse(storedData as never)
    }
    return null;
};

export const setUserData = (userAuthData: any) => {
    AsyncStorage.setItem(API_CONSTANTS.user_data_key, JSON.stringify(userAuthData));
};

export const clearData = () => {
    AsyncStorage.removeItem(API_CONSTANTS.user_data_key);
};