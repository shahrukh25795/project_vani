import React from "react";
import { Text, TextProps } from "react-native";
import { COLORS } from "../utils/constants";

export const AppText =
    ({ style, ...props }: Readonly<TextProps>) => {
        return (<Text style={[{ color: COLORS.black }, style]} {...props} allowFontScaling={false} >{props.children}</Text>)
    }
