const { Router } = require("express");

const route = Router();

const Spent = require("../model/Spent");

//creating spent
route.post("/post-spent", async (req, res) => {
  try {
    let { typeSpent, totalValue, comment } = req.body;

    const spent = await Spent.create({
      typeSpent,
      totalValue,
      comment,
    });

    res.json({ error: "false", data: spent.toJSON() });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//Select spent

route.get("/get-spent", async (req, res) => {
  try {
    const findData = await Spent.findAll({ orderBy: [['createdAt', 'DESC']] });

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

    const deleteProv = await Spent.destroy({
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
