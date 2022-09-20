const { Model, DataTypes } = require("sequelize");
const sequelize = require("./connection");
const Provider = require("./Provider");
const Category = require("./Category");

class BuyProduct extends Model {}

BuyProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    barCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    cant: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    totalValue: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    paid: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: "buyproduct" }
);

BuyProduct.belongsTo(Provider);
BuyProduct.belongsTo(Category);

(async () => await BuyProduct.sync())();

module.exports = BuyProduct;
