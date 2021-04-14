const express = require('express');
const cors = require('cors');
const path = require('path');

const userRouter = require('./routes/user');
const db = require('./models');

const app = express();
const passportConfig = require("./passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");

//환경변수 파일들 가져오기
dotenv.config();
db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    }).catch(console.error);

passportConfig();

app.use(cors({
    origin: '*',
    credentials: false,
}));


app.use('/', express.static(path.join(__dirname, 'uploads')));
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

app.get('/user', (req, res) => {
    res.send('helldo express');
});
// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use('/user', userRouter);

app.listen(3065, () => {
    console.log('서버 실행 중!');
});