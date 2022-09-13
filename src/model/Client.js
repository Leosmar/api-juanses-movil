const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("./connection");

class Client extends Model {}

Client.init(
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
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    dir: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "client" }
);
 

const sync = async () => {
  await Client.sync();
  //console.log("The table for the Client model was just (re)created!");
};

sync();

module.exports = Client;