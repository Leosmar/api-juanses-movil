const { Router } = require("express");

const route = Router();

const PhoneBrand = require("../model/PhoneBrand");

//creating brand
route.post("/post-brand", async (req, res) => {
  try {
    let { brand } = req.body;

    const postBrand = await PhoneBrand.create({
      brand,
    });

    res.json({ error: "false", data: postBrand.toJSON() });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//Select brand

route.get("/get-brand", async (req, res) => {
  try {
    const findBrand = await PhoneBrand.findAll({});

    return res.json({
      error: "false",
      data: findBrand,
    });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//update brand
route.put("/put-brand", async (req, res) => {
  try {
    let { brand, id } = req.body;

    await PhoneBrand.update(
      {
        brand,
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

//delete brand
route.delete("/delete-brand/:id", async (req, res) => {
  try {
    let { id } = req.params;

    await PhoneBrand.destroy({
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
