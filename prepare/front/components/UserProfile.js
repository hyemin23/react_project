import { Button, Card } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT_REQUEST } from "../reducers/user";
function UserProfile() {


    const dispatch = useDispatch();
    const { me, logOutLoading } = useSelector((state) => state.user);

    const onClick = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST
        });

    }, []);

    return (
        <Card actions={[
            <div key="tit">짹짹<br />{me.Posts.length}</div>,
            <div key="followings">짹짹<br />{me.Followings.length}</div>,
            <div key="follwers">짹짹<br />{me.Followers.length}</div>
        ]}>
            <Card.Meta title={me.nickname}
                avatar={<Avatar>{me.nickname[0]}</Avatar>

                }
            />
            <Button onClick={onClick} loading={logOutLoading}>로그아웃</Button>
        </Card>
    )
}

export default UserProfile 
