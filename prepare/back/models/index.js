const Sequelize = require("sequelize");
const comment = require('./comment');
const hashtag = require('./hashtag');
const image = require('./image');
const post = require('./post');
const user = require('./user');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};
//node와 mysql을 연결할 수 있도록 도와줌

const sequelize = new Sequelize(config.database, config.username, config.password, config);

//key,value로 객체 property 추가
db.Comment = comment;
db.Hashtag = hashtag;
db.Image = image;
db.Post = post;
db.User = user;


// Object.keys(db).forEach(modelName => {
//   db[modelName].init(sequelize);
// });

//반복문 돌면서 model과 참조관계 등록
Object.keys(db).forEach(modelName => {
  //참조관계 설정이 존재한다면
  if (db[modelName].associate) {
    //각각의 db객체들(key,이름)들을 돌면서 associate함수 실행하면 참조 관계가 맺어짐
    db[modelName].associate(db);
  }
});



db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;