import React, { useCallback, useState } from 'react'
import { Button, Form, Input } from "antd";
import Link from 'next/link';

function UserLoginForm() {

    const [userInfo, setUserInfo] = useState({
        user_id: ""
        , user_pw: ""
    });

    const onChange = useCallback((e) => {
        const { name, value } = e.target;
        if (name === "user_id") {
            setUserInfo({
                user_id: value,
                user_pw: userInfo.user_pw
            });
        } else {
            setUserInfo({
                user_id: userInfo.user_id,
                user_pw: value
            });

        }
    }, [userInfo]);

    return (
        <Form>
            <div>
                <label htmlFor="user_id">ID</label>
                <br />
                <Input type="text" name="user_id" required onChange={onChange} value={userInfo.user_id} />
                <label htmlFor="user_password">Password</label>
                <Input type="password" name="user_password" value={userInfo.user_pw} required onChange={onChange} />
            </div>
            <div>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={false}
                >Login</Button>
                <Link href="/signup"><a><Button type="">회원가입</Button></a></Link>
            </div>
        </Form>
    )
}

export default UserLoginForm
