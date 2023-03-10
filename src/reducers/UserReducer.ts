import { createReducer } from "../store/utils";
import { ACTION_CONSTANTS, APP_CONSTANTS } from "../utils/constants";
import { setUserData, clearData } from "../utils/storageUtils";

const initialState = {
  [APP_CONSTANTS.user]: {},
};

export default createReducer(initialState, {
  [ACTION_CONSTANTS.LOGIN_SUCCESS](state: any, action: any) {
    let userData = action?.[APP_CONSTANTS.user]
    setUserData(userData);
    return {
      ...state,
      [APP_CONSTANTS.user]: userData,
    };
  },
  [ACTION_CONSTANTS.LOGOUT_SUCCESS]() {
    clearData();
    return initialState;
  },
});
