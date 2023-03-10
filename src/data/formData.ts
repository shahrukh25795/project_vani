import { API_CONSTANTS } from "../utils/constants";
import { STRING_CONSTANTS } from "../utils/constants"
import { getUniqueID } from "../utils/globalFunctions";
import { MediaDataType } from "../utils/types";

export const signUpFormData = () => {
    return {
        [API_CONSTANTS.first_name]: '',
        [API_CONSTANTS.last_name]: '',
        [API_CONSTANTS.email]: '',
        [API_CONSTANTS.password]: '',
    }
}

export const signInFormData = () => {
    return {
        [API_CONSTANTS.email]: '',
        [API_CONSTANTS.password]: '',
    }
}

export const mediaData: Array<MediaDataType> = [
    { label: STRING_CONSTANTS.like, type: 'L' },
    { label: STRING_CONSTANTS.comment, type: 'C' },
    { label: STRING_CONSTANTS.send, type: 'S' },
]

export const feedsFormData = () => {
    return {
        id: getUniqueID(),
        image: null,
        like_count: 0,
        comment_count: 0,
        user_name: '',
        user: ''
    }
}