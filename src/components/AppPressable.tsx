import React from "react";
import { Pressable, PressableProps } from "react-native";

export const AppPressable = ({ style, ...props }: Readonly<PressableProps>) => <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }, style] as never} {...props}>{props.children}</Pressable>
