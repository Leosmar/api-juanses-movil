const { Model, DataTypes } = require("sequelize");
const sequelize = require("./connection");
const BuyProduct = require("./BuyProduct");

class Phone extends Model {}

Phone.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imei1: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    imei2: {
      type: DataTypes.BIGINT,
      allowNull: true,
      unique: true,
    },
    ram: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    rom: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    totalValue: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    subjectValue: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    stock: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { sequelize, modelName: "phone" }
);

Phone.belongsTo(BuyProduct);


const sync = async () => {
  await Phone.sync();
  //console.log("The table for the Client model was just (re)created!");
};

sync();

module.exports = Phone;
