import React from 'react'
import { all, delay, fork, put, takeLatest } from 'redux-saga/effects'
import {
    LOG_IN_REQUEST, LOG_OUT_REQUEST, LOG_IN_FAILURE
    , LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_SUCCESS, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE
} from '../reducers/user';


//1
function* userSaga() {
    yield all([
        //비동기적으로 작동 두개 한번에 실행
        fork(watchLogIn)
        , fork(watchLogOut)
        , fork(watchFollow)
        , fork(watchUnFollow)
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

//signup
function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);

}

function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);

}

function* watchUnFollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* unfollow(action) {
    try {
        yield (1000);
        yield put({
            type: UNFOLLOW_SUCCESS
            , data: action.data
        })
    } catch (error) {
        yield put({
            type: UNFOLLOW_FAILURE
        })
    }
}

function* follow(action) {
    try {
        yield (1000);
        yield put({
            type: FOLLOW_SUCCESS
            , data: action.data
        });

    } catch (error) {
        yield put({
            type: FOLLOW_FAILURE
        })
    }
}

function* signUp(action) {
    try {
        yield delay(1000);
        yield put({
            type: SIGN_UP_SUCCESS
        });
    } catch (error) {
        yield put({
            type: SIGN_UP_FAILURE
            , error: error.response.data
        });
    };
}


//dispatch 처럼 action을 가짐
// 2.
function* logIn(action) {
    try {
        //1초안에 재버튼 누르면 무시
        yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS
            , data: action.data
        });

    } catch (error) {
        yield put({
            type: LOG_IN_FAILURE
            , error: error.response.data
        })
    }
}

function* logOut(action) {
    try {
        yield delay(1000);
        yield put({
            type: LOG_OUT_SUCCESS
        });
    } catch (error) {
        yield put({
            type: LOG_OUT_FAILURE
            , error: error.response.data
        });
    }
}



export default userSaga;
