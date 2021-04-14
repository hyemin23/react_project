const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { User } = require("../models");
const bcryt = require("bcrypt");

module.exports = () => {
    console.log("local passport들s어옴!ssdasdasdasdsdsdddsds!");
    passport.use(new LocalStrategy({
        usernameField: "user_email"
        , passwordField: "user_pw"
    }, async (email, password, done) => {
        //비동기는 에러를 대비해서 try로 감싸주기
        try {
            const user = await User.findOne({
                where: { email }
            });

            console.log("user정보 : ", user.password);
            //사용자 조회
            if (!user) {
                //1번째 : server error
                //2번째 : 성공
                //3번째 : client error 보내는 츠겡서 잘못 보냈을 경우
                return done(null, false, { reason: "존재하지 않는 이메일입니다!" })
            }

            //비밀번호 compare는 비동기 함수
            //사용자 입력 비밀번호, db에 저장되어있는 비밀번호
            const result = await bcryt.compare(password, user.password);
            console.log(result);
            if (result) {
                console.log("비밀번호 대조 성공 로그인");
                return done(null, user);
            }
            return done(null, false, { reason: "비밀번호가 틀렸습니다." });
        } catch (error) {
            console.log("local 서버 에러 : ", error);
            return done(error);
        }

    }));
}
