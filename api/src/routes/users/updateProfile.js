const { Router } = require("express");
const User = require("../../models/User");
const updateProfile = Router();
const cloudinary = require('../../../cloud')

updateProfile.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { name, age, pets, image, bio, ubication, cart } = req.body;
    let result = image && await cloudinary.uploader.upload(image);
    let user = await User.findById(id);
    user.name = name ? name : user.name;
    user.age = age ? age : user.age;
    user.pets = pets ? pets : user.pets;
    user.cart = cart ? cart : user.cart;
    user.bio = bio ? bio : user.bio;
    user.ubication = ubication ? ubication : user.ubication;
    user.image = result ? result.url : user.image;
    let userUpdate = await user.save();

    res.status(200).send(userUpdate);
  } catch (error) {
    console.log(error)
    res.status(400).send({ error: "Error al modificar el perfil" });
  }
});

module.exports = updateProfile;
