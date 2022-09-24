const { Router } = require("express");

const route = Router();
const sequelize = require("../model/connection");
const { QueryTypes } = require("sequelize");

const OtherProduct = require("../model/OtherProduct");

//creating model
route.post("/post-other-product", async (req, res) => {
  try {
    let { name, cant, totalValue, subjectValue, categoryId } = req.body;

    const postModel = await OtherProduct.create({
      name,
      cant,
      totalValue,
      subjectValue,
      categoryId,
    });

    res.json({ error: "false", data: postModel.toJSON() });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//Select model
route.get("/get-other-product", async (req, res) => {
  try {
    const findModel = await sequelize.query(
        "SELECT otherproducts.id, otherproducts.name, otherproducts.cant, otherproducts.totalValue, otherproducts.subjectValue, otherproducts.categoryId, categories.typeProduct FROM otherproducts inner join categories on otherproducts.categoryId = categories.id",
        {
          type: QueryTypes.SELECT,
        }
      );

    return res.json({
      error: "false",
      data: findModel,
    });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//update model
route.put("/put-other-product", async (req, res) => {
  try {
    let { id, name, cant, totalValue, subjectValue, categoryId } = req.body;

    await OtherProduct.update(
      {
        name,
        cant,
        totalValue,
        subjectValue,
        categoryId,
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

//delete model
route.delete("/delete-other-product/:id", async (req, res) => {
  try {
    let { id } = req.params;

    await OtherProduct.destroy({
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
