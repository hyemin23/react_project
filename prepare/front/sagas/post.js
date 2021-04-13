
import React from 'react'

import { all, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import shortid from 'shortid';
import { ADD_POST_FAILURE, ADD_POST_SUCCESS, ADD_POST_REQUEST, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE, generateDummyPost } from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';




function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);

}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchLoadPost() {
    yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}




function* addPost(action) {
    try {
        //const result = yield call(addPostAPI,action.data);
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


function* addComment(action) {
    try {
        // const result = yield call(addCommentAPI, action.data);
        yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: generateDummyPost(10)
        });
    } catch (err) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data,
        });
    }
}


function* loadPosts(action) {

    try {
        yield delay(1000);
        yield put({
            type: LOAD_POSTS_SUCCESS
            , data: generateDummyPost(10)
        });
    } catch (error) {
        yield put({
            type: LOAD_POSTS_FAILURE
            , error: error.response.data
        })
    }
}

//
// function addPostAPI(data) {
//     return axios.post("/api/post", data);
// }

function* postSaga() {
    yield all([

        fork(watchAddPost)
        , fork(watchRemovePost)
        , fork(watchAddComment)
        , fork(watchLoadPost)
    ]);
}


export default postSaga;
