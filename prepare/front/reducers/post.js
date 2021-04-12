import shortId from "shortid";
import produce from "../utill/produce";
import faker from "faker";

export const init = {
    mainPosts: []
    , imagePaths: []
    , hasMorePosts: true
    , loadPostsLoading: false
    , loadPostsDone: false
    , loadPostsError: null
    , addPostLoading: false
    , addPostDone: false
    , addPostError: null
    , addCommentLoading: false
    , addCommentDone: false
    , addCommentError: null

};

//함수로 빼기
//이유 : 서버에서 불러오는 것을 얘로 대체해주기
export const generateDummyPost = (number) => Array(number).fill().map(() => ({
    id: shortId.generate()
    , User: {
        id: shortId.generate()
        , nickname: faker.name.findName()
    }
    , content: faker.lorem.paragraph()
    , Images: [{
        src: faker.image.image()
    }]
    , Comments: [{
        User: {
            id: shortId.generate()
            , nickname: faker.name.findName()
        },
        content: faker.lorem.sentence(),
    }],
}));


//더이데이터 초기 상태에 함수로 붙여주기
//무한 스크롤링을 사가를 통해 구현하려고.
init.mainPosts = init.mainPosts.concat(generateDummyPost(10));


const dummyComment = (data) => ({
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: '제로초',
    },
});

//초기 data load action
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

//게시글 관련 action
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

//게시글 삭제 관련 action
export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

//게시글 댓글 관련 action
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
    content: data.content.text,
    User: {
        id: 1,
        nickname: '혜민이가 씁니다',
    },
    Images: [],
    Comments: data
});

const reducer = (state = init, action) => {
    return produce(state, (draft) => {
        console.log("daft : ", draft);
        switch (action.type) {
            case LOAD_POSTS_REQUEST:
                draft.loadPostsLoading = true;
                draft.loadPostsDone = false;
                draft.loadPostsError = null
                break;
            case LOAD_POSTS_SUCCESS:
                draft.loadPostsLoading = false;
                draft.loadPostsDone = true;
                draft.mainPosts = action.data.concat(draft.mainPosts)
                draft.hasMorePosts = draft.mainPosts.length < 50;
                break;
            case LOAD_POSTS_FAILURE:
                draft.loadPostsLoading = false;
                draft.loadPostsError = action.error;
                break;
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.addPostLoading = false;
                draft.addPostDone = true;
                //앞에다가 더미데이타 추가를 함 그래야 게시글 위에 올라가서 반복문으로 내려오는 구조
                draft.mainPosts.unshift(dummyPost(action.data));
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;
            case REMOVE_POST_REQUEST:
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;
            case REMOVE_POST_SUCCESS:
                draft.removePostLoading = false;
                draft.removePostDone = true;
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
                break;
            case REMOVE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS:
                const post = draft.mainPosts.find((v) => v.id === action.data.postId);
                console.log("post 리듀서의 post : ", post);

                post.Comments.unshift(dummyComment(action.data.content));
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
            default:
                return state;
        }
    })
}

export default reducer;