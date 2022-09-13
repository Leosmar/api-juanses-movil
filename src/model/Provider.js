const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("./connection");

class Provider extends Model {}

Provider.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telf: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dir: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: "provider" }
);


const sync = async () => {
  await Provider.sync({alter: true});
 // console.log("The table for the Provider model was just (re)created!");
};

sync();

module.exports = Provider;