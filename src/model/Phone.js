const { Model, DataTypes } = require("sequelize");
const sequelize = require("./connection");

const BuyProduct = require("./BuyProduct");
const PhoneBrand = require("./PhoneBrand");
const PhoneModel = require("./PhoneModel");

class Phone extends Model {}

Phone.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
Phone.belongsTo(PhoneBrand);
Phone.belongsTo(PhoneModel);


(async () => {
  await Phone.sync();
})();

module.exports = Phone;
