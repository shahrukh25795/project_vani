import { StyleSheet, View } from 'react-native'
import React from 'react'
import { AppPressable } from '../../components/AppPressable'
import { AppText } from '../../components/AppText'
import { FONT_CONSTANTS, FONT_SIZE_CONSTANTS } from '../../utils/constants'
import { COLORS } from '../../utils/constants'
import { MediaActionableComponentProps, MediaActionType } from '../../utils/types'
import { mediaData } from '../../data/formData'

const MediaActionableComponent = (props: MediaActionableComponentProps) => {

    const getActiveTextStyle = (type: MediaActionType) => {
        switch (type) {
            case 'L':
                return props.likeCount && styles.activeTextStyle;
                break;

            case 'C':
                return props.commentCount && styles.activeTextStyle
                break;

            default:
                return styles.text
                break;
        }
    }

    const getCount = (type: MediaActionType) => {
        switch (type) {
            case 'L':
                return props.likeCount ? ` + ${props.likeCount}` : ''
                break;

            case 'C':
                return props.commentCount ? ` + ${props.commentCount}` : ''
                break;

            default:
                return ''
                break;
        }
    }

    return (
        <View style={styles.bottomContent}>
            {mediaData.map((item, idx) => {
                return (
                    <AppPressable onPress={() => props?.onPress?.(item.type as never)} key={idx}>
                        <AppText style={{ ...getActiveTextStyle(item.type) }}>{`${item.label} ${getCount(item.type)}`}</AppText>
                    </AppPressable>
                )
            })}
        </View>
    )
}

export default MediaActionableComponent

const styles = StyleSheet.create({
    bottomContent: {
        height: 50,
        width: '100%',
        backgroundColor: COLORS.white_color,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    text: {
        fontFamily: FONT_CONSTANTS.primary_medium_font,
        color: COLORS.black,
        fontSize: FONT_SIZE_CONSTANTS.desc_size
    },
    activeTextStyle: {
        fontFamily: FONT_CONSTANTS.primary_medium_font,
        color: COLORS.app_theme,
        fontSize: FONT_SIZE_CONSTANTS.desc_size
    }
})