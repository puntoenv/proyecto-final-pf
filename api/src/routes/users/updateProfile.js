const { Router } = require("express");
const User = require("../../models/User");
const updateProfile = Router();

updateProfile.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { name, age, pets, image, bio, ubication } = req.body;
    let user = await User.findById(id);
    user.name = name ? name : user.name;
    user.age = age ? age : user.age;
    user.pets = pets ? pets : user.pets;
    user.image = image ? image : user.image;
    user.bio = bio ? bio : user.bio;
    user.ubication = ubication ? ubication : user.ubication;
    let userUpdate = await user.save();
    res.status(200).send(userUpdate);
  } catch (error) {
    console.log(error)
    res.status(400).send({ error: "Error al modificar el perfil" });
  }
});

module.exports = updateProfile;
