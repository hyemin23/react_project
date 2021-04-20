import { Button, Form, Input, message } from 'antd';
import React, { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hook/useInput';
import { ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST } from '../reducers/post';



function PostForm() {
    const { imagePaths, addPostDone } = useSelector((state) => state.post);
    const [text, onChangeText, setText] = useInput("");

    const dispatch = useDispatch();

    const onSubmit = useCallback(() => {

        if (!text || !text.trim()) {
            return message.warn("게시글을 작성해주세요.");
        }

        //content와 이미지 같이 업로드
        const formData = new FormData();

        //이미지의 주소만
        imagePaths.forEach((file) => {
            formData.append("image", file);
        });
        formData.append("content", text);

        return dispatch({
            type: ADD_POST_REQUEST
            , data: formData
        });
    }, [imagePaths, text]);

    //setText부분은 서버단에서 실패했을 경우를 대비해서 
    useEffect(() => {
        //done이 true일 경우에만 텍스트 input창을 초기화 시켜준다.
        if (addPostDone) {
            setText("");
        }
    }, [addPostDone]);

    //이미지 ref를 위해서 선언
    const imageInput = useRef();

    //버튼을 클릭하면 ref로 올린 file 숨겨놓은 input 간접 클릭
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const onChangeImages = useCallback((e) => {

        const imageFormData = new FormData();
        // [].forEach.call(e.target.files, (f) => {
        //     imageFormData.append('image', f);
        // });
        Array.from(e.target.files, (file) => {
            imageFormData.append("image", file);
        });

        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        });
    }, []);

    //이미지 삭제
    const onRemoveImage = useCallback((idex) => () => {
        dispatch({
            type: REMOVE_IMAGE
            , data: idex,
        });
    }, []);

    return (
        <Form style={{ margin: "10px 0 20px" }} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="오늘은 어떤일이 있었나요?"
            />
            <div>
                <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages} />
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type="primary" style={{ float: "right" }}
                    htmlType="submit"
                >작성</Button>
            </div>
            <div>
                {/* 이미지 미리보기 부분 */}
                {imagePaths.map((v, i) => (
                    <div key={v} style={{ display: 'inline-block' }}>
                        <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} alt={v} />
                        <div>
                            <Button onClick={onRemoveImage(i)}>제거</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form >
    )
}

export default PostForm;