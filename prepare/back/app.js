const express = require('express');
const cors = require('cors');
const path = require('path');

const userRouter = require('./routes/user');
const db = require('./models');

const app = express();
db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);

app.use(cors({
    origin: '*',
    credentials: false,
}));
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/user', (req, res) => {
    res.send('helldo express');
});
// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use('/user', userRouter);

app.listen(3065, () => {
    console.log('서버 실행 중!');
});