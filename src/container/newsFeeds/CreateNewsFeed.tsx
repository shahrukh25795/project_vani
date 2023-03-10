import { View, TextInput, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import AppTheme from '../../components/appTheme'
import { API_CONSTANTS, COLORS, FONT_CONSTANTS, FONT_SIZE_CONSTANTS, NAVIGATION_CONSTANTS, STRING_CONSTANTS } from '../../utils/constants'
import { COMMON_STYLE } from '../../utils/commonStyles'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { AppInput } from '../../libs/app-input'
import { REQUIRED_VALIDATION } from '../../libs/app-input/validation-rules'
import AppButton from '../../components/AppButton'
import { addNewsFeedFormData } from '../../data/formData'
import { dismissKeyboard, getUniqueID, isIos } from '../../utils/globalFunctions'
import { insertNewData } from '../../database/apis'
import { useNavigation } from '@react-navigation/native'
import { NEWS_FEED_SCHEMA } from '../../database/schema'
import { AppText } from '../../components/AppText'
import { AppPressable } from '../../components/AppPressable'
import MediaPicker from '../../components/mediaPicker'

const CreateNewsFeed = () => {

    // Refs
    const descRef: any = useRef<TextInput>(null);

    // useForm hook and set default behavior/values
    const { ...methods } = useForm({
        mode: 'all',
        defaultValues: { ...addNewsFeedFormData() },
        reValidateMode: 'onBlur',
    });

    const navigation = useNavigation();
    const [media, setMedia] = useState(null)
    const [isShowMediaPicker, setIsShowMediaPicker] = useState(false);

    const onSubmit: SubmitHandler<any> = (data) => {
        dismissKeyboard();
        const apiPayload = { ...data, id: getUniqueID(), image: media }
        insertNewData(NEWS_FEED_SCHEMA, apiPayload).then((res: any) => {
            if (res?.status == 200) {
                navigation.navigate(NAVIGATION_CONSTANTS.news_feeds_screen as never);
            }
        });
    };


    return (
        <AppTheme
            showHeader
            HeaderProps={{
                title: STRING_CONSTANTS.add_news_feeds,
            }}
        >
            <View style={COMMON_STYLE.flex1}>
                <View style={COMMON_STYLE.content}>
                    <FormProvider {...methods}>
                        <AppInput
                            name={API_CONSTANTS.news_title}
                            label={STRING_CONSTANTS.news_feed_title}
                            placeholder={STRING_CONSTANTS.news_feed_title_placeholder}
                            rules={REQUIRED_VALIDATION(STRING_CONSTANTS.news_feed_title)}
                            keyboardType='default'
                            returnKeyType='next'
                            onSubmitEditing={() => {
                                descRef.current?.focus();
                            }}
                        />
                        <AppInput
                            ref={descRef}
                            name={API_CONSTANTS.news_description}
                            label={STRING_CONSTANTS.news_feed_desc}
                            placeholder={STRING_CONSTANTS.news_feed_desc_placeholder}
                            rules={REQUIRED_VALIDATION(STRING_CONSTANTS.news_feed_desc)}
                            keyboardType='default'
                            returnKeyType='done'
                            onSubmitEditing={dismissKeyboard}
                            containerStyle={styles.containerStyle}
                            multiline
                            inputStyle={styles.inputStyle}
                            maxLength={500}
                        />
                    </FormProvider>
                    <AppPressable onPress={() => setIsShowMediaPicker((prevState) => !prevState)} style={styles.addMedia}>
                        <AppText style={styles.text}>{media ? STRING_CONSTANTS.update_media : STRING_CONSTANTS.add_media}</AppText>
                    </AppPressable>
                </View>
                <View style={{ flex: 1, minHeight: 50 }} />
                <AppButton
                    onPress={methods.handleSubmit(onSubmit as never)}
                    label={STRING_CONSTANTS.add_news_feeds}
                />
            </View>
            <MediaPicker
                visible={isShowMediaPicker}
                toggleMediaPicker={() => setIsShowMediaPicker(false)}
                onChange={(media: any) => setMedia(media?.data)}
                mediaType='photo'
                isBase64
            />
        </AppTheme>
    )
}

export default CreateNewsFeed;

const styles = StyleSheet.create({
    containerStyle: {
        height: 100,
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    inputStyle: {
        textAlignVertical: "top",
        height: isIos() ? 75 : 90,
    },
    addMedia: {
        height: 55,
        borderRadius: 10,
        width: '100%',
        borderColor: COLORS.white_rgba(0.5),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    text: {
        fontFamily: FONT_CONSTANTS.primary_bold_font,
        color: COLORS.white_color,
        fontSize: FONT_SIZE_CONSTANTS.desc_size
    }
})