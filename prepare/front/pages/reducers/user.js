export const init = {
    isLoggingIn: false, //로그인 시도중     시도중이 true면 로딩창을 띄움
    isLoggingOut: false, //로그아웃 시도중
    isLoggedIn: false,  //로그인 상태
    me: null,
    signUpData: {},
    loginData: {},
}

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";


export const logOutAction = (data) => {
    return {
        type: "LOG_OUT"
    }
}

//리듀서는 함수임
//이전상태와 action을 통해 => 다음 상태를 만들언는 것.
const reducer = (state = init, action) => {
    switch (action.type) {
        case "LOG_IN_REQUEST":
            return {
                ...state
                , isLoggingIn: true
            };

        case "LOG_IN_SUCCESS":
            console.log("SUCCESS들어옴");
            return {
                ...state
                , isLoggingIn: false
                , isLoggedIn: true
                , me: {
                    ...action.data
                    , nickname: "hyemin"
                }
            };

        case "LOG_OUT_REQUEST":
            return {
                ...state
                , isLoggingOut: true
                , me: null
            }
        default:
            return state;
    }
}


export default reducer;