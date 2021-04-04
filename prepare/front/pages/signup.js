import Reaact, { useCallback, useState } from 'react';
import Head from "next/head";
import AppLayout from "./components/AppLayout";
import { Button, Checkbox, Form, Input } from 'antd';
import styled from 'styled-components';
import useInput from './hook/useInput';


const Signup = () => {

    const [id, onChangeId] = useInput("");
    const [nickname, onChangeNickname] = useInput("");
    const [password, onChangePassword] = useInput("");

    //state를 사용한 2차 비밀번호 검증 
    const [passwordCehck, setPasswordCheck] = useState("");
    const [passwordError, setPasswordError] = useState(false);


    //이용약관
    const [term, setTerm] = useState(false);
    const [termError, setTermError] = useState(false);

    //중복 체크 담방하는 함수
    const onchengePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password ? true : false);
    }, [password]);

    const onFinish = () => {
        if (password !== passwordCehck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
    };

    const onChangeTerm = (e) => {
        setTermError(false);
        setTerm(e.target.checked);
    };



    return (
        <>
            <Head>
                <title>회원가입 | NodeBird</title>
            </Head>
            <AppLayout >
                <Form onFinish={onFinish}>
                    <div>
                        <label htmlFor="userId">아이디</label>
                        <br />
                        <Input type="text" name="userId" value={id} required

                            onChange={onChangeId}
                        />
                    </div>
                    <div>
                        <label htmlFor="nickname">닉네임</label>
                        <br />
                        <Input type="text" name="nickname" value={nickname} required
                            onChange={onChangeNickname}
                        />
                    </div>


                    <div>
                        <label htmlFor="userPw">비밀번호</label>
                        <br />
                        <Input type="password" name="userPw" value={password} required onChange={onChangePassword} />
                    </div>
                    <div>
                        <label htmlFor="userChekPw">비밀번호 확인</label>
                        <br />
                        <Input type="password" name="userChekPw" value={passwordCehck} required onChange={onchengePasswordCheck} />
                        {passwordError &&
                            <ErrorMessage>
                                <span>비밀번호가 일치하지 않습니다.</span>
                            </ErrorMessage>


                        }
                    </div>
                    <div>
                        <Checkbox name="user_term" checked={term} onChange={onChangeTerm} >약관에 동의 하십니까?</Checkbox>
                        {termError &&
                            <div>
                                <TermMessage>
                                    <span>약관에 동의하셔야 합니다.</span>
                                </TermMessage>
                            </div>}
                    </div>
                    <div>
                        <FormButton type="primary" htmlType="submit">가입하기</FormButton>
                    </div>
                </Form>
            </AppLayout>
        </>

    )
}


const ErrorMessage = styled.div`color : red;`;
const TermMessage = styled.div`color:red`;
const FormButton = styled(Button)`margin-Top : 10px`;

export default Signup;
