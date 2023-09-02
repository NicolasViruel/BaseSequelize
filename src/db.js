const {Sequelize, DataTypes} = require("sequelize");
const user = "postgres";
const pass = "pichones1";

const dbname = "lecture";
//recordar que postgres conecta al puerto 5432
const dataBase = new Sequelize(
    `postgres://${user}:${pass}@localhost:5432/${dbname}`
);

//definimos el modelo de los registros que vamos a crear
dataBase.define("User", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false, //no podemos dejar en blanco
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    birth:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
});

module.exports = dataBase;