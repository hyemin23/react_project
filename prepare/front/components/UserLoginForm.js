import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, Input, message } from "antd";
import Link from 'next/link';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN_REQUEST } from '../reducers/user';

function UserLoginForm() {

    const dispatch = useDispatch();
    const { logInLoading, logInError } = useSelector((state) => state.user);

    const [userInfo, setUserInfo] = useState({
        user_email: ""
        , user_pw: ""
    });

    const onChange = useCallback((e) => {
        const { name, value } = e.target;
        if (name === "user_email") {
            setUserInfo(prev => ({
                ...prev, user_email: value
            }));
        } else {
            setUserInfo(prev => ({
                ...prev, user_pw: value
            }));
        }
    }, [userInfo]);

    const onSubmit = useCallback(() => {
        dispatch({
            type: LOG_IN_REQUEST
            , data: userInfo
        });
    }, [userInfo]);

    useEffect(() => {
        if (logInError) {
            message.warning(logInError);
        }
    }, [logInError]);


    return (
        <FormWrapper onFinish={onSubmit}>
            <div>
                <label htmlFor="user_email">ID</label>
                <br />

                <Input type="text" name="user_email" required onChange={onChange} value={userInfo.user_email} />
                <label htmlFor="user_password">Password</label>
                <Input type="password" name="user_password" value={userInfo.user_pw} required onChange={onChange} />
            </div>
            <ButtonWrapper>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={logInLoading}>
                    로그인
                    </Button>
                <Link href="/signup"><a><Button type="">회원가입</Button></a></Link>
            </ButtonWrapper>
        </FormWrapper>
    )
}


const ButtonWrapper = styled.div`
    margin-top : 10px;
`;

const FormWrapper = styled(Form)`
    padding : 10px;
`;

export default UserLoginForm;
