const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(cors());
app.use(morgan());

//Connection to database
require("./model/index");


//Rutas
app.use("/api", require("./routes/index"));

app.listen(PORT, () => {
  console.log("App listen on port " + PORT);
});
