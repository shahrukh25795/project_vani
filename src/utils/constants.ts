
const primary_font = "GreycliffCF";

export enum ACTION_CONSTANTS {
    TYPE = "type",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
}

export const API_CONSTANTS = {
    data_key: 'data',
    token_key: 'token',
    access_token_key: 'access',
    refresh_token_key: 'refresh',
    user_data_key: 'user',
    first_name: 'first_name',
    last_name: 'last_name',
    email: 'email',
    password: 'password',
    type: 'type'
}

export const APP_CONSTANTS = {
    device_android: "android",
    device_ios: "ios",
    user: 'user',
    token: 'token',
    access: 'access',
    refresh: 'refresh',
    data: 'data',
    enable_loader: 'enable_loader'
}

export const COLORS = {
    white_color: "#FFFFFF",
    transparent: 'transparent',
    black: '#000000',
    yellow: '#FFD800',
    app_theme: '#DA5B33',
    app_bg: '#000000',
    light_gray: '#F2F2F2',
    red: '#FF3F3F',
    grey: '#BDBDBD',
    black_rgba: (alpha: any) => `rgba(0,0,0,${alpha})`,
    white_rgba: (alpha: any) => `rgba(242,242,242,${alpha})`,
    red_rgba: (alpha: any) => `rgba(255, 63, 63, ${alpha})`,
}

export const IMAGES = {
    back_arrow: require('../assets/images/back_arrow.png'),
    camera: require('../assets/images/camera.png'),
    gallery: require('../assets/images/gallery.png'),
    onboard: require('../assets/images/onboard.jpg'),
    close: require('../assets/images/close-small.png'),
    eye_close: require('../assets/images/eye_close.png'),
    eye_open: require('../assets/images/eye_open.png'),
    post: require('../assets/images/post.png'),
    send: require('../assets/images/send.png'),
}


export const FONT_CONSTANTS = {
    primary_regular_font: `${primary_font}-Regular`,
    primary_medium_font: `${primary_font}-Medium`,
    primary_bold_font: `${primary_font}-Bold`,
};

export const FONT_SIZE_CONSTANTS = {
    desc_size: 14,
    on_boarding_title: 22,
    auth_title_size: 18,
    label_size: 12,
    heading_size: 16
};

export const NAVIGATION_CONSTANTS = {

    // Stacks
    authorised_stack: 'authorised_stack',
    unauthorised_stack: 'unauthorised_stack',

    // Individual
    signin_screen: "signin_screen",
    onboarding_screen: "onboarding_screen",
    signup_screen: "signup_screen",
    dashboard_screen: "dashboard_screen",
    message_screen: "message_screen",
};

export const STRING_CONSTANTS = {

    // Permission related strings
    app_name: 'Vani Coach',
    permission_required_text: "Permission Required!",
    settings_text: "Settings",
    cancel_text: "Cancel",
    gallery_permission_text: "To access Gallery please provide the Permission",
    location_permission_text: "To access your current location please provide the Permission",
    camera_permission_text: "To access Camera please provide the Permission",
    notification_permission_text: "To get Notifications please provide the Permission",
    no_camera_text: "Camera cannot be accessed on this Device",
    no_loc_text: "Location cannot be accessed on this Device",
    no_gallery_text: "Gallery cannot be accessed on this Device",
    no_notification_text: "Notifications is not supported on this Device",
    upload_media: "Upload Media",
    upload: "Upload",
    pick_gallery: "Choose from Gallery",
    gallery: "Gallery",
    camera: "Camera",

    ok_text: "ok",
    to_be_imp: 'To be implemented',
    wlcm_to_vani: 'Welcome to Vani Coach',
    lorem_ipsum: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, alias quod voluptatum esse rerum hic magni ab, recusandae at error quam nemo consequuntur eum quasi dolorum doloremque, voluptatem a vero.',
    lorem_ipsum_short: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    log_in_instead: 'Log In Instead',
    join_vani_coach: 'Join Vani Coach',
    signup: 'Sign Up',
    signin: 'Sign In',
    feeds: 'Feeds',
    required_validation: (name: string) => `${name} is required.`,
    invalid_email_msg: "Please enter valid email address.",
    email_registered_desc: 'Email already registered. Sign In',
    email_not_registered: 'Email not registered',
    email: 'Email',
    password: 'Password',
    invalid_pass_msg: "Password must contain at least eight characters including one number and one letter.",
    first_name_label: 'First Name',
    first_name_placeholder: 'Enter first name.',
    last_name_label: 'Last Name',
    last_name_placeholder: 'Enter last name.',
    email_placeholder: 'Enter email',
    password_placeholder: 'Enter password',
    like: 'Like',
    comment: 'Comment',
    send: 'Send',
    add_media: 'Add Media',
    no_data: 'No Data',
    no_data_message: (message: any) => `Looks like there are no ${message} that match your criteria.😎😳🤗🙂😅😋🙏`,
    message: 'Message',
    comments: 'Comments',
    type_message: 'Type something...'
}