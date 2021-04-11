
import React from 'react'

import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import { ADD_POST_FAILURE, ADD_POST_SUCCESS, ADD_POST_REQUEST } from '../reducers/post';




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
        console.log("saga add post");
        console.log(action);
        yield delay(1000);
        yield put({
            type: ADD_POST_SUCCESS
            , data: action.data
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
