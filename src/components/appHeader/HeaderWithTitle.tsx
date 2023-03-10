

/**
 * 
 * File for managing headers
 * 
 */

import { View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../AppText';
import BackButton from './BackButton';
import { HeaderProps } from '../../utils/types';
import { COMMON_STYLE } from '../../utils/commonStyles';


const HeaderWithTitle = (props: HeaderProps) => {

    const { top } = useSafeAreaInsets();

    return (
        <View style={[COMMON_STYLE.headerView, { height: 70 + top, paddingTop: top }, props?.style]}>
            <BackButton {...props?.backButtonProps} />
            <AppText style={[COMMON_STYLE.headerText, props?.textStyle]}>{props?.title}</AppText>
            {!props?.hideNullView && <View style={COMMON_STYLE.nullView} />}
            {props?.actionComp}
        </View>
    );
};

export default HeaderWithTitle;

/**
 * Usage
 * <backImgSrc
 *      title={pass title here}
 * />
 * 
 */