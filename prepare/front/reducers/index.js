import { HYDRATE } from "next-redux-wrapper";

import user from "./user";
import post from "./post";
import { combineReducers } from "redux";


//이전상태, 액션 => 다음 상태
//리듀서를 합침
//HYDTATE를 위해서 index reducer를 추가해준다.
// const rootReducer = combineReducers({
//     index: (state = {}, action) => {
//         switch (action.type) {
//             case HYDRATE:
//                 //console.log("하이드레이트 : ", action);
//                 return {
//                     ...state, ...action.payload
//                 };
//             default:
//                 return state;
//         }
//     },
//     user, post,
// });


//이게 combineReducers({user,post})와 같음. 복잡하게 만든거임  
const rootReducer = (state, action) => {
    switch (action.type) {
        //HYDRATE를 이용하여 덮어쓰기 위해서 복잡하게 만듬
        case HYDRATE:
            console.log("HIDRATE", action);
            return action.payload;
        default: {
            console.log("default 리류서 실행");
            const combinedReducer = combineReducers({ user, post });
            return combinedReducer(state, action);
        }
    }
}



export default rootReducer; 