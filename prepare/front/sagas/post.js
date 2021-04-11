
import React from 'react'

import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import shortid from 'shortid';
import { ADD_POST_FAILURE, ADD_POST_SUCCESS, ADD_POST_REQUEST, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE } from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';




function* postSaga() {
    yield all([

        fork(watchAddPost)
        , fork(watchRemovePost)
    ]);
}

// 
function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);

}



function* addPost(action) {
    try {
        //const result = yield call(addPostAPI,action.data);
        console.log("saga add post");
        yield delay(1000);
        const id = shortid.generate();

        yield put({
            type: ADD_POST_SUCCESS
            , data: {
                id
                , content: action.data
            }
        });
        yield put({
            data: id,
            type: ADD_POST_TO_ME
        })
    } catch (error) {
        //에러 객체는 error.response.data 안에 담겨있음
        yield put({
            type: ADD_POST_FAILURE
            , data: error.response.data
        });
    }
}

function* removePost(action) {
    console.log("remove Post saga");
    try {
        yield delay(1000);
        //user,post 액션을 같이 controll 하기 위해
        yield put({
            type: REMOVE_POST_SUCCESS
            , data: action.data
        });
        yield put({
            type: REMOVE_POST_OF_ME
            , data: action.data
        })
    } catch (error) {
        yield put({
            type: REMOVE_POST_FAILURE
            , error: error.response.data
        })
    }
}
//
// function addPostAPI(data) {
//     return axios.post("/api/post", data);
// }


export default postSaga;
