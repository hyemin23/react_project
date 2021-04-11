import shortId from "shortid";

export const init = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: '제로초',
        },
        content: '첫 번째 게시글,갓데밋, #갓데밋,#갓쿠,#렌 고 투#ㅋ',
        Images: [{
            id: shortId.generate(),
            src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
        }, {
            id: shortId.generate(),
            src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
        }, {
            id: shortId.generate(),
            src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
        }],
        Comments: [{
            id: shortId.generate()
            , User: {
                id: shortId.generate(),
                nickname: 'nero',
            },
            content: '우와 개정판이 나왔군요~',
        }, {
            id: shortId.generate(),
            User: {
                id: shortId.generate(),
                nickname: 'hero',
            },
            content: '얼른 사고싶어요~',
        }]
    }],
    imagePaths: [],
    addPostLoading: false,
    addPostDone: false,
    addPostError: null
    , addCommentLoading: false
    , addCommentDone: false
    , addCommentError: null
};


const dummyComment = (data) => ({
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: '제로초',
    },
});
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

//액션 객체 생성
export const addPost = (data) => ({
    type: ADD_POST_REQUEST
    , data
});
export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST
    , data
})

const dummyPost = (data) => ({
    id: data.id,
    content: data.text,
    User: {
        id: 1,
        nickname: '혜민이가 씁니다',
    },
    Images: [],
    Comments: data
});

const reducer = (state = init, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            console.log("ADD POST REQUEST");
            return {
                ...state
                , addPostLoading: true
                , addPostDone: false
                , addPostError: null
            }
        case ADD_POST_SUCCESS:
            console.log("ADD_POST_SUCCESS");
            console.log(action.data);
            return {
                ...state,
                addPostLoading: false
                , addPostDone: true,
                mainPosts: [dummyPost(action.data), ...state.mainPosts], //앞에다가 더미데이타 추가를 함 그래야 게시글 위에 올라가서 반복문으로 내려오는 구조
                postAdded: true
            }
        case ADD_POST_FAILURE:
            return {

            }
        case ADD_COMMENT_REQUEST:
            return {

            }
        case ADD_COMMENT_SUCCESS:
            return {

            }
        case ADD_COMMENT_FAILURE:
            return {

            }
        default:
            return state;
    }

}

export default reducer;