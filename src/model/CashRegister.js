const { Model, DataTypes } = require("sequelize");
const sequelize = require("./connection");

class CashRegister extends Model {}

CashRegister.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  { sequelize, modelName: "cashregister" }
);

(async () => {
  await CashRegister.sync();

  let cashRegister = await CashRegister.findAll();

  if (cashRegister == false) {
    await CashRegister.create({
      total: 0,
    });
  }
})();

module.exports = CashRegister;
