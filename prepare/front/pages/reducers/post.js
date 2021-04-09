export const init = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: '제로초',
        },
        content: '첫 번째 게시글,갓데밋, #갓데밋,#갓쿠,#렌 고 투#ㅋ',
        Images: [{
            src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
        }, {
            src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
        }, {
            src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
        }],
        Comments: [{
            User: {
                nickname: 'nero',
            },
            content: '우와 개정판이 나왔군요~',
        }, {
            User: {
                nickname: 'hero',
            },
            content: '얼른 사고싶어요~',
        }]
    }],
    imagePaths: [],
    addPostLoading: false,
    addPostDone: false,
    addPostError: null
};


const dummyPost = {
    id: 2,
    content: '더미데이터입니다.',
    User: {
        id: 1,
        nickname: '제로초',
    },
    Images: [],
    Comments: [],
};
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


const reducer = (state = init, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            return {
                ...state
                ,
            }
        case ADD_POST_SUCCESS:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts], //앞에다가 더미데이타 추가를 함 그래야 게시글 위에 올라가서 반복문으로 내려오는 구조
                postAdded: true
            }
        case ADD_POST_FAILURE:
            return {

            }
        default:
            return state;
    }

}

export default reducer;