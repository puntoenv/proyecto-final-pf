require("dotenv").config();
var express = require("express");
var morgan = require("morgan");
const bodyParser = require("body-parser");
// const getFilteredPets = require("./routes/getFilteredPets");
const cors = require("cors");
const app = express();
const router = require("./src/index");

const corsConfig = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsConfig));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
// parse application/json
app.use(bodyParser.json({limit: '10mb'}));

app.use(morgan("tiny"));

// app.use("/filter", getFilteredPets);
// app.post("/rutaPrueba", (req, res) => {
//   const { external, user: usuario } = req.body;
//   console.log(usuario);
//   res.json(usuario);
// });
app.use("/", router);

module.exports = app;
