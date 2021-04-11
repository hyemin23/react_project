import { HYDRATE } from "next-redux-wrapper";

import user from "./user";
import post from "./post";
import { combineReducers } from "redux";


//이전상태, 액션 => 다음 상태
//리듀서를 합침
//HYDTATE를 위해서 index reducer를 추가해준다.
const rootReducer = combineReducers({
    index: (state = {}, action) => {
        switch (action.type) {
            case HYDRATE:
                console.log("하이드레이트 : ", action);
                return {
                    ...state, ...action.payload
                };
            default:
                return state;
        }
    },
    user, post,
})


export default rootReducer;