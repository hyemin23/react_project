const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Post } = require('../models');

const router = express.Router();

//custom module을 가져다 씀
const { isLoggedIn, isNotLoggedIn } = require("../middleware/middleware");


//로그인 & 사용자 불러오기
router.get('/', async (req, res, next) => { // GET /user
    console.log("헤더 정보는 아래와 같습니다.");
    console.log(req.headers);

    try {
        //req에 담긴 user는 미들웨어에거 전해줌 
        //새로고침 할 때 마다 쿠키에 남아있는 정보로 로그인이 유지되게끔 만들어줌
        //단, 로그인을 안 한 상태라면 req.user에서 error가 발생할 것임.
        if (req.user) {
            //join으로 사용자 정보와 관련된 게시글,팔로워들 가져오기
            const fullUserWithoutPassword = await User.findOne({
                where: { id: req.user.id },
                attributes: {
                    exclude: ["password"]
                },
                include: [{
                    model: Post
                    , attributes: ["id"]

                }, {
                    model: User
                    , as: "Followings"
                    , attributes: ["id"]
                }, {
                    model: User
                    , as: "Followers"
                    , attributes: ["id"]
                }]
            });
            res.status(200).json(fullUserWithoutPassword);
        } else {
            res.status(200).json(null);
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
});

//특정 사용자 정보 가져오는 라우터 
router.get("/:id", async (req, res, next) => {
    try {
        console.log("사용자 정보 가져오는 라우터 등장", req.params.id);

        const fullUserWithoutPassword = await User.findOne({
            where: { id: req.params.id },
            attributes: {
                exclude: ['password']
            },
            include: [{
                model: Post,
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followings',
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followers',
                attributes: ['id'],
            }]
        });

        if (fullUserWithoutPassword) {
            //시퀄라이즈에서 보내준 data 는 json이 아니라 json으로 바꿔줌.
            const data = fullUserWithoutPassword.toJSON();

            //그 data안의 원하는 정보만 빼냄 이유 : 모든 정보들이 보내지면 위험
            data.Posts = data.Posts.length;
            data.Followings = data.Followings.length;
            data.Followers = data.Followers.length;

            console.log("갈아끼운 data 들은 ");
            console.log(data);

            res.status(200).json(data);



            return res.status(200).send(data);
        } else {
            return res.status(404).send("존재하지 않는 사용자입니다.");
        }

    } catch (error) {
        console.error(error);
        next(error);
    }
});

//로그인 라우터
//isNotLoggedIn 미들웨어가 통과되어야 다음 미들웨어가 동작함.
//즉, 로그인을 하지 않은 경우에만 로그인이 가능하게끔 필터링 기능을 거침
router.post('/login', isNotLoggedIn, (req, res, next) => {
    console.log("login server enter")
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log("로그인 에러 1 ", err);
            console.error(err);
            return next(err);
        }
        if (info) {
            console.log("client error");
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if (loginErr) {
                console.error("로그인 에러 2 : ", loginErr);
                return next(loginErr);
            }
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: Post,
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }]
            })
            return res.status(200).json(fullUserWithoutPassword);
        });
    })(req, res, next);
});

//회원가입
//인증받은 사용자 즉 로그인이 안 된 사용자여야만 로그인이 가능하게끔 만들어야함
router.post('/', isNotLoggedIn, async (req, res, next) => { // POST /user/
    try {
        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        });
        if (exUser) {
            return res.status(403).send('이미 사용 중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        res.status(201).send('ok');
    } catch (error) {
        console.error(error);
        next(error); // status 500
    }
});

router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
});


//팔로우 하기
router.patch("/:userId/follow", isLoggedIn, async (req, res, next) => {
    try {
        //팔로잉 할 수 있는 유저인지 먼저 조회
        const user = await User.findOne({
            where: {
                id: req.params.userId
            }
        });

        //유저가 존재하지 않으면 유령 회원임
        if (!user) {
            return res.status(403).send("존재하지 않는 회원입니다.");
        }

        //찾은 user에게 현재 로그인한 (나)를 팔로워에 추가
        await user.addFollowers(req.user.id);

        res.status(200).json({
            UserId: parseInt(req.params.userId)
        });
    } catch (error) {
        console.error(error)
        next(error);
    }
});


//언팔로잉 하기
router.delete("/:userId/follow", isLoggedIn, async (req, res, next) => {

    try {
        //팔로잉 할 수 있는 유저인지 조회
        const user = await User.findOne({
            where: {
                id: req.params.userId
            }
        });

        //유저가 존재하지 않으면
        if (!user) {
            return res.status(403).send("존재하지 않는 회원입니다.");
        }

        //팔로워 테이블에서 연결관계를 끊음
        await user.removeFollowers(req.user.id);
        res.status(200).send({
            UserId: parseInt(req.params.userId)
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
});

//팔러워한 사람 차단하기
//userId : 나를 팔로우한 유저 id
router.delete("/follower/:userId", isLoggedIn, async (req, res, next) => {
    try {
        //나를 팔로우 한 user 찾기
        const user = await User.findOne({
            where: {
                id: req.params.userId
            }
        });

        if (!user) {
            //팔로워 한 유저가 없음
            return res.status(403).send("팔로우한 유저가 없습니다!");
        }

        //나를 팔로우한 유저의 팔로잉 목록에서 내 아이디 제거
        await user.removeFollowings(req.user.id);

        return res.status(200).send({
            UserId: parseInt(req.params.userId)
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
});


//팔로워 리스트 가져오기
router.get("/followers", isLoggedIn, async (req, res, next) => {
    try {

        //먼저 유저 조회
        const user = await User.findOne({ where: { id: req.user.id } });

        if (!user) {
            return res.status(403).send("유저가 존재하지 않습니다.");
        }

        const followers = await user.getFollowers();

        console.log("찾은 follwers : ", followers);

        return res.status(201).send(followers);


    } catch (error) {
        console.error(error);
        next(error);
    }
});

//팔로잉 리스트 가져오기
router.get("/followings", isLoggedIn, async (req, res, next) => {
    try {

        //먼저 유저 조회
        const user = await User.findOne({ where: { id: req.user.id } });

        if (!user) {
            return res.status(403).send("유저가 존재하지 않습니다.");
        }

        const followings = await user.getFollowings();
        console.log("찾은 팔로잉 목록 : ", followings);

        return res.status(201).send(followings);


    } catch (error) {
        console.error(error);
        next(error);
    }
});


//닉네임 변경
router.patch("/nickname", isLoggedIn, async (req, res, next) => {
    try {

        const result = await User.update({
            nickname: req.body.nickname
        }, {
            where: {
                id: req.user.id
            }
        });

        //닉네임 변경
        if (result === 1) {
            res.status(200).send({ nickname: req.body.nickname });
        } else {
            res.status(500).send("닉네임 변경 오류");
        }

    } catch (error) {
        console.error(error);
        next(error);
    }
});
module.exports = router;