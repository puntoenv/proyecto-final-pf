const { Router } = require("express");
const User = require("../../models/User");
const updateProfile = Router();

updateProfile.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { name, age, pets, image, favorites, cart } = req.body;
    let user = await User.findById(id);
    user.name = name ? name : user.name;
    user.age = age ? age : user.age;
    user.pets = pets ? pets : user.pets;
    user.favorites = favorites ? favorites : user.favorites;
    user.cart = cart ? cart : user.cart;
    user.image = image ? image : user.image;
    let userUpdate = await user.save();
    res.status(200).send(userUpdate);
  } catch (error) {
    console.log(error)
    res.status(400).send({ error: "Error al modificar el perfil" });
  }
});

module.exports = updateProfile;
