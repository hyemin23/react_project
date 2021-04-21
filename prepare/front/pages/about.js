import { Card } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import { LOAD_USER_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import Head from "next/head";

const About = () => {

    const { userInfo } = useSelector((state) => state.user);
    console.log(userInfo);
    return (
        <AppLayout>
            <Head>
                <title>Hyemin | ReactProject</title>
            </Head>
            {userInfo ? (
                <Card
                    actions={[
                        <div key="twit">
                            게시글
                             <br />
                            {userInfo.Posts}
                        </div>,
                        <div key="following">
                            팔로잉
                            <br />
                            {userInfo.Followings}
                        </div>
                        , <div key="follower">
                            팔로워
                            <br />
                            {userInfo.Followers}
                        </div>,
                    ]}
                >
                    <Card.Meta
                        avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                        titile={userInfo.nickname}
                        description="리액트 프로젝트"
                    />
                </Card>
            ) : null}
        </AppLayout >
    );
};

//getServerSideProps와는 다른 Props이다.
export const getStaticProps = wrapper.getStaticProps(async (context) => {

    //특정 사용자의 정보를 가져오기
    context.store.dispatch({
        type: LOAD_USER_REQUEST
        , data: 5,
    });


    //여긴 사용 방법이라 외워야함
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});


export default About;
