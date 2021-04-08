import axios from 'axios';
import React from 'react'
import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';




function* postSaga() {
    yield all([
        //1.
        fork(watchAddPost)
    ]);
}

// 2
function* watchAddPost() {
    yield takeLatest("ADD_POST_REQUEST", addPost);
}

// 3
function* addPost(action) {
    try {
        //const result = yield call(addPostAPI,action.data);
        yield delay(1000);
        yield put({
            type: "ADD_POST_SUCCESS"
        });
    } catch (error) {
        //에러 객체는 error.response.data 안에 담겨있음
        yield put({
            type: "ADD_POST_FAILURE"
            , data: error.response.data
        });
    }
}

// // 4 
// function addPostAPI(data) {
//     return axios.post("/api/post", data);
// }


export default postSaga;
