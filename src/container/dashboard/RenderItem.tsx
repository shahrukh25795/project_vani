import { ImageBackground, StyleSheet, View } from 'react-native'
import React from 'react'
import { SCREEN_WIDTH } from '../../utils/globalFunctions'
import { COMMON_STYLE } from '../../utils/commonStyles'
import MediaActionableComponent from './MediaActionableComponent'
import UserInfo from './UserInfo'
import { COLORS } from '../../utils/constants'
import { RenderItemProps } from '../../utils/types'

const RenderItem = (props: RenderItemProps) => {
    return (
        <View style={styles.main}>
            <View style={styles.img}>
                <ImageBackground source={{ uri: props?.data?.image || 'https://source.unsplash.com/900x900/?food' }} style={COMMON_STYLE.width_height_100_percent}>
                    <UserInfo name={props?.data?.user_name || ''} />
                </ImageBackground>
            </View>
            <MediaActionableComponent onPress={props?.onPress} likeCount={props?.data?.like_count || 0} commentCount={props?.data?.comment_count} />
        </View>
    )
}

export default RenderItem

const styles = StyleSheet.create({
    main: {
        width: SCREEN_WIDTH,
        backgroundColor: COLORS.grey,
    },
    img: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH,
        overflow: 'hidden',
    },
})