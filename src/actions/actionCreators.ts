/**
 * 
 * File for dispatching actions
 * 
 */

import { ACTION_CONSTANTS, APP_CONSTANTS } from "../utils/constants";

export const actionCreators = {
	loginSuccess: function (userData: any) {
		return {
			[ACTION_CONSTANTS.TYPE]: ACTION_CONSTANTS.LOGIN_SUCCESS,
			[APP_CONSTANTS.user]: userData,
		};
	},
	logoutSuccess: {
		[ACTION_CONSTANTS.TYPE]: ACTION_CONSTANTS.LOGOUT_SUCCESS,
	},
};
