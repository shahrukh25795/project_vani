import { TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import AppTheme from '../../components/appTheme'
import { STRING_CONSTANTS } from '../../utils/constants'
import AppAuthContent from '../../components/AppAuthContent'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { AppInput } from '../../libs/app-input'
import AppButton from '../../components/AppButton'
import { EMAIL_VALIDATION, PASS_VALIDATION } from '../../libs/app-input/validation-rules'
import { dismissKeyboard } from '../../utils/globalFunctions'
import { signInFormData } from '../../data/formData'
import { IMAGES } from '../../utils/constants'
import { COMMON_STYLE } from '../../utils/commonStyles'
import { queryAuthenticateUser } from '../../database/apis'
import { showAlert } from '../../components/mediaPicker/utils'
import { actionCreators } from '../../actions/actionCreators'
import { useDispatch } from 'react-redux'
import { API_CONSTANTS } from '../../utils/constants'

const SignIn = () => {

    //refs
    const passwordRef: any = useRef<TextInput>(null);

    // useForm hook and set default behavior/values
    const { ...methods } = useForm({
        mode: 'all',
        defaultValues: { ...signInFormData() },
        reValidateMode: 'onBlur',
    });

    const dispatch = useDispatch();

    const [isSecure, setIsSecure] = useState<any>(true);

    const onSubmit: SubmitHandler<any> = (data) => {
        dismissKeyboard();
        queryAuthenticateUser(data).then((res: any) => {
            if (res?.status == 200) {
                if (res?.data) {
                    dispatch(actionCreators.loginSuccess(res?.data));
                } else {
                    showAlert(STRING_CONSTANTS.email_not_registered)
                }
            }
        })
    };

    return (
        <AppTheme
            showHeader
            isScrollView
            HeaderProps={{
                title: STRING_CONSTANTS.signin
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
                            ref={null}
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
                    label={STRING_CONSTANTS.signin}
                />
            </View>
        </AppTheme>
    )
}

export default SignIn