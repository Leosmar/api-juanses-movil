const User = require("../model/User");

const VerifyDuplicateUsername = async (req, res, next) => {
  const { name } = req.body;

  const verifyUserName = await User.findAll({
    where: {
      name,
    },
  });

  if (verifyUserName.length > 0) {
    return res
      .status(400)
      .json({ error: "true", message: "El nombre de usuario ya esta en uso" });
  }

  next();
};

module.exports = VerifyDuplicateUsername;
