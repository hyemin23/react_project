const exporess = require("express");
const { isLoggedIn } = require("../middleware/middleware");
const router = exporess();
const { Post, Comment, User, Image, Hashtag } = require("../models");
//폴더 생성
const fs = require("fs");

//multer는 router마다 장착을 함
//이유 : 폼마다 이미지가 올라가느냐 안 올라가느냐 차이가 있기 떄문임.
const multer = require("multer");
const path = require("path");

//폴더생성
try {
    fs.accessSync('back/uploads');
} catch (error) {
    console.log('uploads 폴더가 없으므로 생성합니다.');
    fs.mkdirSync('back/uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'back/uploads');
        },
        filename(req, file, done) { // 제로초.png
            const ext = path.extname(file.originalname); // 확장자 추출(.png)
            const basename = path.basename(file.originalname, ext); // 제로초
            done(null, basename + '_' + new Date().getTime() + ext); // 제로초15184712891.png
        },
    }),


});


//로그인 한 사람만 게시글 작성이 가능하도록
//게시글만 존재하고 이미지가 없는 경우
router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {

    try {

        //해시태그 
        const hashtags = req.body.content.match(/#[^\s#]+/g);

        //deserialize에서 생상한 req.user로 user 접근 가능
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });

        //해시 태그 
        //배열 인덱스에 접근해서 인덱스안에 요소들을 잘라버림
        if (hashtags) {
            //create 가 아닌 findOrCreate로 등록한다. 중복 방지를 위해
            // findOrCreate : 없으면 등록하고 있으면 가져옴
            const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
                where: { name: tag.slice(1).toLowerCase() }
            })));
            //result의 결과물의 값으로는 [[노드,true],[리액트,true]] 이런 꼴
            // 첫 번째 값만 저장하기 위해 [0]번째 인덱스로 접근함
            await post.addHashtags(result.map((v) => v[0]));
        }
        //image가 존재하는 경우
        if (req.body.image) {
            //image가 배열 즉, 여러장일 경우
            if (Array.isArray(req.body.image)) {
                //DB에 한 번에 저장하기 위하여 Promise.all사용
                //Image.create는 Promise임.
                const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
                //post 테이블에 저장
                await post.addImages(images);
            }
            //이미지를 한 장만 올리는 경우
            else {
                const image = await Image.create({ src: req.body.image })
                await post.addImages(image);
            }
        }

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



//게시글 삭제
router.delete("/:postId", isLoggedIn, async (req, res, error) => {
    try {

        //시퀄라이즈에서는 제거할 때 destroy를 사용함
        //내가 쓴 게시글을 지우기 위해 

        console.log("게시글 삭제 라우트 들어옴");
        console.log(req.params.postId);
        await Post.destroy({
            where: {
                id: req.params.postId
                , UserId: req.user.id
            }
        });

        res.send({ PostId: req.params.postId });

    } catch (error) {
        console.log(error);
        next(error);

    }
});



//이미지 업로드 multer 사용 여기는 이미지 업로드 후 실행되는 곳
//여러장 : array 
//파일input이 2개씩 있을 때  fills 사용
//한 장 : single
//json or text일경우 none (안 적어도 됨)
router.post("/images", isLoggedIn, upload.array("image"), async (req, res, next) => {
    console.log("files : ", req.files);
    res.json(req.files.map((v) => v.filename));
});



module.exports = router;
