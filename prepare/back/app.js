const express = require("express");
const postRouter = require("./routes/postRouter");
const app = express();
//express에 시퀄라이즈 등록을 위해서 선안
const db = require("./models/index");


db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    }).catch(console.error);




app.use('/post', postRouter)


app.listen(3002, () => {
    console.log("서버 실행중!!")
});