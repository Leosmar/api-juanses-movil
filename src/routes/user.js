const { Router } = require("express");

const route = Router();

const User = require("../model/User");

const verifyExists = require("../middlewares/verifyExists");


//creating user
route.post("/post-user", async (req, res) => {
  try {
    let { name, password, rol } = req.body;

    const user = await User.create({
      name,
       password,
        rol
    });
    
    res.json({ error: "false", data: user.toJSON()});
  } catch (err) {
    res.json({ error: true, err });
  }
  
});  


//Select user

route.get("/get-user", async (req, res) => {
  try {
    
    const findUser = await User.findAll({});
    
    return res.json({
      error: "false",
      data: findUser,
    });

  } catch (err) {
    res.json({ error: true, err });
  }
});

//update user
route.put("/put-user", async (req, res) => {
  try {
    let {id, name, password, rol} = req.body;

    

    await User.update({
        name,
        password,
        rol
    },{
      where: {
        id,
      }
    });

    res.json({ error: "false", data: ""});
    
  } catch (err) {
    res.json({ error: true, err });
  }
  
});

//delete user
route.delete("/delete-user/:id", async (req, res) => {
  try {

    let { id } = req.params;
    
     await User.destroy({
      where: {
        id,
      }
    });

    res.json({ error: "false", data: ""});

  } catch (err) {
    res.json({ error: true, err });
  }
  

});


module.exports = route;
