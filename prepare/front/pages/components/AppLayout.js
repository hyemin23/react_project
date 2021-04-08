import React, { useState } from 'react';
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import UserProfile from './UserProfile';
import UserLoginForm from "./UserLoginForm";
import styled, { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";
import { Global } from './imageZoom/style';
const { Search } = Input;

const AppLayout = ({ children }) => {
    //const [isLoggedin, setIsLoggedin] = useState(false);

    const { isLoggedIn } = useSelector(state => state.user)
    console.log("AppLayout : ", isLoggedIn);
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home">
                    <Link href="/"><a>노드버드</a></Link>
                </Menu.Item>
                <Menu.Item key="profile">
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <SearchInput enterButton style={{ verticalAlign: "middle" }} />
                </Menu.Item>
                <Link href="/signup"><a>회원가입</a></Link>
            </Menu>


            <Row gutter={8}>


                <Col xs={24} md={6}>
                    {isLoggedIn ? <UserProfile /> : <UserLoginForm />}
                </Col >
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="https://2ham-s.tistory.com/" target="_blank" rel="noreferrer noopener">Made by Hyemin</a>
                </Col>

            </Row>



        </div>

    )
}

AppLayout.prototype = {
    children: PropTypes.node.isRequired
}



const SearchInput = styled(Search)`
    vertical-align : "middle";
`;

export default AppLayout;
