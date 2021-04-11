import { all, fork } from "redux-saga/effects";
import userSaga from "./user";
import postSaga from "./post";

export default function* rootSaga() {

    yield all([
        //fork는 비동기 동작 ()안에 있는 것들을 실행한다는 의미
        fork(postSaga),
        fork(userSaga),
    ]);
}