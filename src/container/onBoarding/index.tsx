import { ImageBackground, StyleSheet, View } from 'react-native'
import React from 'react'
import { AppText } from '../../components/AppText'
import { COMMON_STYLE } from '../../utils/commonStyles'
import { IMAGES } from '../../utils/constants'
import { FONT_CONSTANTS, FONT_SIZE_CONSTANTS } from '../../utils/constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { STRING_CONSTANTS } from '../../utils/constants'
import AppButton from '../../components/AppButton'
import { useNavigation } from '@react-navigation/native'
import { NAVIGATION_CONSTANTS } from '../../utils/constants'
import { COLORS } from '../../utils/constants'

const OnBoarding = () => {

    const { bottom } = useSafeAreaInsets();

    const navigation = useNavigation()

    return (
        <ImageBackground style={[StyleSheet.absoluteFill, COMMON_STYLE.standardPadding]} source={IMAGES.onboard}>
            <View style={[COMMON_STYLE.flex1, styles.content]}>
                <AppText style={styles.title}>{STRING_CONSTANTS.wlcm_to_vani}</AppText>
                <AppText style={styles.info}>{STRING_CONSTANTS.lorem_ipsum}</AppText>
            </View>
            <View style={[COMMON_STYLE.flex1, styles.content, { paddingBottom: 20 + bottom }]}>
                <AppButton
                    label={STRING_CONSTANTS.join_vani_coach}
                    onPress={() => navigation.navigate(NAVIGATION_CONSTANTS.signup_screen as never)}
                />
                <AppText onPress={() => navigation.navigate(NAVIGATION_CONSTANTS.signin_screen as never)} style={[styles.title, styles.login]}>{STRING_CONSTANTS.log_in_instead}</AppText>
            </View>
        </ImageBackground>
    )
}

export default OnBoarding;

const styles = StyleSheet.create({
    title: {
        fontFamily: FONT_CONSTANTS.primary_bold_font,
        fontSize: FONT_SIZE_CONSTANTS.on_boarding_title,
        color: COLORS.app_theme,
        lineHeight: 20,
        textAlign: 'center',
    },
    info: {
        fontFamily: FONT_CONSTANTS.primary_bold_font,
        fontSize: FONT_SIZE_CONSTANTS.desc_size,
        color: COLORS.white_color,
        lineHeight: 20,
        textAlign: 'center',
        marginTop: 40
    },
    content: {
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    login: {
        color: COLORS.white_color,
        fontSize: FONT_SIZE_CONSTANTS.desc_size,
        marginTop: 25
    }
})