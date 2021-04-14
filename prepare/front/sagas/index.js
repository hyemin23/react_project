import { all, fork } from "redux-saga/effects";
import userSaga from "./user";
import postSaga from "./post";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3065"
//프론트에서는 withCredentioals : true로 보내고
//백엔드에서는  cors에서 설정해주면 된다 
//서로간의 쿠키가 전달됨 그래야.
axios.defaults.withCredentials = true

export default function* rootSaga() {

    yield all([
        //fork는 비동기 동작 ()안에 있는 것들을 실행한다는 의미
        fork(postSaga),
        fork(userSaga),
    ]);
}