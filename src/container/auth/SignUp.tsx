import { TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import AppTheme from '../../components/appTheme'
import { NAVIGATION_CONSTANTS, STRING_CONSTANTS } from '../../utils/constants'
import AppAuthContent from '../../components/AppAuthContent'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { AppInput } from '../../libs/app-input'
import { EMAIL_VALIDATION, PASS_VALIDATION, REQUIRED_VALIDATION } from '../../libs/app-input/validation-rules'
import AppButton from '../../components/AppButton'
import { IMAGES } from '../../utils/constants'
import { signUpFormData } from '../../data/formData'
import { dismissKeyboard, getUniqueID } from '../../utils/globalFunctions'
import { COMMON_STYLE } from '../../utils/commonStyles'
import { insertNewData } from '../../database/apis'
import { USERS_SCHEMA } from '../../database/schema'
import { actionCreators } from '../../actions/actionCreators'
import { useDispatch } from 'react-redux'
import { API_CONSTANTS } from '../../utils/constants'
import { useNavigation } from '@react-navigation/native'

const SignUp = () => {

    // Refs
    const lastNameRef: any = useRef<TextInput>(null);
    const emailRef: any = useRef<TextInput>(null);
    const passwordRef: any = useRef<TextInput>(null);

    // useForm hook and set default behavior/values
    const { ...methods } = useForm({
        mode: 'all',
        defaultValues: { ...signUpFormData() },
        reValidateMode: 'onBlur',
    });

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [isSecure, setIsSecure] = useState<any>(true);


    const onSubmit: SubmitHandler<any> = (data) => {
        dismissKeyboard();
        const apiPayload = { ...data, id: getUniqueID() }
        insertNewData(USERS_SCHEMA, apiPayload).then((res: any) => {
            if (res?.status == 200) {
                dispatch(actionCreators.loginSuccess(res?.data));
                navigation.navigate(NAVIGATION_CONSTANTS.dashboard_screen as never);
            }
        });
    };

    return (
        <AppTheme
            showHeader
            isScrollView
            HeaderProps={{
                title: STRING_CONSTANTS.signup
            }}
        >
            <View style={COMMON_STYLE.main}>
                <AppAuthContent
                    heading={STRING_CONSTANTS.wlcm_to_vani}
                    description={STRING_CONSTANTS.lorem_ipsum_short}
                />
                <View style={COMMON_STYLE.content}>
                    <FormProvider {...methods}>
                        <AppInput
                            name={API_CONSTANTS.first_name}
                            label={STRING_CONSTANTS.first_name_label}
                            placeholder={STRING_CONSTANTS.first_name_placeholder}
                            rules={REQUIRED_VALIDATION(STRING_CONSTANTS.first_name_label)}
                            keyboardType='default'
                            returnKeyType='next'
                            onSubmitEditing={() => {
                                lastNameRef.current?.focus();
                            }}
                        />
                        <AppInput
                            ref={lastNameRef}
                            name={API_CONSTANTS.last_name}
                            label={STRING_CONSTANTS.last_name_label}
                            placeholder={STRING_CONSTANTS.last_name_placeholder}
                            rules={REQUIRED_VALIDATION(STRING_CONSTANTS.last_name_label)}
                            keyboardType='default'
                            returnKeyType='next'
                            onSubmitEditing={() => {
                                emailRef.current?.focus();
                            }}
                        />
                        <AppInput
                            ref={emailRef}
                            name={API_CONSTANTS.email}
                            label={STRING_CONSTANTS.email}
                            placeholder={STRING_CONSTANTS.email_placeholder}
                            keyboardType="email-address"
                            rules={EMAIL_VALIDATION}
                            returnKeyType='next'
                            onSubmitEditing={() => {
                                passwordRef.current?.focus();
                            }}
                        />
                        <AppInput
                            ref={passwordRef}
                            keyboardType='default'
                            name={API_CONSTANTS.password}
                            label={STRING_CONSTANTS.password}
                            secureTextEntry={isSecure}
                            placeholder={STRING_CONSTANTS.password_placeholder}
                            rules={PASS_VALIDATION}
                            rightIcon={isSecure ? IMAGES.eye_close : IMAGES.eye_open}
                            rightIconPress={() => setIsSecure((prvState: any) => !prvState)}
                            returnKeyType='done'
                            onSubmitEditing={dismissKeyboard}
                        />
                    </FormProvider>
                </View>
                <View style={{ flex: 1, minHeight: 50 }} />
                <AppButton
                    onPress={methods.handleSubmit(onSubmit as never)}
                    label={STRING_CONSTANTS.signup}
                />
            </View>
        </AppTheme>
    )
}

export default SignUp