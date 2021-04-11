import React from "react";
import ProtoTypes from "prop-types"
import 'antd/dist/antd.css';
import Head from "next/head";
import wrapper from "../store/configureStore";
import withReduxSaga from "next-redux-saga";



//여기서 Component는 index.js의 return 부분이 Componentn로 들어온다.
//즉, index.js의 부모인셈.
//모든 페이지에서 공통적인 애들은 여기에 넣어주면 됨.
//즉 app.js는 pages들의 공통적인 부분이다.
const App = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
            </Head>
            <Component />

        </>

    )
};

App.protoTypes = {
    Component: ProtoTypes.elementType.isRequired,
}

export default wrapper.withRedux(withReduxSaga(App));
