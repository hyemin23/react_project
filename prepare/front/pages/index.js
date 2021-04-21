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
    console.log("서버사이드 렌더링 context : ", context);



    //서버쪽에서 실행되면 context.req라는게 존재 그 안에 headers안에 접근하여 가져옴
    const cookie = context.req ? context.req.headers.cookie : "";

    axios.defaults.headers.Cookie = '';
    //서버쪽에서 쿠키를 공유하면 다른 곳에서도 접속이 이루어지므로 조건 처리를 해줘야함.
    if (context.req && cookie) {
        //axios의 cookie는 대문자 Cookie로 받아야함.
        axios.defaults.headers.Cookie = cookie;
    }





    //원리 : 밑에 dispatch 실행된 부분을 HYDRATE에게 보냄 (리듀서)
    //단,쿠키는 브라우저가 직접 담아주는데 
    //서버사이드 렌더링의 주체는 프론트 서버에서 백엔드 서버로 가기 때문에 브라우저는 개입조차 못 함
    //따라서 쿠키는 우리가 직접 넣어 보내야함. (브라우저가 개입을 못 함)
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST
    });
    context.store.dispatch({
        type: LOAD_POSTS_REQUEST,
    });

    //리퀘스트를 보내고 종료를 신호를 보냄 success를 요청하기 위해서
    //next-redux-wrapper 공식문서에 이렇게 사용하라고 나옴
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();

});

export default Home;