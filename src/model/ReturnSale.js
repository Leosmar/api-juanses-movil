const { Model, DataTypes } = require("sequelize");
const sequelize = require("./connection");
const Phone = require("./Phone");
const OtherProduct = require("./OtherProduct");
const Client = require("./Client");

class ReturnSale extends Model {}

ReturnSale.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    totalValue: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    paymentType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    codeSale: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    saleCant: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { sequelize, modelName: "returnsale" }
);

ReturnSale.belongsTo(Phone);
ReturnSale.belongsTo(OtherProduct);
ReturnSale.belongsTo(Client);

(async () => await ReturnSale.sync())();

module.exports = ReturnSale;
