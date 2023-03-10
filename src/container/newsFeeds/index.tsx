import { View, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppTheme from '../../components/appTheme'
import { IMAGES, NAVIGATION_CONSTANTS, STRING_CONSTANTS } from '../../utils/constants'
import { COMMON_STYLE } from '../../utils/commonStyles'
import NewsItems from './NewsItems'
import AppNoData from '../../components/AppNoData'
import { AppPressable } from '../../components/AppPressable'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { queryListData } from '../../database/apis'
import { NEWS_FEED_SCHEMA } from '../../database/schema'
import { arrayBufferToBase64 } from '../../utils/globalFunctions'

const NewsFeeds = () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused()

    const [newsfeedList, setNewsFeedList] = useState([]);

    const fetchFeeds = () => {
        queryListData(NEWS_FEED_SCHEMA).then((res: any) => {
            if (res?.status == 200) {
                if (res?.data?.length > 0) {
                    const listData = res?.data?.map((item: any) => {
                        item.image = item.image ? `data:image/jpeg;base64,${arrayBufferToBase64(item?.image)}` : null
                        return item;
                    })
                    setNewsFeedList(listData);
                }
            }
        })
    }

    useEffect(() => {
        if (isFocused) {
            fetchFeeds()
        }
    }, [isFocused])

    return (
        <AppTheme
            showHeader
            HeaderProps={{
                title: STRING_CONSTANTS.news_feeds,
                hideNullView: true,
                actionComp: <AppPressable onPress={() => navigation.navigate(NAVIGATION_CONSTANTS.create_news_feeds_screen as never)} style={[{ width: 25, height: 25, overflow: 'hidden' }]}>
                    <Image source={IMAGES.post} style={COMMON_STYLE.width_height_100_percent} />
                </AppPressable>
            }}
            backgroundStyle={{ paddingHorizontal: 0 }}
            handleBottomNotch={false}
        >
            <View style={COMMON_STYLE.flex1}>
                <FlatList
                    style={COMMON_STYLE.flex1}
                    contentContainerStyle={[COMMON_STYLE.flexGrow1, { paddingBottom: 100, paddingTop: 20 }]}
                    data={newsfeedList}
                    renderItem={({ item }) => <NewsItems data={item} />}
                    keyExtractor={(_, index) => index?.toString()}
                    onEndReachedThreshold={0.2}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<AppNoData message={STRING_CONSTANTS.no_data_message(STRING_CONSTANTS.news_feeds.toLowerCase())} />}
                />
            </View>
        </AppTheme>
    )
}

export default NewsFeeds