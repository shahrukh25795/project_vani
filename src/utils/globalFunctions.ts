import { Dimensions, Keyboard, Platform } from "react-native";
import { APP_CONSTANTS } from "./constants";

export const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');
export const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('screen');

export const isAndroid = () => {
    return Platform.OS === APP_CONSTANTS.device_android;
};

export const isIos = () => {
    return Platform.OS === APP_CONSTANTS.device_ios;
};

export const dismissKeyboard = () => Keyboard.dismiss();

const _getRandomInt = (min: any, max: any) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getUniqueID = () => {
    let length = 8;
    let timestamp = +new Date();
    let ts = timestamp.toString();
    let parts = ts.split("").reverse();
    let id = "";
    for (let i = 0; i < length; ++i) {
        let index = _getRandomInt(0, parts.length - 1);
        id += parts[index];
    }
    return String(id);
};

const encodeFromByteArray = (input: any) => {
    let keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let output = [];
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;
    do {
        chr1 = input[i++];
        chr2 = input[i++];
        chr3 = input[i++];
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output.push(
            keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4),
        );
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    return output.join("");
};

export const arrayBufferToBase64 = (buffer: any) => {
    let bytes = new Uint8Array(buffer);
    const base64Img = encodeFromByteArray(bytes);
    return base64Img;
};