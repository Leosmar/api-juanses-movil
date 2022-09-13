const { Router } = require("express");

const route = Router();

const BuyProduct = require("../model/BuyProduct");
const Provider = require("../model/Provider");
const Category = require("../model/Category");

//creating product
route.post("/post-buy-product", async (req, res) => {
  try {
    // data = { idProvider, barCode, cant, totalValue, paid, comment }
    let data = req.body;

    const product = await BuyProduct.create({
      ...data,
    });

    res.json({ error: "false", data: product.toJSON() });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//Select product

route.get("/get-buy-product", async (req, res) => {
  try {
    const findProduct = await BuyProduct.findAll({
      include: [
        { model: Provider, attributes: ["name"] },
        { model: Category, attributes: ["typeProduct"] },
      ],
    });

    return res.json({
      error: "false",
      data: findProduct,
    });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//update product
route.put("/put-buy-product", async (req, res) => {
  try {
    let {
      providerId,
      categoryId,
      barCode,
      cant,
      totalValue,
      paid,
      comment,
      id,
    } = req.body;

    await BuyProduct.update(
      { providerId, categoryId, barCode, cant, totalValue, paid, comment },
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

//delete product
route.delete("/delete-buy-product/:id", async (req, res) => {
  try {
    let { id } = req.params;

    await BuyProduct.destroy({
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
