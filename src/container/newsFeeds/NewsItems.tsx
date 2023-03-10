import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import { NewsItemsProps } from '../../utils/types'
import { SCREEN_WIDTH } from '../../utils/globalFunctions'
import { COMMON_STYLE } from '../../utils/commonStyles'
import { AppText } from '../../components/AppText'
import { API_CONSTANTS, COLORS, FONT_CONSTANTS, FONT_SIZE_CONSTANTS } from '../../utils/constants'

const NewsItems = (props: NewsItemsProps) => {
    return (
        <View style={styles.main}>
            <View style={styles.img}>
                <Image style={COMMON_STYLE.width_height_100_percent} source={{ uri: props?.data?.image || 'https://source.unsplash.com/900x900/?food' }} />
            </View>
            <View style={styles.content}>
                <AppText style={styles.title}>{props.data?.[API_CONSTANTS.news_title]}</AppText>
                <AppText style={styles.desc}>{props.data?.[API_CONSTANTS.news_description]}</AppText>
            </View>
        </View>
    )
}

export default NewsItems;

const styles = StyleSheet.create({
    main: {
        marginBottom: 10
    },
    img: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH - 150
    },
    content: {
        backgroundColor: COLORS.white_color,
        padding: 20,
    },
    title: {
        fontFamily: FONT_CONSTANTS.primary_bold_font,
        color: COLORS.black,
        fontSize: FONT_SIZE_CONSTANTS.heading_size,
        lineHeight: 18
    },
    desc: {
        fontFamily: FONT_CONSTANTS.primary_medium_font,
        color: COLORS.black,
        fontSize: FONT_SIZE_CONSTANTS.desc_size,
        lineHeight: 18,
        marginTop: 5
    }
})