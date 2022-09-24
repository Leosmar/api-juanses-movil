const { Model, DataTypes } = require("sequelize");
const sequelize = require("./connection");
const Category = require("./Category");

class OtherProduct extends Model {}

OtherProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cant: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    totalValue: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    subjectValue: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
  },
  { sequelize, modelName: "otherproduct" }
);

OtherProduct.belongsTo(Category);

(async () => await OtherProduct.sync())();

module.exports = OtherProduct;
