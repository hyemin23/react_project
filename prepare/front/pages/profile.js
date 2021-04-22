import React, { useCallback, useEffect, useState } from 'react';
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useSelector } from 'react-redux';
import Router from "next/router";
import useSWR from "swr";
import axios from 'axios';


//fetcher 가져오기
const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {

    const { me } = useSelector((state) => state.user);
    //더보기 만들어서 3씩 올려주기
    const [followersLimit, setFollowersLimit] = useState(3);
    const [followingsLimit, setFollowingsLimit] = useState(3);
    //const dispatch = useDispatch();

    //useSWR을 사용하기 위해서는 fetcher라는 것이 필요함
    //팔로워,팔로잉 불러오기 불러오기
    const { data: followersData, error: followerError } = useSWR(`http://localhost:3065/user/followers?limit=${followersLimit}`, fetcher);
    const { data: followingsData, error: followingError } = useSWR(`http://localhost:3065/user/followings?limit=${followingsLimit}`, fetcher);

    console.log(!followingsData);
    console.log(!followingsData && followingError);

    useEffect(() => {
        if (!(me && me.id)) {
            Router.push("/");
        }
    }, [me && me.id]);

    const loadMoreFollowers = useCallback(() => {
        setFollowersLimit(prev => prev + 3);
    }, []);
    const loadMoreFollowings = useCallback(() => {
        setFollowingsLimit(prev => prev + 3);
    }, []);


    if (!me) {
        return '내 정보 로딩중 ...';
    }


    //return이 hooks보다 위에 있으면 안됨
    if (followerError || followingError) {
        console.error(followerError || followingError);
        return <div>팔로워/팔로잉 중 에러가 발생했습니다.</div>
    }



    //팔로우 리스트 가져오기
    // useEffect(() => {
    //     dispatch({
    //         type: LOAD_FOLLOWERS_REQUEST
    //     });

    //     //팔로잉 리스트 가져오기
    //     dispatch({
    //         type: LOAD_FOLLOWINGS_REQUEST
    //     });
    // }, []);


    return (
        <>
            <Head><title>내 프로필 | NodeBird</title></Head>
            <AppLayout >
                <NicknameEditForm />
                <FollowList header="팔로잉" data={followersData} onClick={loadMoreFollowers} loading={!followingsData && !followingError} />
                <FollowList header="팔로워" data={followingsData} onClick={loadMoreFollowings} loading={!followersData && !followerError} />
            </AppLayout>
        </>
    )
}

export default Profile;
