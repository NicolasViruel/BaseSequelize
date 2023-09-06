const { DataTypes } = require("sequelize");

const Page = (dataBase) =>{
    dataBase.define("Page", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        page_name:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
};

module.exports = Page;