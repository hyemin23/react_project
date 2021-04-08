import { Button, Form, Input } from 'antd';
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hook/useInput';
import { addPost } from '../reducers/post';



function PostForm() {
    const { imagePaths } = useSelector((state) => state.post);
    const [text, setText] = useState("");
    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    })
    const dispatch = useDispatch();

    const onSubmit = useCallback(() => {
        dispatch(addPost);
        setText("");
    }, []);


    return (
        <Form style={{ margin: "10px 0 20px" }} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="오늘은 어떤일이 있었나요?"
            />
            <div>
                <input type="file" multiple hidden />
                <Button>이미지 업로드</Button>
                <Button type="primary" style={{ float: "right" }}
                    htmlType="submit"
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