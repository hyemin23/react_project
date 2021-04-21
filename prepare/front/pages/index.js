import { message } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';


const Home = () => {

    const dispatch = useDispatch();
    const { mainPosts, hasMorePosts, loadPostsLoading, removePostDone, removePostLoading, retweetError, retweetDone } = useSelector((state) => state.post);
    const { me } = useSelector((state) => state.user);

    useEffect(() => {
        if (retweetError) message.warning(retweetError);
    }, [retweetError]);
    useEffect(() => {
        if (retweetDone) message.success("리트윗 성공");
    }, [retweetDone]);
    //로그인 여부


    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (hasMorePosts && !loadPostsLoading) {
                    const lastId = mainPosts[mainPosts.length - 1]?.id;
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        lastId,
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMorePosts, loadPostsLoading, mainPosts]);


    useEffect(() => {
        if (removePostDone) {
            message.success("게시글이 삭제되었습니다!");
        }
    }, [removePostDone && !removePostLoading]);


    //게시글
    return (
        <AppLayout>
            {/* 로그인한 사용자만 form이 보임 */}
            {me &&
                <PostForm />
            }

            {mainPosts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}

        </AppLayout>
    )
}

//서버사이드 렌더링 서버쪽에서 실행되는 곳
//매개 변수로 context를 받음
//context안에 store가 들어있음

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    console.log('getServerSideProps start');

    console.log(context.req.headers);
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_POSTS_REQUEST,
    });
    context.store.dispatch(END);
    console.log('getServerSideProps end');
    await context.store.sagaTask.toPromise();
});

export default Home;