const { Router } = require("express");

const route = Router();

const Sale = require("../model/Sale");
const sequelize = require("../model/connection");
const { QueryTypes, Op } = require("sequelize");

//creating sale
route.post("/post-sale", async (req, res) => {
  try {
    let { phoneId, otherproductId, clientId, totalValue, paymentType } =
      req.body;

    const sale = await Sale.create({
      phoneId,
      otherproductId,
      clientId,
      totalValue,
      paymentType,
    });

    res.json({ error: "false", data: sale.toJSON() });
  } catch (err) {
    res.json({ error: true, err });
  }
});
//get All sale
route.get("/get-sale", async (req, res) => {
  try {
    let AllData = [];

    const findDataWhitPhone = await sequelize.query(
      "SELECT sales.id, sales.totalValue, sales.paymentType, sales.createdAt, sales.phoneId, sales.otherproductId, sales.clientId, brands.brand, models.model, clients.name FROM sales inner join phones on sales.phoneId = phones.id inner join brands on phones.brandId = brands.id inner join models on phones.modelId = models.id inner join clients on sales.clientId = clients.id where sales.otherproductId is null;",
      {
        type: QueryTypes.SELECT,
      }
    );

    const findDataWhitOtherproduct = await sequelize.query(
      "SELECT sales.id, sales.totalValue, sales.paymentType, sales.createdAt, sales.phoneId, sales.otherproductId, sales.clientId, otherproducts.name, otherproducts.categoryId, clients.name, categories.typeProduct FROM sales inner join otherproducts on sales.otherproductId = otherproducts.id inner join categories on otherproducts.categoryId = categories.id inner join clients on sales.clientId = clients.id where sales.phoneId is null;",
      {
        type: QueryTypes.SELECT,
      }
    );

    findDataWhitPhone.map((item) => {
      AllData.push(item);
    });

    findDataWhitOtherproduct.map((item) => {
      AllData.push(item);
    });

    return res.json({
      error: "false",
      data: AllData,
    });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//update sale
route.put("/put-sale", async (req, res) => {
  try {
    let { id, phoneId, otherproductId, clientId, totalValue, paymentType } =
      req.body;

    await Sale.update(
      { phoneId, otherproductId, clientId, totalValue, paymentType },
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

//delete sale
route.delete("/delete-sale/:id", async (req, res) => {
  try {
    let { id } = req.params;

    await Sale.destroy({
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
