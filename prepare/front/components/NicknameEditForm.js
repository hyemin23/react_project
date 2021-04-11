import { Form, Input } from 'antd';
import React from 'react';
import styled from "styled-components";
function NicknameEditForm() {
    return (
        <FromWrap>
            <Input.Search addonBefore="닉네임" enterButton="수정" />
        </FromWrap>
    )
}



//{}객체형식으로 버츄얼dom은 === 이걸로 비교하기 때문에 따로 css 작성
const FromWrap = styled(Form)`
    margin-bottom: "20px";
    border : "1px solid #d9d9d9";
    padding : "20px";
`;



export default NicknameEditForm;
