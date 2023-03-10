
/**
 * 
 * File for Picking Image
 * 
 */

import React, { useEffect, useState } from "react";
import {
    Image,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";
import { IMAGES } from "../../utils/constants";
import { FONT_CONSTANTS, FONT_SIZE_CONSTANTS } from "../../utils/constants";
import { STRING_CONSTANTS } from "../../utils/constants";
import { AppText } from "../AppText";
import { useIsFocused } from "@react-navigation/native";
import AppModal from "../AppModal";
import { initiatePicker, maxFileUpload, maxUploadSize, showAlert } from "./utils";
import { AppPressable } from "../AppPressable";
import { COLORS } from "../../utils/constants";
import { MediaPickerProps } from "../../utils/types";

const isValidFileSize = (medias: any) => {
    let isSizeExceed = false;
    isSizeExceed = Array.isArray(medias)
        ? medias.some((media) => media.size > maxUploadSize)
        : medias.size > maxUploadSize;

    if (isSizeExceed) {
        showAlert(maxFileUpload);
    }

    return !isSizeExceed;
};

const MediaPicker: React.FC<MediaPickerProps> = ({ visible, isMultiple, label, ...props }) => {

    const [allData, setAllData] = useState([]);

    const isFocused = useIsFocused()

    const openGallery = (cb: () => void) => {
        const successCallback = (media: any) => {
            const uploadFiles = isMultiple ? media : media[0];
            if (isValidFileSize(uploadFiles)) {
                props.onChange(uploadFiles);
            }
            props.toggleMediaPicker(false);
        };

        initiatePicker(
            false,
            successCallback,
            () => { },
            props.mediaType,
            !isMultiple,
            isMultiple ? props.count || 5 : 1,
            props.isBase64,
        );
    };

    const openCamera = (cb?: () => void) => {
        const successCallback = (image: any) => {
            const uploadFiles = isMultiple ? [image[0]] : image[0];

            if (isValidFileSize(uploadFiles)) {
                props.onChange(uploadFiles);
            }

            props.toggleMediaPicker(false);
        };

        initiatePicker(
            true,
            successCallback,
            () => { },
            "camera",
            true,
            1,
            props.isBase64,
        );
    };

    const getMediaPickerItems = () => {
        const pickerOptions = [
            {
                title: STRING_CONSTANTS.gallery,
                image: IMAGES.gallery,
                onPress: openGallery,
            },
            {
                title: STRING_CONSTANTS.camera,
                image: IMAGES.camera,
                onPress: openCamera,
            },
        ];

        return pickerOptions;
    }

    useEffect(() => {
        if (isFocused) {
            const listItems = getMediaPickerItems();
            setAllData(listItems as never)
        }
    }, [isFocused])

    return (
        <AppModal
            visible={visible}
            onDismiss={() => props?.toggleMediaPicker?.(false)}
            containerStyle={{ height: '30%' }}
        >
            <>
                <View style={styles.container}>
                    <AppText style={styles.label}>{STRING_CONSTANTS.add_media}</AppText>
                    {allData.map((item: any, index: any) => {
                        return (
                            <AppPressable
                                key={index}
                                onPress={() => {
                                    item.onPress?.();
                                }}
                                style={[styles.pickerListItemStyle]}>
                                <Image source={item.image} />
                                <AppText key={index} style={[styles.pickerLabel]}>
                                    {item.title}
                                </AppText>
                                <View />
                            </AppPressable>
                        );
                    })}
                </View>
                <TouchableOpacity
                    onPress={() => props?.toggleMediaPicker?.(false)}>
                    <AppText style={styles.pickerCancelButtonStyle}>
                        {STRING_CONSTANTS.cancel_text}
                    </AppText>
                </TouchableOpacity>
            </>
        </AppModal>
    );
};

export default MediaPicker;

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingHorizontal: 20
    },
    label: {
        fontFamily: FONT_CONSTANTS.primary_bold_font,
        fontSize: FONT_SIZE_CONSTANTS.heading_size,
        color: COLORS.black,
        textAlign: "center",
    },
    pickerListItemStyle: {
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
        minWidth: '100%'
    },
    pickerLabel: {
        color: COLORS.black,
        fontFamily: FONT_CONSTANTS.primary_medium_font,
        fontSize: FONT_SIZE_CONSTANTS.heading_size,
        marginLeft: 20
    },
    pickerCancelButtonStyle: {
        color: COLORS.black,
        fontFamily: FONT_CONSTANTS.primary_medium_font,
        fontSize: FONT_SIZE_CONSTANTS.heading_size,
        textAlign: 'center',
        marginTop: 30
    }
});

/**
 * 
 * Usage
    <MediaPicker
        visible={handle visibility by passing true/false}
        toggleMediaPicker={() => manage visibility}
        onChange={(media: any) => return selected file details}
        mediaType={pass media type e.g=>photo,video,documents}
        isBase64 =>returning base64 uri
    />
 * 
 */