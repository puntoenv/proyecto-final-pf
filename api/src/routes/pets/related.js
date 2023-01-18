const { Router } = require("express");
const related = Router();
const Pet = require("../../models/Pet");

related.get("/", async (req, res) => {
  let { query } = req;
  try {
    let pets = await Pet.find(query);
    res.status(200).send(pets);
  } catch (error) {
    console.error(error);
  }
});

module.exports = related;
