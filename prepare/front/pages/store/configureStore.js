import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "../reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
const configureStore = () => {

    const middlewares = [];

    //개발용 middleware와 배포용 middleware는 다름
    const enhancer = process.env.NODE_ENV === "production" ? compose(applyMiddleware(...middlewares)) : composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(rootReducer, enhancer);
    return store;
}

const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
