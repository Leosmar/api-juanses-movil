const { Router } = require("express");

const route = Router();

const BuyProduct = require("../model/BuyProduct");
const Provider = require("../model/Provider");
const Category = require("../model/Category");
const Phone = require("../model/Phone");
const sequelize = require("../model/connection");
const { QueryTypes } = require("sequelize");

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

//Select product
route.get("/get-buy-product-phone-register", async (req, res) => {
  try {
    const findProduct = await sequelize.query(
      "SELECT buyproducts.id,  brands.brand, models.model, phones.imei1, phones.imei2, phones.totalValue FROM buyproducts inner join phones on buyproducts.id = phones.buyProductId inner join brands on phones.brandId = brands.id inner join models on phones.modelId = models.id;",
      {
        type: QueryTypes.SELECT,
      }
    );

    return res.json({
      error: "false",
      data: findProduct,
    });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//Select product went
route.get("/get-buy-product-phone", async (req, res) => {
  try {
    const findProduct = await BuyProduct.findAll({
      include: [
        { model: Provider, attributes: ["name"] },
        { model: Category, attributes: ["typeProduct"] },
      ],
    });

    const filterProduct = findProduct.map((item, i) => {
      return item.dataValues;
    });

    const finalData = new Set();

    const getCant = async (id) => {
      const cantPhone = await Phone.findAndCountAll({
        where: {
          buyProductId: id,
        },
      });

      return cantPhone.count;
    };

    await Promise.all(
      filterProduct.map(async (product) => {
        if (product.category.dataValues.typeProduct === "Telefono") {
          let phoneCant = await getCant(product.id);
          if (phoneCant < product.cant) {
            await finalData.add(product);
          }
        }
      })
    );

    return res.json({
      error: "false",
      data: [...finalData],
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
