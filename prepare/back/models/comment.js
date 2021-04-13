module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Post", {
        content: {
            type: DataTypes.STRING(100)
            , allowNull: false
        }
    }, {
        charset: "utf8mb4"
        , collate: "utf8mb4_general_ci"
    });
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };
    return Comment;
};