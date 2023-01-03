require("dotenv").config();
var express = require("express");
var morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const getFilteredPets = require("./routes/getFilteredPets");

var app = express();

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

module.exports = app;
