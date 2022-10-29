const { Model, DataTypes } = require("sequelize");
const sequelize = require("./connection");
const Phone = require("./Phone");
const OtherProduct = require("./OtherProduct");
const Client = require("./Client");

class Sale extends Model {}

Sale.init(
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
  { sequelize, modelName: "sale" }
);

Sale.belongsTo(Phone);
Sale.belongsTo(OtherProduct);
Sale.belongsTo(Client);

(async () => await Sale.sync())();

module.exports = Sale;
