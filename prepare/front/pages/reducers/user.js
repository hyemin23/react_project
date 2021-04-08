export const init = {
    user: {
        isLoggedIn: false,
        me: null,
        signUpData: {},
        loginData: {},
    }
}

export const loginAction = (data) => {
    return {
        type: "LOG_IN"
        , data
    }
}
export const logOutAction = (data) => {
    return {
        type: "LOG_OUT"
    }
}

//리듀서는 함수임
//이전상태와 action을 통해 => 다음 상태를 만들언는 것.
const reducer = (state = init, action) => {
    switch (action.type) {
        case "LOG_IN":
            return {
                ...state,
                isLoggedIn: true,
                me: action.data,
            };
        case "LOG_OUT":
            return {
                ...state,
                isLoggedIn: false,
                me: null
            };
        default:
            return state;
    }
}


export default reducer;