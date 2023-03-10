import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { COMMON_STYLE } from '../../utils/commonStyles'
import { AppText } from '../../components/AppText'
import { FONT_CONSTANTS, FONT_SIZE_CONSTANTS } from '../../utils/constants'
import { COLORS } from '../../utils/constants'

const UserInfo = ({ name }: { name: string }) => {
    return (
        <View style={COMMON_STYLE.RFSC}>
            <View style={styles.img}>
                <Image style={COMMON_STYLE.width_height_100_percent} source={{ uri: 'https://source.unsplash.com/900x900/?gym' }} />
            </View>
            <View style={styles.content}>
                <AppText style={styles.name}>{name || ''}</AppText>
                <AppText style={[styles.name, styles.date]}>12 Mar, 2023</AppText>
            </View>
        </View>
    )
}

export default UserInfo

const styles = StyleSheet.create({
    img: {
        width: 40,
        height: 40,
        overflow: 'hidden',
        borderRadius: 50
    },
    content: {
        marginLeft: 10
    },
    name: {
        fontFamily: FONT_CONSTANTS.primary_bold_font,
        fontSize: FONT_SIZE_CONSTANTS.desc_size,
        color: COLORS.white_color,
    },
    date: {
        fontFamily: FONT_CONSTANTS.primary_medium_font,
        fontSize: FONT_SIZE_CONSTANTS.label_size,
        marginTop: 3
    }
})