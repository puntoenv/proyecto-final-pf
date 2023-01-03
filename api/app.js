require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/index");

app.use("/", router);

module.exports = app;
