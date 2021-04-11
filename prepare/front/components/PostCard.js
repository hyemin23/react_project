import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, List, Popover, Comment } from 'antd'
import React, { useCallback, useState } from 'react'
import PostImages from './PostImages';
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';


function PostCard({ post }) {
    const id = useSelector((state) => state.user.me?.id);
    console.log("postContent : ", post.content);

    //하트 상태
    const [liked, setLiked] = useState(false);

    //댓글 상태
    const [commentFormOpen, setCommentFormOpen] = useState(false);

    const onToggleLike = useCallback(() => {
        setLiked(prev => !prev);
    }, []);
    const onToggleComment = useCallback(() => {
        setCommentFormOpen(prev => !prev);
    }, []);

    return (
        <div>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" />,

                    liked ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
                        :
                        <HeartOutlined key="heart" onClick={onToggleLike} />

                    , <MessageOutlined key="message" onClick={onToggleComment} />
                    , <Popover key="more" content={(
                        <Button.Group>
                            {id && post.User.id === id ? (
                                <>
                                    <Button>수정</Button>
                                    <Button type="danger">삭제</Button>
                                </>
                            ) : <Button>신고</Button>}
                        </Button.Group>
                    )}>
                        <EllipsisOutlined />
                    </Popover>]}
            >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content} />}
                />

            </Card >

            {commentFormOpen && (
                <div>
                    <CommentForm post={post} />
                    <List
                        header={`${post.Comments.length}개의 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    >
                    </List>
                </div>
            )}

        </div >
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        //객체들의 배열
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
}

export default PostCard;
