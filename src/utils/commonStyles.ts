import { StyleSheet } from "react-native";
import { COLORS } from "./constants";
import { FONT_CONSTANTS, FONT_SIZE_CONSTANTS } from "./constants";

export const COMMON_STYLE = StyleSheet.create({
    flex1: {
        flex: 1
    },
    flexGrow1: {
        flexGrow: 1
    },
    width_height_100_percent: {
        width: '100%',
        height: '100%',
    },
    center_content: {
        justifyContent: "center",
        alignItems: "center",
    },
    RC: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    RFSC: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10
    },
    row_space_between_center: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    //Header style
    headerView: {
        width: '100%',
        backgroundColor: COLORS.app_bg,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    nullView: {
        width: 40,
        height: 40
    },
    headerText: {
        fontFamily: FONT_CONSTANTS.primary_bold_font,
        color: COLORS.white_color,
        fontSize: FONT_SIZE_CONSTANTS.heading_size,
    },
    background: {
        flex: 1,
        backgroundColor: COLORS.app_bg,
        paddingHorizontal: 20
    },
    standardPadding: {
        paddingHorizontal: 20
    },
    media: {
        width: 20,
        height: 20,
        overflow: 'hidden',
        marginLeft: 20
    },

    // auth style
    main: {
        flex: 1,
        paddingTop: 25
    },
    content: {
        marginTop: 45
    },

})
