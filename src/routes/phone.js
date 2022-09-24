const { Router } = require("express");

const route = Router();

const Phone = require("../model/Phone");
const sequelize = require("../model/connection");
const { QueryTypes } = require("sequelize");

//creating phone
route.post("/post-phone", async (req, res) => {
  try {
    let data = req.body;

    const phone = await Phone.create({
      ...data,
    });

    res.json({ error: "false", data: phone.toJSON() });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//Select phone
route.get("/get-phone", async (req, res) => {
  try {
    
    const findPhone = await sequelize.query(
      "SELECT phones.id, phones.color, phones.imei1, phones.imei2, phones.ram, phones.rom, phones.totalValue, phones.subjectValue, phones.stock, phones.buyproductId, phones.brandId, phones.modelId, buyproducts.barCode, buyproducts.cant, providers.name as nameProvider, brands.brand, models.model FROM phones inner join buyproducts on phones.buyproductId = buyproducts.id inner join providers on buyproducts.providerId = providers.id inner join brands on phones.brandId = brands.id inner join models on phones.modelId = models.id;",
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

//update phone
route.put("/put-phone", async (req, res) => {
  console.log(req.body);
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
