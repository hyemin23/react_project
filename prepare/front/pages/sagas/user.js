import React from 'react'
import { all, delay, fork, put, takeLatest } from 'redux-saga/effects'
import { LOG_IN_REQUEST, LOG_OUT_REQUEST } from '../reducers/user';


//1
function* userSaga() {
    yield all([
        //비동기적으로 작동 두개 한번에 실행
        fork(watchLogIn)
        , fork(watchLogOut)
    ]);
}

//일종의 토글 같은 거  event listener
// saga 와, reducer랑 동시에 실행된다.
function* watchLogIn() {
    //액션이 들어오면 뒤에 함수 실행
    yield takeLatest(LOG_IN_REQUEST, logIn);
}
//
function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

//dispatch 처럼 action을 가짐
// 2.
function* logIn(action) {
    try {
        //1초안에 재버튼 누르면 무시
        yield delay(1000);
        yield put({
            type: "LOG_IN_SUCCESS"
            , data: action.data
        });

    } catch (error) {
        yield put({
            type: "LOG_OUT_FAILURE"
            , error: error.response.data
        })
    }
}

function* logOut(action) {
    try {
        yield delay(1000);
        yield put({
            type: "LOG_OUT_SUCCESS"
        });
    } catch (error) {
        yield put({
            type: "LOG_OUT_FAILURE"
            , error: error.response.data
        });
    }
}

export default userSaga;
