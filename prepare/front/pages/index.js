import { message } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';


const Home = () => {

    const dispatch = useDispatch();
    const { mainPosts, hasMorePosts, loadPostsLoading, removePostDone, removePostLoading } = useSelector((state) => state.post);

    //로그인 여부
    const { me } = useSelector((state) => state.user);

    //초기 data & 로그인 정보를 쿠키를 통해 불러오기
    useEffect(() => {
        dispatch({
            type: LOAD_MY_INFO_REQUEST
        });
        dispatch({
            type: LOAD_POSTS_REQUEST,
        });
    }, []);

    useEffect(() => {
        function onScroll() {
            if ((window.scrollY + document.documentElement.clientHeight) > document.documentElement.scrollHeight - 500) {
                if (hasMorePosts && !loadPostsLoading) {
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMorePosts, loadPostsLoading]);


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


export default Home;