const Sequelize = require("sequelize");
const {
  database,
  user,
  password,
  host,
  dialect,
} = require("./database.config");

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

module.exports = sequelize;
