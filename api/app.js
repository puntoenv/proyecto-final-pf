require("dotenv").config();
var express = require("express");
var morgan = require("morgan");
const bodyParser = require("body-parser");
const getFilteredPets = require("./routes/getFilteredPets");
const cors = require("cors");
const app = express();
const router = require("./routes/index");

const corsConfig = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsConfig));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(morgan("tiny"));

app.use("/filter", getFilteredPets);

app.use("/", router);

module.exports = app;
