const passport = require("passport");
const local = require("./local");
const { User } = require("../models");
module.exports = () => {
    passport.serializeUser((user, done) => {
        //여기서 user는 req.login을 호출할 때 넘겨주는 user가 들어옴
        //첫 번째 인자는 서버에러 두번째는 성공
        done(null, user.id);
    });


    //여기서 id는 위에 있는 user.id가 전달됨
    //DB에 존재하는 user를 복원을 위해서
    //로그인 성공 후 라우터 실행되기전에 다음 요청부터 매번 먼저 실행이 됨
    //id로부터 사용자 정보를 복구하는 곳
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({
                where: {
                    id
                }
            });
            //req.user에 넣어줌
            done(null, user);
        } catch (error) {
            console.log(error);
            done(error);
        }
    });


    local();
}