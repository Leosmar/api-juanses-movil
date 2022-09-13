const bcrypt = require("bcryptjs");

const scryptingPassword = async (password) => {
  const salt = await bcrypt.genSaltSync(10);
  return await bcrypt.hashSync(password, salt);
};

const comparePassword = async (password, recivePassword) => {
  return await bcrypt.compareSync(password, recivePassword);
};

module.exports = {
  scryptingPassword,
  comparePassword,
};
