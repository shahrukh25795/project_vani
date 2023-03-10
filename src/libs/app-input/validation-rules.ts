import { STRING_CONSTANTS } from "../../utils/constants"

//allow normal validation
export const REQUIRED_VALIDATION = (name: any) => { return { required: STRING_CONSTANTS.required_validation(name) } }

//allow to validate email field
export const EMAIL_VALIDATION = {
    required: STRING_CONSTANTS.required_validation(STRING_CONSTANTS.email),
    pattern: {
        value: /\b[\w\\.+-]+@[\w\\.-]+\.\w{2,4}\b/,
        message: STRING_CONSTANTS.invalid_email_msg,
        required: true,
    },
}

// allow to validate password field
export const PASS_VALIDATION = {
    required: STRING_CONSTANTS.required_validation(STRING_CONSTANTS.password),
    pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/g, //Validating minimum eight characters, at least one letter and one number with optional special characters
        message: STRING_CONSTANTS.invalid_pass_msg,
        required: true,
    }
}