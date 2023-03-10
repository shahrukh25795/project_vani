import { FlatList, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import AppTheme from '../../components/appTheme';
import { COMMON_STYLE } from '../../utils/commonStyles';
import { STRING_CONSTANTS } from '../../utils/constants';
import MessageElement from './MessageElement';
import AppNoData from '../../components/AppNoData';
import { insertNewData, queryListData, updateObjectData } from '../../database/apis';
import { COMMENTS_SCHEMA, FEEDS_SCHEMA, MESSAGE_SCHEMA } from '../../database/schema';
import ChatInput from './ChatInput';
import { getUniqueID } from '../../utils/globalFunctions';
import { API_CONSTANTS } from '../../utils/constants';
import { MediaActionType } from '../../utils/types';

const MessageAndComment = () => {

    const route: any = useRoute();

    const type: MediaActionType = route.params?.[API_CONSTANTS.type];
    const data = route.params?.[API_CONSTANTS.data_key];
    const schema = type === 'S' ? MESSAGE_SCHEMA : COMMENTS_SCHEMA

    const [allData, setAllData] = useState([]);

    const title = type === 'S' ? STRING_CONSTANTS.message : STRING_CONSTANTS.comments;

    const fetchMessageAndComment = () => {
        queryListData(schema).then((res: any) => {
            if (res?.status == 200) {
                setAllData(res?.data);
            }
        })
    }

    const initiateMessageAndComment = (value: any) => {
        const apiPayload = {
            id: getUniqueID(),
            message: value
        }
        insertNewData(schema, apiPayload).then((res: any) => {
            if (res?.status == 200) {
                fetchMessageAndComment();
            }
        });
        if (type === 'C') {
            updateObjectData(FEEDS_SCHEMA, data?.id, 'comment_count').then((res: any) => { })
            return
        }
    }

    useEffect(fetchMessageAndComment, [])

    return (
        <AppTheme
            showHeader
            HeaderProps={{
                title: title
            }}
        >
            <View style={COMMON_STYLE.flex1}>
                <FlatList
                    style={COMMON_STYLE.flex1}
                    contentContainerStyle={[COMMON_STYLE.flexGrow1, { paddingBottom: 100, paddingTop: 20 }]}
                    data={allData}
                    renderItem={({ item }) => <MessageElement data={item} />}
                    keyExtractor={(_, index) => index?.toString()}
                    onEndReachedThreshold={0.2}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<AppNoData message={type === 'S' ? STRING_CONSTANTS.no_data_message(STRING_CONSTANTS.message.toLowerCase()) : STRING_CONSTANTS.no_data_message(STRING_CONSTANTS.comments.toLowerCase())} />}
                />
                <ChatInput onSend={initiateMessageAndComment} />
            </View>
        </AppTheme>
    )
}

export default MessageAndComment