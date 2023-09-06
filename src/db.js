const {Sequelize} = require("sequelize");
const UserFunc = require("./models/user");
const PostFunc = require("./models/Post");
const PageFunc = require("./models/Page");
//
const user = "postgres";
const pass = "pichones1";
const dbname = "lecture";

//recordar que postgres conecta al puerto 5432
const dataBase = new Sequelize(
    `postgres://${user}:${pass}@localhost:5432/${dbname}`,
    //para que no salgan los textos de default
    { logging: false }
);

UserFunc(dataBase);
PostFunc(dataBase);
PageFunc(dataBase);

console.log(dataBase.models);
//para establecer las relaciones entre los modelos desestructuramos
const { User, Post , Page} = dataBase.models;

//relacion de (1 a varios) Sequelize crea la llave esporanea automaticamente
User.hasMany(Post);
Post.belongsTo(User);

//relacion de (varios a varios), se necesita una tabla intermedia
User.belongsToMany(Page, {through: "UserPage"} );
Page.belongsToMany(User, {through: "UserPage"} );


//mandamos los modelos definidos por la database(que tiene los modelos)
module.exports = { dataBase, ...dataBase.models};