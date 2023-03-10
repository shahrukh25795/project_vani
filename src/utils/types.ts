import { ReactNode } from "react";
import { UseControllerProps } from "react-hook-form";
import { ImageResizeMode, ImageSourcePropType, TextStyle, ViewStyle, TextInputProps as RNTextInputProps, } from "react-native";

export type RootStackScreens = {
    Onboarding: undefined;
    Dashboard: undefined;
    MessageAndComment: undefined;
    SignIn: undefined;
    SignUp: undefined;
};

export interface BackButtonProps {
    onBack?: () => void;
    backImgSrc?: ImageSourcePropType;
    style?: ViewStyle;
    resizeMode?: ImageResizeMode
}

export interface HeaderProps {
    title?: string;
    onBack?: () => void;
    hideNullView?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    backButtonProps?: BackButtonProps;
    actionComp?: ReactNode
}

export type AppThemeType = {
    isScrollView?: boolean;
    backgroundStyle?: ViewStyle | ViewStyle[];
    children?: ReactNode;
    showHeader?: boolean;
    HeaderProps?: HeaderProps;
    handleBottomNotch?: boolean;
}

export type MediaType = "doc" | "photo" | "camera" | "video" | "any";

export type MediaPickerProps = {
    visible: boolean;
    toggleMediaPicker: (state: boolean) => void;
    onChange: (medias: Array<ImageSourcePropType>, type?: string) => void;
    isMultiple?: boolean;
    mediaType: MediaType;
    count?: number;
    isBase64?: boolean;
    label?: string;
};

export interface AppAuthContentProps {
    style?: ViewStyle;
    heading: any;
    description?: any;
    headingStyle?: TextStyle;
    descStyle?: TextStyle;
}

export interface AppButtonProps {
    style?: ViewStyle;
    textStyle?: TextStyle
    label: string | null;
    onPress?: () => void;
}

export interface AppModalProps {
    visible: boolean;
    children: ReactNode;
    onDismiss?: () => void;
    onClose?: () => void;
    containerStyle?: ViewStyle;
    showCloseIcon?: boolean
}

export interface AppNoDataProps {
    message?: any
}

export type MediaActionType = 'L' | 'C' | 'S'

export type MediaDataType = {
    label: string;
    type: MediaActionType
}

export interface MediaActionableComponentProps {
    onPress?: (type: MediaActionType) => void;
    likeCount?: number;
    commentCount?: number;
}

export interface RenderItemProps {
    data: any;
    onPress?: (type: MediaActionType) => void;
}

export interface ChatInputProps {
    onSend: (value: any) => void;
    style?: ViewStyle;
    inputFieldStyle?: TextStyle
}

export interface MessageElementProps {
    data: any
}


export interface NewsItemsProps {
    data: any
}

export interface TextInputProps extends RNTextInputProps, UseControllerProps {
    label: string
    name: string
    defaultValue?: string
    rightIcon?: ImageSourcePropType
    rightIconPress?: () => void;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
}
