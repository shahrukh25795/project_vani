import { combineReducers } from "redux";
import UserReducer from "../reducers/UserReducer";

export default combineReducers(
	Object.assign({
		UserReducer,
	}),
);
