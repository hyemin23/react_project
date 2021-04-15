import axios from 'axios';
import shortId from 'shortid';
import { all, call, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';

import {
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    LIKE_POST_FAILURE,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LOAD_POSTS_FAILURE,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    REMOVE_POST_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    UNLIKE_POST_REQUEST,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function loadPostsAPI(data) {
    return axios.get('/posts');
}

function* loadPosts() {
    try {
        const result = yield call(loadPostsAPI);
        //yield delay(1000);

        yield put({
            type: LOAD_POSTS_SUCCESS,
            // data: generateDummyPost(10),
            data: result.data
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_POSTS_FAILURE,
            data: err.response.data,
        });
    }
}

function addPostAPI(data) {
    console.log("addPostAPI : ", data);
    return axios.post('/post', { content: data });
}

function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data.text);
        //yield delay(1000);
        //const id = shortId.generate();

        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: result.data.id,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data,
        });
    }
}

function removePostAPI(data) {
    return axios.delete('/api/post', data);
}

function* removePost(action) {
    try {
        // const result = yield call(removePostAPI, action.data);
        yield delay(1000);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data,
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: REMOVE_POST_FAILURE,
            data: err.response.data,
        });
    }
}


function addCommentAPI(data) {
    return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
    try {
        const result = yield call(addCommentAPI, action.data);
        //yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response.data,
        });
    }
}


function likeAPI(data) {
    console.log("data", data);
    //이 경우에는 data를 넣지 않아도 됨. 용량만 차지
    return axios.patch(`/post/${data}/like`);
}
/*좋아요 saga */
function* like(action) {
    try {

        //result는 server에서 res로 전달해 준 값
        const result = yield call(likeAPI, action.data);
        console.log("result", result);
        yield put({
            type: LIKE_POST_SUCCESS
            , data: result.data
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: LIKE_POST_FAILURE
            , error: error.response.data
        });
    }
}
function* unlike(action) {
    try {
        yield call()
    } catch (error) {
        console.error(error);
    }
}

function* watchLoadPosts() {
    yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchLike() {
    yield takeLatest(LIKE_POST_REQUEST, like);
}
function* watchUnLike() {
    yield takeLatest(UNLIKE_POST_REQUEST, unlike);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchLoadPosts),
        fork(watchRemovePost),
        fork(watchAddComment),
        fork(watchLike),
        fork(watchUnLike),
    ]);
}