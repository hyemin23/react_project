import React, { useCallback, useState } from 'react'
import { Button, Form, Input } from "antd";
import Link from 'next/link';
import styled from "styled-components";
import PropTypes from "prop-types";
function UserLoginForm({ setIsLoggedin }) {

    const [userInfo, setUserInfo] = useState({
        user_id: ""
        , user_pw: ""
    });

    const onChange = useCallback((e) => {
        const { name, value } = e.target;
        if (name === "user_id") {
            setUserInfo(prev => ({
                ...prev, user_id: value
            }));
        } else {
            setUserInfo(prev => ({
                ...prev, user_pw: value
            }));
        }
    }, [userInfo]);

    const onSubmit = useCallback(() => {
        setIsLoggedin(true);
    }, [userInfo])


    return (
        <FormWrapper onFinish={onSubmit}>
            <div>
                <label htmlFor="user_id">ID</label>
                <br />
                <Input type="text" name="user_id" required onChange={onChange} value={userInfo.user_id} />
                <label htmlFor="user_password">Password</label>
                <Input type="password" name="user_password" value={userInfo.user_pw} required onChange={onChange} />
            </div>
            <ButtonWrapper>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={false}
                >Login</Button>
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

UserLoginForm.propTypes = {
    setIsLoggedin: PropTypes.func.isRequired
}
export default UserLoginForm;
