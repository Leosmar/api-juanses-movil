const { Router } = require("express");

const route = Router();

const CashRegister = require("../model/CashRegister");

//Select category
route.get("/get-cash-register", async (req, res) => {
  try {
    const data = await CashRegister.findAll({
      where: {
        id: 1,
      },
      attributes: ["total"],
    });

    return res.json({
      error: "false",
      data: data[0],
    });
  } catch (err) {
    res.json({ error: true, err });
  }
});

module.exports = route;
