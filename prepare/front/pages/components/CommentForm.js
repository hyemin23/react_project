import { Button, Form, Input } from 'antd';
import React, { useCallback } from 'react'
import useInput from '../hook/useInput';
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';

//댓글 작성 form 
function CommentForm({ post }) {

    //댓글 작성자인지 확인하기 위해서 id 값을 가져옴
    const id = useSelector((state) => state.user.me?.id);

    const [commentText, onChangeCommentText] = useInput("");
    const onSubmit = useCallback(() => {
        console.log("postId와 commentText 내용은 ", post.id + "와" + commentText);

    }, [commentText]);

    return (
        <Form onFinish={onSubmit}>
            <Form.Item style={{ position: "relative", margin: 0 }}>
                <Input.TextArea
                    value={commentText}
                    onChange={onChangeCommentText}
                    rows={4}
                />
                <Button type="primary" htmlType="submit" style={{ position: "absolute", right: 0, bottom: -40 }}>
                    등록
                </Button>
            </Form.Item>
        </Form>
    )
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
}


export default CommentForm;
