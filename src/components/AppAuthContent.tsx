
/**
 * 
 * This file use to show heading and description for authentication flow
 * 
 */

import { StyleSheet, View } from 'react-native'
import React from 'react'
import { FONT_CONSTANTS, FONT_SIZE_CONSTANTS } from '../utils/constants'
import { AppText } from './AppText'
import { COLORS } from '../utils/constants'
import { AppAuthContentProps } from '../utils/types'

const AppAuthContent = (props: AppAuthContentProps) => {
    return (
        <View style={[styles.main, props?.style]}>
            <AppText style={[styles.headingStyle, props?.headingStyle]}>{props.heading}</AppText>
            <AppText style={[styles.headingStyle, styles.descStyle, props?.descStyle]}>{props?.description || ""}</AppText>
        </View>
    )
}

export default AppAuthContent

const styles = StyleSheet.create({
    main: {
        marginHorizontal: 20
    },
    headingStyle: {
        fontFamily: FONT_CONSTANTS.primary_bold_font,
        color: COLORS.white_color,
        fontSize: FONT_SIZE_CONSTANTS.auth_title_size,
        textAlign: "center"
    },
    descStyle: {
        fontSize: FONT_SIZE_CONSTANTS.desc_size,
        marginTop: 25,
        fontFamily: FONT_CONSTANTS.primary_medium_font,
        lineHeight: 24
    }
})
/**
 * 
 * 
    Usage
    <AppAuthContent
        heading=>pass heading here
        description=>pass description here
    />
 * 
 */