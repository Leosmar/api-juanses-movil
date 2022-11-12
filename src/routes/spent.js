const { Router } = require("express");

const route = Router();

const Spent = require("../model/Spent");
const CashRegister = require("../model/CashRegister");

//creating spent
route.post("/post-spent", async (req, res) => {
  try {
    let { typeSpent, totalValue, comment } = req.body;

    const spent = await Spent.create({
      typeSpent,
      totalValue,
      comment,
    });

    await CashRegister.increment(
      {
        total: -totalValue,
      },
      {
        where: {
          id: 1,
        },
      }
    );

    res.json({ error: "false", data: spent.toJSON() });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//Select spent

route.get("/get-spent", async (req, res) => {
  try {
    const findData = await Spent.findAll({ orderBy: [["createdAt", "DESC"]] });

    return res.json({
      error: "false",
      data: findData,
    });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//update spent
route.put("/put-spent", async (req, res) => {
  try {
    let { id, typeSpent, totalValue, comment } = req.body;

    const total = await Spent.findAll({
      where: {
        id,
      },
      attributes: ["totalValue"],
    });

    await CashRegister.increment(
      {
        total: totalValue - total[0].dataValues.totalValue,
      },
      {
        where: {
          id: 1,
        },
      }
    );

    await Spent.update(
      {
        typeSpent,
        totalValue,
        comment,
      },
      {
        where: {
          id,
        },
      }
    );

    res.json({ error: "false", data: "" });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//delete spent
route.delete("/delete-spent/:id", async (req, res) => {
  try {
    let { id } = req.params;

    const total = await Spent.findAll({
      where: {
        id,
      },
      attributes: ["totalValue"],
    });

    await CashRegister.increment(
      {
        total: total[0].dataValues.totalValue,
      },
      {
        where: {
          id: 1,
        },
      }
    );

    await Spent.destroy({
      where: {
        id,
      },
    });

    res.json({ error: "false", data: "" });
  } catch (err) {
    res.json({ error: true, err });
  }
});

module.exports = route;
