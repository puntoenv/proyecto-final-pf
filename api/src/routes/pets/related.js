const { Router } = require("express");
const petsRelated = Router();
const Pet = require("../../models/Pet");

petsRelated.get("/", async (req, res) => {
  let { query } = req;
  try {
    let pets = await Pet.find({ ...query, hidden: false });
    res.status(200).send(pets);
  } catch (error) {
    console.error(error);
  }
});

module.exports = petsRelated;
