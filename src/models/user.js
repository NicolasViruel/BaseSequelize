const { DataTypes } = require("sequelize");

const User = (dataBase) => {
  //definimos el modelo de los registros que vamos a crear
  dataBase.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, //no podemos dejar en blanco
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      //para sacar las columnas que me crea por defecto
      timestamps: false,
    }
  );
};

module.exports = User;
