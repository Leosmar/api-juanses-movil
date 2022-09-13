const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("./connection");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "user" }
);



(async () => {

  await User.sync();

  let user = await User.findAll(); 
  
  if (user == false) {
    await User.create({ 
      name: "admin",
      password: "admin",
      rol: 1,
    });
  }
})();


module.exports = User;
