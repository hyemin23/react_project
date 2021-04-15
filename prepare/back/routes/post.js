const exporess = require("express");
const { isLoggedIn } = require("../middleware/middleware");
const router = exporess();
const { Post, Comment, User, Image } = require("../models");



//로그인 한 사람만 게시글 작성이 가능하도록
router.post("/", isLoggedIn, async (req, res, next) => {

    try {

        //deserialize에서 생상한 req.user로 user 접근 가능
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });

        //console.log("생성된 post 객체는 : ", post);

        //include는 inner join이라고 생각하면 됨
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User, // 댓글 작성자
                    attributes: ['id', 'nickname'],
                }],
            }, {
                model: User, // 게시글 작성자
                attributes: ['id', 'nickname'],
            }]
        });
        res.status(201).json(fullPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});


router.post('/:postId/comment', isLoggedIn, async (req, res, next) => { // POST /post/1/comment
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });
        if (!post) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        const comment = await Comment.create({
            content: req.body.content,
            PostId: parseInt(req.params.postId, 10),
            UserId: req.user.id,
        })
        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }],
        })
        res.status(201).json(fullComment);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
