const { Model, DataTypes } = require("sequelize");
const sequelize = require("./connection");

class PhoneModel extends Model {}

PhoneModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "model" }
);

(async () => {
  await PhoneModel.sync();
})();

module.exports = PhoneModel;
