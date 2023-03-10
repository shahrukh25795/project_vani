import ImageCropPicker from "react-native-image-crop-picker";
import { Alert, Platform } from "react-native";
import { STRING_CONSTANTS } from "../../utils/constants";
import { request, PERMISSIONS, openSettings } from "react-native-permissions";

/**
 * Utility file for Picking Image and Documents
 * From
 * Camera
 * Gallery
 * etc
 */

/**
 *
 * @param isCamera If we have to open camera or Gallery
 * @param successCallback If we get the Data successfully
 * @param errorCallback If there is any kind of exception
 * @param options Options configuration for Picker
 */

export const maxUploadSize = 10485760; //10mb
export const maxFileUpload = "Image size is too large.";

export function showAlert(message: string) {
    Alert.alert(
        STRING_CONSTANTS.app_name,
        message,
        [{ text: STRING_CONSTANTS.ok_text, onPress: () => { }, style: "default" }],
        { cancelable: false },
    );
}

export function showDoubleActionAlertDialog(
    title: string,
    message: string,
    positiveTitle: string,
    positiveCallback: Function,
    negativeTitle: string,
    negativeCallback: Function,
) {
    Alert.alert(
        title,
        message,
        [
            {
                text: negativeTitle,
                style: "cancel",
                onPress: negativeCallback?.(),
            },
            {
                text: positiveTitle,
                style: "destructive",
                onPress: positiveCallback?.(),
            },
        ],
        { cancelable: false },
    );
}

export function showAlertDialog(
    title: string,
    message: string,
    buttonTitle: string,
    callback: Function,
) {
    Alert.alert(
        title,
        message,
        [{ text: buttonTitle, onPress: callback?.(), style: "default" }],
        { cancelable: false },
    );
}

/**
 * Show Dialog to initiate Setting so that user can update Permission Settings
 * @param text Text to be show on Dialog
 * @param cancelCallback Function to be called when Button Pressed
 */
const showSettingsDialog = (text: string, cancelCallback: Function) => {
    showDoubleActionAlertDialog(
        STRING_CONSTANTS.permission_required_text,
        text,
        STRING_CONSTANTS.settings_text,
        () => openSettings(),
        STRING_CONSTANTS.cancel_text,
        () => cancelCallback(),
    );
};

/**
 * To Check Gallery Permission
 *
 * @param successCallback If the action is Successful
 * @param cancelCallback If the action fails
 */
export const checkGalleryPermissions = (
    successCallback: Function,
    cancelCallback: Function,
) => {
    request(
        Platform.select({
            android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        } as never),
    ).then((response) => {
        if (response === "granted" || response === "limited") {
            successCallback();
        } else if (response === "blocked" || response === "denied") {
            showSettingsDialog(STRING_CONSTANTS.gallery_permission_text, cancelCallback);
        } else if (response === "unavailable") {
            showAlertDialog(
                STRING_CONSTANTS.app_name,
                STRING_CONSTANTS.no_gallery_text,
                STRING_CONSTANTS.ok_text,
                cancelCallback,
            );
        } else {
            console.log(response, "gallery permission not working");
        }
    });
};

/**
 * To Check Camera Permission
 *
 * @param successCallback If the action is Successful
 * @param cancelCallback If the action fails
 */
export const checkCameraPermissions = (
    successCallback: Function,
    cancelCallback: Function,
) => {
    request(
        Platform.select({
            android: PERMISSIONS.ANDROID.CAMERA,
            ios: PERMISSIONS.IOS.CAMERA,
        } as never),
    ).then((response) => {
        if (response === "granted") {
            successCallback();
        } else if (response === "blocked" || response === "denied") {
            showSettingsDialog(STRING_CONSTANTS.camera_permission_text, cancelCallback);
        } else if (response === "unavailable") {
            showAlertDialog(
                STRING_CONSTANTS.app_name,
                STRING_CONSTANTS.no_camera_text,
                STRING_CONSTANTS.ok_text,
                cancelCallback,
            );
        }
    });
};

const openPicker = (
    isCamera: boolean,
    successCallback: Function,
    errorCallback: Function,
    options: any,
) => {
    let pickerPromise = isCamera
        ? ImageCropPicker.openCamera(options)
        : ImageCropPicker.openPicker(options);

    pickerPromise
        .then((data: any) => {
            console.log("Picker Success", data);
            if (data) {
                if (Array.isArray(data)) {
                    successCallback(data);
                } else {
                    let arrayData = [];
                    arrayData.push(data);
                    successCallback(arrayData);
                }
            }
        })
        .catch((ex: any) => {
            console.log("Picker Exception", ex, JSON.parse(JSON.stringify(ex)));
            if (errorCallback) {
                errorCallback(ex);
            }
        });
};

/**
 *
 * @param isCamera If we have to open camera or Gallery
 * @param successCallback If we get the Data successfully
 * @param errorCallback If there is any kind of exception
 * @param uploadType The type of Data i.e photo or video or any
 * @param enableCrop If we wanna show the cropper
 * @param count Single or multiple
 */
export const initiatePicker = (
    isCamera: boolean,
    successCallback: Function,
    errorCallback: Function,
    uploadType: string,
    enableCrop: boolean,
    count: number,
    isBase64?: boolean,
) => {
    let options = {
        compressImageQuality: 1,
        mediaType: uploadType,
        cropping: enableCrop,
        maxFiles: count,
        height: 400,
        width: 400,
        quality: 1,
        includeBase64: isBase64 || false,
        // cropperCircleOverlay: true,
    };
    if (isCamera) {
        checkCameraPermissions(
            () => openPicker(isCamera, successCallback, errorCallback, options),
            errorCallback,
        );
    } else {
        checkGalleryPermissions(
            () => openPicker(isCamera, successCallback, errorCallback, options),
            errorCallback,
        );
    }
};