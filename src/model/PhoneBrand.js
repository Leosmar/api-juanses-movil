const { Model, DataTypes } = require("sequelize");
const sequelize = require("./connection");

class PhoneBrand extends Model {}

PhoneBrand.init(
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
  },
  { sequelize, modelName: "brand" }
);


(async () => {
  await PhoneBrand.sync();
})();

module.exports = PhoneBrand;
