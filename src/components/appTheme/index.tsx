
/**
 * 
 * File for global app BG theme
 * 
 */

import { ScrollView, ScrollViewProps, View, ViewProps } from 'react-native'
import React from 'react'
import { AppThemeType } from '../../utils/types'
import HeaderWithTitle from '../appHeader/HeaderWithTitle'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COMMON_STYLE } from '../../utils/commonStyles'
import { COLORS } from '../../utils/constants'

const AppTheme = ({ isScrollView, handleBottomNotch = true, ...props }: AppThemeType) => {

    const { bottom } = useSafeAreaInsets();

    const Container = isScrollView ? ScrollView : View;

    const parentProps: ScrollViewProps & ViewProps = {};

    if (isScrollView) {
        parentProps.contentContainerStyle = [{ paddingHorizontal: 20, backgroundColor: COLORS.app_bg, flexGrow: 1 }, handleBottomNotch && { paddingBottom: 20 + bottom }, props.backgroundStyle];
        parentProps.style = [COMMON_STYLE.flex1, { backgroundColor: COLORS.app_bg }]
        parentProps.keyboardShouldPersistTaps = "always";
        parentProps.showsVerticalScrollIndicator = false;
    } else {
        parentProps.style = [COMMON_STYLE.background, handleBottomNotch && { paddingBottom: 20 + bottom }, props.backgroundStyle]
    }

    return (
        <>
            {props?.showHeader ? <HeaderWithTitle {...props?.HeaderProps} /> : null}
            <Container {...parentProps}>
                {props?.children}
            </Container>
        </>
    )
}

export default AppTheme

/**
 * Usage
    <AppTheme
        showHeader
        isScrollView
        HeaderProps={{
            title: pass title here
        }}
    >
    {pass children here}
    </AppTheme>
 * 
 */
