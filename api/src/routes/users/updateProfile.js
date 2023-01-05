const { Router } = require("express");
const User = require("../../models/User");
const updateProfile = Router();

updateProfile.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { username, age, mail, password, pets, favorites, cart } = req.body;
    let user = await User.findById(id);
    user.username = username ? username : user.username;
    user.age = age ? age : user.age;
    user.mail = mail ? mail : user.mail;
    user.password = password ? password : user.password;
    user.pets = pets ? pets : user.pets;
    user.favorites = favorites ? favorites : user.favorites;
    user.cart = cart ? cart : user.cart;
    let userUpdate = await user.save();
    res.status(200).send(userUpdate);
  } catch (error) {
    res.status(400).send({ error: "Error al modificar el perfil" });
  }
});

module.exports = updateProfile;
