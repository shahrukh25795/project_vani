import { View } from 'react-native'
import React from 'react'
import { COMMON_STYLE } from '../utils/commonStyles'
import { STRING_CONSTANTS } from '../utils/constants'
import { AppText } from './AppText'
import { AppNoDataProps } from '../utils/types'

const AppNoData = (props: AppNoDataProps) => {
    return (
        <View style={[COMMON_STYLE.flex1, COMMON_STYLE.center_content, { paddingHorizontal: 50 }]}>
            <AppText style={[COMMON_STYLE.headerText, { textAlign: 'center' }]}>{props?.message || STRING_CONSTANTS.no_data}</AppText>
        </View>
    )
}

export default AppNoData