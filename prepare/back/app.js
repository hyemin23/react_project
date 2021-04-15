const express = require('express');
const cors = require('cors');
const path = require('path');

const userRouter = require('./routes/user');
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const db = require('./models');

const app = express();
const passportConfig = require("./passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const morgan = require("morgan");

//환경변수 파일들 가져오기
dotenv.config();
db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    }).catch(console.error);

passportConfig();


//쿠키를 같이 전달하고 싶은 경우에는 
//credentials를 true로 변경해야한다.
//이럴경우 origin을 정확하게 명시해줘야함
//1. origin : true  OR 2.프론트 주소
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));


//app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(morgan("dev")); //front에서 backend로 어떤 요청을 보내는지 파악하기 위해
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false
    , secret: process.env.COOKIE_SECRET

}));
app.use(passport.initialize());
app.use(passport.session());

// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
    console.log('서버 실행 중!');
});