import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import reducer from "../reducers";

let composeEnhancers = compose;

const loggerMiddleware = createLogger({
	predicate: (getState: any, action: any) => __DEV__,
});

function configureStore(initialState = {}) {
	const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware));
	return createStore(reducer, initialState, enhancer);
}
const store = configureStore();
export default store;
