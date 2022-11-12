const { Router } = require("express");

const route = Router();

route.get("/test", (req, res) => {
  res.status(200).json({ error: false, message: "All ok" });
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

/* localhost:3000/api/[]-brand */
route.use(require("./phoneBrand"));

/* localhost:3000/api/[]-brand */
route.use(require("./phoneModel"));

/* localhost:3000/api/[]-phone */
route.use(require("./phone"));

/* localhost:3000/api/[]-other-product */
route.use(require("./otherProduct"));

/* localhost:3000/api/[]-sale */
route.use(require("./sale"));

/* localhost:3000/api/[]-spent */
route.use(require("./spent"));

/* localhost:3000/api/[]-cash-register */
route.use(require("./cashRegister"));






module.exports = route;
