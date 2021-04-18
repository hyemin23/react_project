import React, { useCallback } from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "../reducers/user";


const FollowButton = ({ post }) => {

    const { me, followLoading, unfollowLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    //팔로잉 목록중에 게시글 id가 팔로잉 목록에 있다면, 팔로잉 하는 사람임
    const isFollowing = me?.Followings.find((v) => v.id === post.User.id);



    //팔로우 버튼을 누르면 팔로잉한 사람인지 부터 확인
    const onClickButton = useCallback(() => {
        //팔로잉한 사람이라면 언팔.
        if (isFollowing) {
            dispatch({
                type: UNFOLLOW_REQUEST
                , data: post.User.id
            })
        } else {
            dispatch({
                type: FOLLOW_REQUEST
                , data: post.User.id
            })
        }
    }, [isFollowing]);

    if (me.id !== post.User.id) {
        return (

            <Button onClick={onClickButton}
                loading={followLoading || unfollowLoading}>
                {isFollowing ? "언팔로우" : "팔로우"}
            </Button>)
    }
    return null;

}
FollowButton.prototype = {
    post: PropTypes.object.isRequired
}

export default FollowButton;