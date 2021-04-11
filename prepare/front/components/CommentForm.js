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
    const { addCommentDone, addCommentLoading } = useSelector((sate) => state.post);

    const dispatch = useDispatch();


    const [commentText, onChangeCommentText, setCommentText] = useInput("");
    const onSubmit = useCallback(() => {


        //변수를 사용한 create 이용
        dispatch({
            type: ADD_COMMENT_REQUEST
            , data: { content: commentText.post, postId: post.id, userId: id }
        });

    }, [commentText], [id]);

    useEffect(() => {
        if (addCommentDone) {
            setCommentText("");
        }
    }, [addCommentDone]);

    return (
        <Form onFinish={onSubmit}>
            <Form.Item style={{ position: "relative", margin: 0 }}>
                <Input.TextArea
                    value={commentText}
                    onChange={onChangeCommentText}
                    rows={4}

                />
                <Button type="primary" htmlType="submit"
                    style={{
                        position: "absolute", right: 0, bottom: -40,
                        zIndex: 1
                    }}
                    loading={addCommentLoading}
                >


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
