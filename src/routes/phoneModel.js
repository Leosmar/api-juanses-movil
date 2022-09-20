const { Router } = require("express");

const route = Router();

const PhoneModel = require("../model/PhoneModel");

//creating model
route.post("/post-model", async (req, res) => {
  try {
    let { model } = req.body;

    const postModel = await PhoneModel.create({
      model,
    });

    res.json({ error: "false", data: postModel.toJSON() });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//Select model

route.get("/get-model", async (req, res) => {
  try {
    const findModel = await PhoneModel.findAll({});

    return res.json({
      error: "false",
      data: findModel,
    });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//update model
route.put("/put-model", async (req, res) => {
  try {
    let { model, id } = req.body;

    await PhoneModel.update(
      {
        model,
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
route.delete("/delete-model/:id", async (req, res) => {
  try {
    let { id } = req.params;

    await PhoneModel.destroy({
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
