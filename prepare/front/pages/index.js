import React from 'react';
import { useSelector } from 'react-redux';
import AppLayout from './components/AppLayout';
import PostCard from './components/PostCard';
import PostForm from './components/PostForm';


const Home = () => {
    //로그인 여부
    const { isLoggedIn } = useSelector((state) => state.user);
    //게시글
    const { mainPosts } = useSelector((state) => state.post);
    return (
        <AppLayout>
            {/* 로그인한 사용자만 form이 보임 */}
            {isLoggedIn &&
                <PostForm />
            }

            {mainPosts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}

        </AppLayout>
    )
}


export default Home;