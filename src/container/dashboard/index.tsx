import { FlatList, Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { STRING_CONSTANTS } from '../../utils/constants'
import AppTheme from '../../components/appTheme'
import { COMMON_STYLE } from '../../utils/commonStyles'
import RenderItem from './RenderItem'
import { AppPressable } from '../../components/AppPressable'
import { IMAGES } from '../../utils/constants'
import MediaPicker from '../../components/mediaPicker'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators } from '../../actions/actionCreators'
import { insertNewData, queryListData, updateObjectData } from '../../database/apis'
import { FEEDS_SCHEMA } from '../../database/schema'
import AppNoData from '../../components/AppNoData'
import { feedsFormData } from '../../data/formData'
import { arrayBufferToBase64 } from '../../utils/globalFunctions'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { NAVIGATION_CONSTANTS } from '../../utils/constants'
import { API_CONSTANTS } from '../../utils/constants'
import { MediaActionType } from '../../utils/types'

const Dashboard = () => {

    const dispatch = useDispatch();
    const userData = useSelector((state: any) => state?.UserReducer?.user || null);
    const navigation = useNavigation();
    const isFocused = useIsFocused()

    const [isShowMediaPicker, setIsShowMediaPicker] = useState(false);
    const [feedsList, setFeedsList] = useState([]);

    const handleFeedCreate = (base64Media: any) => {
        const apiPayload: any = { ...feedsFormData() }
        apiPayload.image = base64Media;
        apiPayload.user = userData?.id || '';
        apiPayload.user_name = `${userData?.first_name || ""} ${userData?.last_name || ''}`
        insertNewData(FEEDS_SCHEMA, apiPayload).then((res: any) => {
            if (res?.status == 200) {
                fetchFeeds()
            }
        })
    }

    const fetchFeeds = () => {
        queryListData(FEEDS_SCHEMA).then((res: any) => {
            if (res?.status == 200) {
                if (res?.data?.length > 0) {
                    const listData = res?.data?.map((item: any) => {
                        item.image = `data:image/jpeg;base64,${arrayBufferToBase64(item?.image)}`
                        return item;
                    })
                    setFeedsList(listData);
                }
            }
        })
    }

    const handlePress = (type: MediaActionType, item: any) => {
        if (type === 'L') {
            updateObjectData(FEEDS_SCHEMA, item?.id, 'like_count').then((res: any) => {
                if (res?.status == 200) {
                    fetchFeeds()
                }
            })
            return
        }
        navigation.navigate(NAVIGATION_CONSTANTS.message_screen as never, { [API_CONSTANTS.type]: type, [API_CONSTANTS.data_key]: item } as never)
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
                title: STRING_CONSTANTS.feeds,
                backButtonProps: {
                    style: { borderRadius: 50, overflow: 'hidden' },
                    backImgSrc: { uri: 'https://source.unsplash.com/900x900/?gym' },
                    resizeMode: 'contain',
                    onBack: () => dispatch(actionCreators.logoutSuccess)
                },
                hideNullView: true,
                actionComp: <AppPressable onPress={() => setIsShowMediaPicker((prevState) => !prevState)} style={COMMON_STYLE.media}>
                    <Image source={IMAGES.post} style={COMMON_STYLE.width_height_100_percent} />
                </AppPressable>

            }}
            backgroundStyle={{ paddingHorizontal: 0 }}
            handleBottomNotch={false}
        >
            <View style={COMMON_STYLE.flex1}>
                <FlatList
                    style={COMMON_STYLE.flex1}
                    contentContainerStyle={[COMMON_STYLE.flexGrow1, { paddingBottom: 100 }]}
                    data={feedsList}
                    renderItem={({ item }) => <RenderItem onPress={(type: MediaActionType) => handlePress(type, item)} data={item} />}
                    keyExtractor={(_, index) => index?.toString()}
                    onEndReachedThreshold={0.2}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<AppNoData message={STRING_CONSTANTS.no_data_message(STRING_CONSTANTS.feeds?.toLowerCase())} />}
                />
            </View>
            <MediaPicker
                visible={isShowMediaPicker}
                toggleMediaPicker={() => setIsShowMediaPicker(false)}
                onChange={(media: any) => handleFeedCreate(media?.data)}
                mediaType='photo'
                isBase64
            />
        </AppTheme>
    )
}

export default Dashboard