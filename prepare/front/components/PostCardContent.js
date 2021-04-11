import React from 'react'
import PropTypes from "prop-types";
import Link from 'next/link';


//해시태그인지 그냥 문자열인지 판단
//split에서는 괄호로 감싸줘야함
//객체 리터럴을 반환하는 경우 소괄호 (화살표함수에서)
const PostCardContent = ({ postData }) => (


    <div>
        {
            postData.split(/(#[^\s#]+)/g).map((v, i) => {
                if (v.match(/(#[^\s#]+)/)) {
                    return (<Link href={`/hash/${v.slice(1)}`} key={i}>
                        <a>{v}</a>
                    </Link>
                    );
                }
                return v;
            })
        }
    </div>
)

PostCardContent.propTypes = {
    postData: PropTypes.string.isRequired
}

export default PostCardContent
