const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("./connection");
const Category = require("./Category");

class OtherProduct extends Model {}

OtherProduct.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
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
