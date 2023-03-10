/**
 * 
 * File for global app button
 * 
 */

import { StyleSheet } from 'react-native'
import React from 'react'
import { AppText } from './AppText'
import { FONT_CONSTANTS, FONT_SIZE_CONSTANTS } from '../utils/constants'
import { AppPressable } from './AppPressable'
import { COLORS } from '../utils/constants'
import { AppButtonProps } from '../utils/types'

const AppButton = (props: AppButtonProps) => {

    return (
        <AppPressable style={[styles.style, props?.style]} onPress={props?.onPress}>
            <AppText style={[styles.textStyle, props?.textStyle]}>{props.label}</AppText>
        </AppPressable>
    )
}

export default AppButton

const styles = StyleSheet.create({
    style: {
        height: 55,
        width: '100%',
        backgroundColor: COLORS.app_theme,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    textStyle: {
        fontFamily: FONT_CONSTANTS.primary_bold_font,
        fontSize: FONT_SIZE_CONSTANTS.heading_size,
        color: COLORS.white_color,
    },
})

/**
 * Usage
 * <AppButton
 *      label=>pass label here
 * />
 * 
 */