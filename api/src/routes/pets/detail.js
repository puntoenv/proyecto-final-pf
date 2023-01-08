const express = require("express");
const Pet = require("../../models/Pet");
const detail = express.Router();

detail.get("/detail/:id", async (req, res) => {
  console.log("entro");
  try {
    let { id } = req.params;
    let detail = await Pet.findOne({ _id: id, hidden: false });
    res.status(200).send(detail);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = detail;
