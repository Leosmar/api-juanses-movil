const { Router } = require("express");

const route = Router();

const Phone = require("../model/Phone");

const BuyProduct = require("../model/BuyProduct");

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
    const findPhone = await Phone
      .findAll({
        include: [
          { model: BuyProduct },
        ],
      });

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
      buyProductId,
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
        buyProductId,
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
