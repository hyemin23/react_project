import Reaact from 'react';
import Head from "next/head";
import AppLayout from "./components/AppLayout";
import NicknameEditForm from './components/NicknameEditForm';
import FollowList from './components/FollowList';


const Profile = () => {

    const followerList = [{ nickname: "혜민이" }, { nickname: "천재" }, { nickname: "예아스" }];
    const followingList = [{ nickname: "혜민이가팔로잉" }, { nickname: "팔러잉2" }, { nickname: "팔러잉3" }];

    return (
        <>
            <Head><title>내 프로필 | NodeBird</title></Head>
            <AppLayout >
                <NicknameEditForm />
                <followingList header="팔로잉 목록" data={followingList} />
                <FollowList header="팔로워 목록" data={followerList} />
            </AppLayout>
        </>
    )
}

export default Profile;
