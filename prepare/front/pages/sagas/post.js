import axios from 'axios';
import React from 'react'
import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import { ADD_POST_FAILURE, ADD_POST_SUCCESS } from '../reducers/post';




function* postSaga() {
    yield all([
        //1.
        fork(watchAddPost)
    ]);
}

// 
function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

// 
function* addPost(action) {
    try {
        //const result = yield call(addPostAPI,action.data);
        yield delay(1000);
        yield put({
            type: ADD_POST_SUCCESS
        });
    } catch (error) {
        //에러 객체는 error.response.data 안에 담겨있음
        yield put({
            type: ADD_POST_FAILURE
            , data: error.response.data
        });
    }
}

//
// function addPostAPI(data) {
//     return axios.post("/api/post", data);
// }


export default postSaga;
