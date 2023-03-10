import React, { useState, forwardRef, Ref } from 'react';
import { View, TextInput, StyleSheet, Image, } from 'react-native';
import { useController, useFormContext, } from 'react-hook-form';
import { isIos } from '../../utils/globalFunctions';
import { FONT_CONSTANTS, FONT_SIZE_CONSTANTS } from '../../utils/constants';
import { AppText } from '../../components/AppText';
import { AppPressable } from '../../components/AppPressable';
import { COLORS } from '../../utils/constants';
import { TextInputProps } from '../../utils/types';

const ControlledInput = forwardRef((props: TextInputProps, ref: Ref<TextInput> | undefined,) => {

    const {
        name,
        label,
        rules,
        defaultValue,
        rightIcon,
        rightIconPress,
        ...inputProps
    } = props;

    const formContext = useFormContext();
    const { formState } = formContext;

    const { field } = useController({ name, rules, defaultValue });
    const hasError = Boolean(formState?.errors[name]);

    const [isFocused, setIsFocused] = useState(false);


    const getBorderStyle = () => {
        let color = COLORS.light_gray
        if (isFocused) {
            color = COLORS.yellow
        } else if (hasError) {
            color = COLORS.red
        }
        return { borderColor: color }
    }

    const getValueColor = () => {
        let color = COLORS.white_color;
        if (hasError && !isFocused) {
            color = COLORS.red
        }
        return { color: color }
    }

    const getBgColor = () => {
        let color = COLORS.transparent
        if (hasError && !isFocused) {
            color = COLORS.red_rgba(0.1)
        }
        return { backgroundColor: color }
    }

    return (
        <View style={[styles.container, props?.containerStyle, getBorderStyle(), getBgColor()]}>
            {label && (<AppText style={[styles.label]}>{label}</AppText>)}
            <View style={[styles.inputField]}>
                <TextInput
                    autoCapitalize="none"
                    textAlign="left"
                    style={[styles.input, props?.inputStyle, getValueColor()]}
                    onChangeText={field.onChange}
                    onBlur={() => {
                        setIsFocused(false);
                        field?.onBlur?.()
                    }}
                    onFocus={() => setIsFocused(true)}
                    value={field.value}
                    placeholderTextColor={COLORS.white_color}
                    ref={ref}
                    blurOnSubmit={false}
                    {...inputProps}
                />
                {rightIcon && (
                    <AppPressable style={styles.iconStyle} onPress={rightIconPress}>
                        <Image source={rightIcon} />
                    </AppPressable>
                )}
            </View>
            {hasError && !isFocused &&
                <View style={styles.errorContainer}>
                    <AppText style={styles.error}>{formState?.errors[name]?.message as string}</AppText>
                </View>
            }
        </View>

    );
});

export const AppInput = forwardRef((props: TextInputProps, ref: Ref<TextInput> | undefined) => <ControlledInput ref={ref} {...props} />);


const styles = StyleSheet.create({
    label: {
        color: COLORS.grey,
        fontFamily: FONT_CONSTANTS.primary_medium_font,
        fontSize: FONT_SIZE_CONSTANTS.label_size,
    },
    container: {
        borderWidth: 0.5,
        height: 50,
        paddingHorizontal: 14,
        paddingTop: 4,
        marginBottom: 24,
        borderRadius: 6,
    },
    input: {
        backgroundColor: COLORS.transparent,
        height: '100%',
        width: "100%",
        color: COLORS.white_color,
        fontFamily: FONT_CONSTANTS.primary_medium_font,
        fontSize: FONT_SIZE_CONSTANTS.desc_size,
        flex: 1,
        marginTop: isIos() ? 2 : -8,
        marginLeft: isIos() ? 0 : -3
    },
    inputField: {
        backgroundColor: COLORS.transparent,
        flexDirection: 'row',
    },
    iconStyle: {
        marginTop: isIos() ? -4 : -30,
        alignSelf: "center"
    },
    errorContainer: {
        marginTop: isIos() ? 20 : -8,
    },
    error: {
        color: COLORS.red,
        fontFamily: FONT_CONSTANTS.primary_medium_font,
        fontSize: 10,
    },
});