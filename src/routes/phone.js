const { Router } = require("express");

const route = Router();

const Phone = require("../model/Phone");
const OtherProduct = require("../model/OtherProduct");
const BuyProduct = require("../model/BuyProduct");
const sequelize = require("../model/connection");
const { QueryTypes } = require("sequelize");

//creating phone
route.post("/post-phone", async (req, res) => {
  try {
    let data = req.body;

    const BuyProductData = await BuyProduct.findAll({
      where: {
        id: data.buyproductId,
      },
    });
    let totalBuyProduct = BuyProductData[0].dataValues.totalValue;
    const phoneRegister = await Phone.findAll({
      where: {
        buyProductId: data.buyproductId,
      },
    });

    let sumTotal = phoneRegister.reduce((acc, item) => {
      return acc + item.dataValues.totalValue;
    }, 0);

    sumTotal = parseFloat(sumTotal) + parseFloat(data.totalValue);

    if (sumTotal > totalBuyProduct) {
      return res.json({
        error: "true",
        message: `La suma de los telefonos registrados no puede ser mayor al valor total del pedido`,
      });
    }

    const phone = await Phone.create({
      ...data,
    });

    res.json({ error: "false", data: phone.toJSON() });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//Select phone whit stock
route.get("/get-phone", async (req, res) => {
  try {
    const findPhone = await sequelize.query(
      "SELECT phones.id, phones.color, phones.imei1, phones.imei2, phones.ram, phones.rom, phones.totalValue, phones.subjectValue, phones.stock, phones.buyproductId, phones.brandId, phones.modelId, buyproducts.barCode, buyproducts.cant, providers.name as nameProvider, brands.brand, models.model FROM phones inner join buyproducts on phones.buyproductId = buyproducts.id inner join providers on buyproducts.providerId = providers.id inner join brands on phones.brandId = brands.id inner join models on phones.modelId = models.id where phones.stock = 1;",
      {
        type: QueryTypes.SELECT,
      }
    );
    return res.json({
      error: "false",
      data: findPhone,
    });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//Select phone whitout stock
route.get("/get-phone-sale", async (req, res) => {
  try {
    const findPhone = await sequelize.query(
      "SELECT phones.id, phones.color, phones.imei1, phones.imei2, phones.ram, phones.rom, phones.totalValue, phones.subjectValue, phones.stock, phones.buyproductId, phones.brandId, phones.modelId, buyproducts.barCode, buyproducts.cant, providers.name as nameProvider, brands.brand, models.model FROM phones inner join buyproducts on phones.buyproductId = buyproducts.id inner join providers on buyproducts.providerId = providers.id inner join brands on phones.brandId = brands.id inner join models on phones.modelId = models.id where phones.stock = 0;",
      {
        type: QueryTypes.SELECT,
      }
    );
    return res.json({
      error: "false",
      data: findPhone,
    });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//select phone and other products by id
route.get("/get-products-by-id/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let data = [];

    const phoneById = await Phone.findAll({
      where: { id: id },
      attributes: [
        "id",
        "subjectValue",
        "totalValue",
        "imei1",
        "imei2",
        "color",
        "stock",
      ],
    });

    const otherproductById = await OtherProduct.findAll({
      where: { id: id },
      attributes: ["id", "cant", "subjectValue", "totalValue"],
    });

    phoneById.length > 0 && data.push(...phoneById);
    otherproductById.length > 0 && data.push(...otherproductById);

    return res.json({
      error: "false",
      data: data,
    });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//update phone
route.put("/put-phone", async (req, res) => {
  try {
    let {
      id,
      brand,
      model,
      color,
      imei1,
      imei2,
      ram,
      rom,
      totalValue,
      subjectValue,
      stock,
      buyproductId,
    } = req.body;

    const BuyProductData = await BuyProduct.findAll({
      where: {
        id: buyproductId,
      },
    });
    let totalBuyProduct = BuyProductData[0].dataValues.totalValue;
    const phoneRegister = await Phone.findAll({
      where: {
        buyProductId: buyproductId,
      },
    });

    let sumTotal = phoneRegister.reduce((acc, item) => {
      return (acc +=
        item.dataValues.id === id ? 0 : item.dataValues.totalValue);
    }, 0);

    sumTotal = parseFloat(sumTotal) + parseFloat(totalValue);

    if (sumTotal > totalBuyProduct) {
      return res.json({
        error: "true",
        message: `La suma de los telefonos registrados no puede ser mayor al valor total del pedido`,
      });
    }

    await Phone.update(
      {
        brand,
        model,
        color,
        imei1,
        imei2,
        ram,
        rom,
        totalValue,
        subjectValue,
        stock,
        buyproductId,
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

//delete phone
route.delete("/delete-phone/:id", async (req, res) => {
  try {
    let { id } = req.params;

    await Phone.destroy({
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
