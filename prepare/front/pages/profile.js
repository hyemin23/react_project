import React, { useEffect } from 'react';
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useDispatch, useSelector } from 'react-redux';
import Router from "next/router";
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST } from '../reducers/user';



const Profile = () => {

    const { me } = useSelector((stat) => stat.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!(me && me.id)) {
            Router.push("/");
        }
    }, [me && me.id]);

    //팔로우 리스트 가져오기
    useEffect(() => {
        dispatch({
            type: LOAD_FOLLOWERS_REQUEST
        });

        // dispatch({
        //     type: LOAD_FOLLOWINGS_REQUEST
        // })
    }, []);
    //팔로잉 리스트 가져오기

    if (!me) {
        return null;
    }

    return (
        <>
            <Head><title>내 프로필 | NodeBird</title></Head>
            <AppLayout >
                <NicknameEditForm />
                <FollowList header="팔로잉" data={me.Followings} />
                <FollowList header="팔로워" data={me.Followers} />
            </AppLayout>
        </>
    )
}

export default Profile;
