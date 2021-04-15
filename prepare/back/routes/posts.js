const express = require("express");
const { Post, User, Image, Comment } = require("../models");
const router = express.Router();


router.get("/", async (req, res, next) => { //GET /posts
    //findAll -> 모든 게시글을 가져온다
    try {

        //첫 로딩시 게시글들 가져오기
        const posts = await Post.findAll({
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
            }]
        });


        res.status(200).send(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;