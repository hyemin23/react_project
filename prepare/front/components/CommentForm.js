import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect } from 'react'
import useInput from '../hook/useInput';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

//댓글 작성 form 
function CommentForm({ post }) {

    //댓글 작성자인지 확인하기 위해서 id 값을 가져옴
    const id = useSelector((state) => state.user.me?.id);
    const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);

    const dispatch = useDispatch();


    const [commentText, onChangeCommentText, setCommentText] = useInput("");


    useEffect(() => {
        if (addCommentDone) {
            setCommentText('');
        }
    }, [addCommentDone]);


    const onSubmit = useCallback(() => {
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id },
        });
    }, [commentText, id]);

    return (
        <Form onFinish={onSubmit}>
            <Form.Item style={{ position: 'relative', margin: 0 }}>
                <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
                <Button
                    style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }}
                    type="primary"
                    htmlType="submit"
                    loading={addCommentLoading}
                >댓글남기기
        </Button>
            </Form.Item>
        </Form>
    )
}
CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
};



export default CommentForm;
