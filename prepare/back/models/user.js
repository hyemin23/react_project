const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    //model은 대문자 mysql에서는 소문자+s로 테이블이 생성된다 
    //id가 기본적으로 들어있음 mysql에서 자동 증가
    const User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING(30)
            , unique: true          //고유한 값
            , allowNull: false       //필수
        }
        , nickname: {

            allowNull: true
        }
        , password: {
            type: DataTypes.STRING(100)
            , allowNull: true
        }

    }, {
        charset: "utf8",
        collate: "utf8_general_ci" //한글 저장
    });

    User.associate = (db) => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' })
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
    };

    return User;
}

