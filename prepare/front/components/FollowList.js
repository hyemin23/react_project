import { Card, List, Button } from 'antd';
import React from 'react';
import PropTypes from "prop-types";
import { StopOutlined } from "@ant-design/icons";
import { useDispatch } from 'react-redux';
import { REMOVE_FOLLOWER_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';
function FollowList({ header, data }) {

    const dispatch = useDispatch();

    //고차함수 id값을 함수가 함수를 반환함.
    const onCancel = (id) => () => {
        if (header === "팔로잉") {
            return dispatch({
                type: UNFOLLOW_REQUEST
                , data: id
            });
        }

        if (header === "팔로워") {
            //나를 팔로워 하는 사람 제거
            //내 팔로워 목록에서 해당 유저 제거
            return dispatch({
                type: REMOVE_FOLLOWER_REQUEST
                , data: id
            });
        }
    }
    return (
        <List
            style={{ marginBottom: 20 }}
            grid={{ gutter: 4, xs: 2, md: 3 }}
            size="small"
            header={<div>{header}</div>}
            loadMore={<div
                style={{
                    textAlign: "center", margin: "10px 0"
                }}>
                <Button>더보기</Button>
            </div>
            }
            bordered
            dataSource={data}
            renderItem={item => (
                <List.Item style={{ marginTop: 20 }}>
                    <Card actions={[<StopOutlined key="stop"
                        onClick={onCancel(item.id)} />]}>
                        <Card.Meta
                            description={item.nickname}
                        />
                    </Card>
                </List.Item>
            )}
        />


    )
}

FollowList.propTypes = {
    header: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
}
export default FollowList
