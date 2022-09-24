const { Model, DataTypes } = require("sequelize");
const sequelize = require("./connection");

class Spent extends Model {}

Spent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    typeSpent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalValue: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: "spent" }
);

(async () => await Spent.sync())();

module.exports = Spent;
