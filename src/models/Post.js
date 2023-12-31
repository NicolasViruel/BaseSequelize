const { DataTypes } = require("sequelize");

const Post = (dataBase) =>{
    dataBase.define("Post", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        contents:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};

module.exports = Post;