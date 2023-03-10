
/**
 * 
 * File for handling back buttons
 * 
 */


import { Image, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { BackButtonProps } from '../../utils/types';
import { IMAGES } from '../../utils/constants';
import { COMMON_STYLE } from '../../utils/commonStyles';
import { AppPressable } from '../AppPressable';
import { COLORS } from '../../utils/constants';

const BackButton = (props: BackButtonProps) => {

    const navigation = useNavigation();

    const handleBack = () => {
        if (props?.onBack) {
            props?.onBack();
            return;
        }
        navigation?.goBack();
    };

    return (
        <AppPressable
            style={[styles.imageWrap, props?.style]}
            onPress={handleBack}>
            <Image
                resizeMode={props.resizeMode || "center"}
                style={COMMON_STYLE.width_height_100_percent}
                source={props?.backImgSrc || IMAGES.back_arrow}
            />
        </AppPressable>
    )
}

export default BackButton

const styles = StyleSheet.create({
    imageWrap: {
        width: 40,
        height: 40,
        backgroundColor: COLORS.transparent,
        borderRadius: 8,
        borderColor: COLORS.white_rgba(0.5),
        borderWidth: 1,
        zIndex: 9
    },
})


/**
 * Usage
 * <BackButton
 *     onBack={handle button press}
 *     backImgSrc={pass image here} 
 * />
 * 
 */