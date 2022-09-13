const { Model, DataTypes } = require("sequelize");
const sequelize = require("./connection");


class Category extends Model {}

Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      typeProduct: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, modelName: "category" }
  );
   
  
  (async () => {

    await Category.sync();
  
    let category = await Category.findAll();
    
    if (category == false) {
      await Category.create({ 
        typeProduct: "Telefono"
      });
    }
  })();
  
  module.exports = Category;