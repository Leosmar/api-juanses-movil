const { Router } = require("express");

const route = Router();

const Provider = require("../model/Provider");

//creating provider
route.post("/post-provider", async (req, res) => {
  try {
    let { name, telf, dni, dir, email } = req.body;
    
    const provider = await Provider.create({
      name,
      telf,
      dni,
      dir,
      email,
    });

    res.json({ error: "false", data: provider.toJSON() });
  } catch (err) {
    res.json({ error: true, err });
  }
});
//get All provider
route.get("/get-provider", async (req, res) => {
  try {
    const findProvider = await Provider.findAll({});

    return res.json({
      error: "false",
      data: findProvider,
    });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//Get provider return only attribute id and name
route.get("/get-provider-id-name/", async (req, res) => {
  try {
    const findProvider = await Provider.findAll({
      attributes: ["id", "name"],
    });

    return res.json({
      error: "false",
      data: findProvider,
    });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//update Provider
route.put("/put-provider", async (req, res) => {
  try {
    let { id, name, telf, dni, dir, email } = req.body;

    await Provider.update(
      {
        name,
        telf,
        dni,
        dir,
        email,
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

//delete Provider
route.delete("/delete-provider/:id", async (req, res) => {
  try {
    let { id } = req.params;

    await Provider.destroy({
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
