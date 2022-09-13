const { Router } = require("express");

const route = Router();

const Category = require("../model/Category");

//creating category
route.post("/post-category", async (req, res) => {
  try {
    let { typeProduct } = req.body;

    const category = await Category.create({
      typeProduct,
    });

    res.json({ error: "false", data: category.toJSON() });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//Select category

route.get("/get-category", async (req, res) => {
  try {
    const findCategory = await Category.findAll({});

    return res.json({
      error: "false",
      data: findCategory,
    });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//update category
route.put("/put-category", async (req, res) => {
  try {
    let { typeProduct, id } = req.body;

    await Category.update(
      {
        typeProduct,
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

//delete category
route.delete("/delete-category/:id", async (req, res) => {
  try {
    let { id } = req.params;

    await Category.destroy({
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
