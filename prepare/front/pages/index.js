import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { LOAD_POSTS_REQUEST } from '../reducers/post';


const Home = () => {

    const dispatch = useDispatch();

    //초기 data 불러오기
    useEffect(() => {
        dispatch({
            type: LOAD_POSTS_REQUEST,
        });
    }, []);

    //로그인 여부
    const { me } = useSelector((state) => state.user);

    //게시글
    const { mainPosts } = useSelector((state) => state.post);
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