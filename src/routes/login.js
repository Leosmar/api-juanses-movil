const { Router } = require("express");

const route = Router();

const User = require("../model/User");

const bcrypt = require("../libs/scryptingPasword.controller");

//reading user
route.post("/login", async (req, res) => {
  try {
    let { userName, password } = req.body;

    const findName = await User.findAll({
      where: {
        name: userName,
      }, 
    });

    if (findName.length === 0)
      return res.json({
        error: "true",
        message: "Usuario o contraseña invalida",
      });

    const resivePasword = { ...findName[0].dataValues }.password;

    if (password !== resivePasword)
      return res.json({
        error: "true",
        message: "Usuario o contraseña invalida",
      });

    return res.json({
      error: "false",
      message: `Bienvenid@ ${{ ...findName[0].dataValues }.name}`,
      user: { ...findName[0].dataValues },
    });
  } catch (err) {
    res.json({ error: true, err });
  }
});

module.exports = route;
