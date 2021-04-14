const exporess = require("express");
const { isLoggedIn } = require("../middleware/middleware");
const router = exporess();
const { Post, Comment, User, Image } = require("../models");



//로그인 한 사람만 게시글 작성이 가능하도록
router.post("/", isLoggedIn, async (req, res, next) => {

    try {

        //deserialize에서 생상한 req.user로 user 접근 가능
        const post = await Post.create({
            content: req.body.content
            , UserId: req.user.id
        });

        //console.log("생성된 post 객체는 : ", post);

        //include는 inner join이라고 생각하면 됨
        const fillPost = await Post.findOne({
            where: { id: post.id }
            , include: [{
                model: Image,
            }
                , {
                model: Comment,
            }
                , {
                model: User
            }]
        });

        //게시글 작성 후 join된 변수로 return
        res.status(201).json(fillPost);


    } catch (error) {
        console.log(error);
        next(error);
    }
});


//로그인 한 사람만 댓글 작성이 가능하도록
router.post("/:postId/comment", isLoggedIn, async (req, res, netx) => {
    try {
        //게시글이 존재하는지 확인
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });

        //게시글이 존재하지 않으면
        if (!post) {
            return res.status(403).send("존재하지 않는 게시글입니다.");
        }

        //동적인 부분은 params 로 접근할 수 있음
        //postId로 접근 여기서는
        const comment = await Comment.create({
            content: req.body.content
            , PostId: req.params.postId
            , UserId: req.user.id
        });

        res.status(200).json(comment);

    } catch (error) {
        console.log(error);
        next(error);
    }
})
module.exports = router;
