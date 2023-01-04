const express = require("express");
const Pet = require("../../models/Pet");
const detail = express.Router();

detail.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let detail = await Pet.find({ _id: id, hidden: false });
    res.status(200).send(detail);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = detail;
