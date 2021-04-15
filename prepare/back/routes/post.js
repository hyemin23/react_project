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
            },
            {
                model: User //좋아요 누른 사람
                , as: "Likers"
                , attributes: ["id"]
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


//좋아요
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => { // PATCH /post/1/like
    try {

        //좋아요가 넘어오면 어떤 게시글에 어떤 유저가 좋아요를 했는지 
        const post = await Post.findOne({
            where: {
                id: req.params.postId
            }

        });

        //좋아요 하려는 게시글이 없는 경우
        if (!post) {
            return res.status(403).send("게시글이 존재하지 않습니다!");
        }

        //관계 메서드가 생김
        //게시글의 좋아요에 userId추가
        await post.addLikers(req.user.id);

        //saga로 data를 날림
        res.json({
            PostId: post.id
            , UserId: req.user.id
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

//싫어요
router.delete("/:postId/like", isLoggedIn, async (req, res, next) => {


    try {
        //해당 게시글이 있는지 확인
        const post = await Post.findOne({
            where: {
                id: req.params.postId
            }
        });

        if (!post) {
            res.status(403).send("게시글이 존재하지 않습니다.");
        }


        //해당 게시글의 좋아요 user를 지운다
        await post.removeLikers(req.user.id);

        res.json({
            PostId: post.id
            , UserId: req.user.id
        });
    } catch (error) {
        console.error(error);
        next(error);
    }

});





module.exports = router;
