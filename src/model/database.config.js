require("dotenv").config();

module.exports = {
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,       
  host: process.env.HOST,
  dialect: process.env.DIALECT,
};
