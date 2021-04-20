const express = require("express");
const { Post, User, Image, Comment } = require("../models");
const router = express.Router();
//sql injection 대비 시퀄라이즈에서 제공
const { Op } = require("sequelize");

router.get("/", async (req, res, next) => { //GET /posts
    //findAll -> 모든 게시글을 가져온다
    try {

        const where = {};
        console.log("server lastId ", req.query.lastId);
        //초기 로딩이 아닐 떄 lastId 다음 것을 불러와야함
        if (parseInt(req.query.lastId, 10)) {
            where.id = {
                [Op.lt]: parseInt(req.query.lastId, 10)
            }
        }

        //첫 로딩시 게시글들 가져오기
        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC'],
            ],
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }],
            }, {
                model: User
                , as: "Likers"
                , attributes: ["id"]
            }]
        });


        res.status(200).send(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;