import { Image, StyleSheet, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { COMMON_STYLE } from '../../utils/commonStyles'
import { IMAGES } from '../../utils/constants'
import { FONT_CONSTANTS, FONT_SIZE_CONSTANTS } from '../../utils/constants'
import { STRING_CONSTANTS } from '../../utils/constants'
import { AppPressable } from '../../components/AppPressable'
import { COLORS } from '../../utils/constants'
import { ChatInputProps } from '../../utils/types'

const ChatInput = (props: ChatInputProps) => {

    const inputRef = useRef<TextInput>(null);

    const [inputValue, setInputValue] = useState<any>("");

    const handlePress = () => {
        if (!inputValue) return
        props.onSend(inputValue);
        setTimeout(() => {
            setInputValue('')
        }, 200);
    }

    return (
        <View style={[styles.main, props?.style]}>
            <View style={COMMON_STYLE.row_space_between_center}>
                <TextInput
                    keyboardType='default'
                    ref={inputRef}
                    style={[styles.inputField, props.inputFieldStyle]}
                    placeholderTextColor={COLORS.white_color}
                    returnKeyType='done'
                    autoCorrect={false}
                    onChangeText={(text: string) => setInputValue(text)}
                    value={inputValue || ""}
                    onSubmitEditing={handlePress}
                    placeholder={STRING_CONSTANTS.type_message}
                />
                <AppPressable onPress={handlePress} style={styles.send}>
                    <Image source={IMAGES.send} />
                </AppPressable>
            </View>
        </View>
    )
}

export default ChatInput

const styles = StyleSheet.create({
    main: {
        backgroundColor: COLORS.transparent,
        padding: 4,
        borderRadius: 12,
        borderColor: COLORS.white_rgba(0.5),
        borderWidth: 1,
        paddingLeft: 20,
    },
    send: {
        width: 44,
        height: 44,
        overflow: 'hidden',
        borderRadius: 8,
        backgroundColor: COLORS.app_theme,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15
    },
    inputField: {
        flex: 1,
        backgroundColor: COLORS.transparent,
        height: '100%',
        borderColor: 'none',
        color: COLORS.white_color,
        fontFamily: FONT_CONSTANTS.primary_medium_font,
        fontSize: FONT_SIZE_CONSTANTS.desc_size,
    }
})