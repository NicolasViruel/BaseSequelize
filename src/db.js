const {Sequelize, DataTypes} = require("sequelize");
const user = "postgres";
const pass = "pichones1";
const User = require("./models/user");
const Post = require("./models/Post");

const dbname = "lecture";
//recordar que postgres conecta al puerto 5432
const dataBase = new Sequelize(
    `postgres://${user}:${pass}@localhost:5432/${dbname}`,
    //para que no salgan los textos de default
    { logging: false }
);

User(dataBase);
Post(dataBase);

console.log(dataBase.models);
//mandamos los modelos definidos por la database(que tiene los modelos)
module.exports = { dataBase, ...dataBase.models};