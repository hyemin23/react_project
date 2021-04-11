export const init = {
    followLoading: false, // 팔로우 시도중
    followDone: false,
    followError: null,
    unfollowLoading: false, // 언팔로우 시도중
    unfollowDone: false,
    unfollowError: null,
    logInLoading: false, // 로그인 시도중
    logInDone: false,   //로그인 됐는지 여부
    logInError: null,
    logOutLoading: false, // 로그아웃 시도중
    logOutDone: false,
    logOutError: null,
    signUpLoading: false, // 회원가입 시도중
    signUpDone: false,
    signUpError: null,
    changeNicknameLoading: false, // 닉네임 변경 시도중
    changeNicknameDone: false,
    changeNicknameError: null,
    me: null,
    signUpData: {},
    loginData: {},
}

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';


const dummyUser = (data) => ({

    ...data
    , nickname: "혜민"
    , id: 1
    , Posts: [{ id: 1 }]
    , Following: [{ nickname: "부기초" }, { nickname: "test1" }, { nickname: "test2" }]
    , Followers: [{ nickname: "부기초" }, { nickname: "test1" }, { nickname: "test2" }]
});

//리듀서는 함수임
//이전상태와 action을 통해 => 다음 상태를 만들언는 것.
const reducer = (state = init, action) => {
    switch (action.type) {
        case LOG_IN_REQUEST:
            return {
                ...state
                , logInLoading: true
                , logInDone: false
                , logInError: null
            };

        case LOG_IN_SUCCESS:
            return {
                ...state
                , logInLoading: false
                , logInDone: true
                , me: dummyUser(action.data)
            };
        case LOG_IN_FAILURE:
            return {
                ...state
                , logInLoading: false
                , logInError: action.error
            }

        case LOG_OUT_REQUEST:
            return {
                ...state
                , logOutLoading: true
                , logOutDone: false
                , logOutError: null
            }
        case LOG_OUT_SUCCESS:
            return {
                ...state,
                logOutLoading: false
                , logOutDone: true
                , me: null
            };
        case LOG_OUT_FAILURE:
            return {
                ...state
                , logOutLoading: false
                , logOutError: action.error
            }
        case SIGN_UP_REQUEST:
            return {
                ...state,
                signUpLoading: true
                , signUpDone: false
                , signUpError: null
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state
                , signUpLoading: false
                , signUpDone: true
            }
        case SIGN_UP_FAILURE:
            return {
                ...state
                , signUpLoading: false
                , signUpError: action.error
            }
        default:
            return state;
    }
}


export default reducer;