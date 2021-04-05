import { Button, Card } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useCallback } from 'react'
import { useDispatch } from "react-redux";
import { logOutAction } from "../reducers/user";
function UserProfile() {

    const dispatch = useDispatch();

    const onClick = useCallback(() => {
        dispatch(logOutAction());
    }, [])

    return (
        <Card actions={[
            <div key="tit">짹짹<br />8</div>,
            <div key="followings">짹짹<br />3</div>,
            <div key="follwers">짹짹<br />2</div>
        ]}>
            <Card.Meta title="hyemin"
                avatar={<Avatar>ZC</Avatar>}
            />
            <Button onClick={onClick}>로그아웃</Button>
        </Card>
    )
}

export default UserProfile 
