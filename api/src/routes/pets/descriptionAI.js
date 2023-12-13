const { Router } = require("express");
const aiText = require("../../../openai");
const descriptionAI = Router();

descriptionAI.get("/", async (req, res) => {
  try {
    let description = await aiText(req.query);
    res.status(200).send(description);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = descriptionAI;
