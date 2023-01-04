const { Router } = require("express");
const User = require("../../models/User");
const postUser = Router();

postUser.post("/", async (req, res) => {
  try {
    let { username, age, mail, password, pet, favorites, cart } = req.body;
    let user = await User.create({
      username,
      age,
      mail,
      password,
      pet,
      favorites,
      cart,
      administrator: true,
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: "Error en la creación del usuario" });
  }
});

module.exports = postUser;
