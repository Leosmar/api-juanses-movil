const { Router } = require("express");

const route = Router();

route.get("/test", (req, res) => {
  res.status(200).json({ error: false, message: "todo ok" });
});

/* localhost:3000/api/[]-user */
route.use(require("./user"));  

/* localhost:3000/api/login */
route.use(require("./login"));

/* localhost:3000/api/[]-provider */
route.use(require("./provider"));

/* localhost:3000/api/[]-client */
route.use(require("./client"));

/* localhost:3000/api/[]-buy-product */
route.use(require("./buyProduct"));

/* localhost:3000/api/[]-category */
route.use(require("./category"));

/* localhost:3000/api/[]-phone */
route.use(require("./phone"));







module.exports = route;