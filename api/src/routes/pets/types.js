const { Router } = require("express");
const types = Router();
const Pet = require("../../models/Pet");

types.get("/", async (req, res) => {
  try {
    let types = await Pet.find()
      .then((pets) => pets.map((pet) => pet.type))
      .then((data) => Array.from(new Set(data)));
      console.log(types);
    res.status(200).send(types);

  } catch (error) {
    console.log(error);
  }
});

module.exports = types;
