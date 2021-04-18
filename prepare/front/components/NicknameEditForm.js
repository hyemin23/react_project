import { Form, Input, message } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import useInput from '../hook/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';
function NicknameEditForm() {

    const { changeNicknameDone } = useSelector((state) => state.user);
    const [nickname, onChangeNickname] = useInput("");
    const dispatch = useDispatch();

    //닉네임 변경
    const onSubmit = useCallback(() => {
        dispatch({
            type: CHANGE_NICKNAME_REQUEST
            , data: nickname
        });

        message.success("닉네임이 변경되었습니다.");
    }, [nickname]);


    return (

        <Form style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }}>
            <Input.Search
                value={nickname}
                onChange={onChangeNickname}
                addonBefore="닉네임"
                enterButton="수정"
                onSearch={onSubmit}
            />
        </Form>


    )
}



//{}객체형식으로 버츄얼dom은 === 이걸로 비교하기 때문에 따로 css 작성
const FromWrap = styled(Form)`
    margin-bottom: "20px";
    border : "1px solid #d9d9d9";
    padding : "20px";
`;



export default NicknameEditForm;
