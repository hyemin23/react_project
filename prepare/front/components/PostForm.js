import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hook/useInput';
import { addPost, ADD_POST_REQUEST } from '../reducers/post';



function PostForm() {
    const { imagePaths, addPostDone } = useSelector((state) => state.post);
    const [text, onChangeText, setText] = useInput("");

    const dispatch = useDispatch();



    const onSubmit = useCallback(() => {
        dispatch({
            type: ADD_POST_REQUEST
            , data: {
                text
            }
        });

    }, [text]);

    //setText부분은 서버단에서 실패했을 경우를 대비해서 
    useEffect(() => {
        //done이 true일 경우에만 텍스트 input창을 초기화 시켜준다.
        if (addPostDone) {
            setText("");
        }
    }, [addPostDone]);

    //이미지 ref를 위해서 선언
    const imageInput = useRef()
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);
    return (
        <Form style={{ margin: "10px 0 20px" }} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="오늘은 어떤일이 있었나요?"
            />
            <div>
                <input type="file" multiple hidden ref={imageInput} />
                <Button>이미지 업로드</Button>
                <Button type="primary" style={{ float: "right" }}
                    htmlType="submit"
                    onClick={onSubmit}
                >짹짹</Button>
            </div>
            <div>
                {/* 이미지 미리보기 부분 */}
                {imagePaths.map((path) => (
                    <div key={path} style={{ display: "inline-block" }}>
                        <img src={path} style={{ width: "200px" }} alt={path} />
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form>
    )
}

export default PostForm;