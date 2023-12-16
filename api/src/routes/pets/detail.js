const express = require("express");
const Pet = require("../../models/Pet");
const User = require('../../models/User')
const detail = express.Router();

detail.get("/detail/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let detail = await Pet.findOne({ _id: id }).populate([
      {
        path: "user",
        model: User,
      },
      { path: "adopted.user", model: User },
    ]);
    res.status(200).send(detail);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = detail;
