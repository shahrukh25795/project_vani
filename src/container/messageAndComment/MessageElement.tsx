import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { COMMON_STYLE } from '../../utils/commonStyles'
import { AppText } from '../../components/AppText'
import { FONT_CONSTANTS, FONT_SIZE_CONSTANTS } from '../../utils/constants'
import { COLORS } from '../../utils/constants'
import { MessageElementProps } from '../../utils/types'

const MessageElement = (props: MessageElementProps) => {
    return (
        <View style={[styles.main]}>
            <View style={styles.img}>
                <Image source={{ uri: 'https://source.unsplash.com/900x900/?gym' }} style={COMMON_STYLE.width_height_100_percent} />
            </View>
            <View style={styles.messageWrap}>
                <AppText style={styles.text}>{props.data?.message}</AppText>
            </View>
        </View>
    )
}

export default MessageElement

const styles = StyleSheet.create({
    main: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    img: {
        width: 30,
        height: 30,
        overflow: 'hidden',
        borderRadius: 50
    },
    messageWrap: {
        backgroundColor: COLORS.white_rgba(0.8),
        marginLeft: 15,
        borderRadius: 10,
        maxWidth: '85%',
        padding: 10,
        overflow: 'hidden',
    },
    text: {
        fontFamily: FONT_CONSTANTS.primary_medium_font,
        fontSize: FONT_SIZE_CONSTANTS.desc_size,
        color: COLORS.black,
        lineHeight: 18
    }
})