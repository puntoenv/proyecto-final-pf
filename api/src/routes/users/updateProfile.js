const { Router } = require("express");
const User = require("../../models/User");
const updateProfile = Router();
const cloudinary = require("../../../cloud");
const ejs = require("ejs");
const path = require("path");

updateProfile.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { name, age, pets, image, bio, ubication, cart, hidden } = req.body;
    let result = image && (await cloudinary.uploader.upload(image));
    let user = await User.findById(id);
    if (hidden) {
      user.hidden = hidden;
      let data = await ejs.renderFile(path.join(__dirname + "/banned.ejs"), {
        email: "littlePaws0508@gmail.com",
      });
      let info = await mailer.sendMail({
        from: "littlePaws0508@gmail.com",
        to: `${user.email}`,
        subject: `GRACIAS ${user.name.toUpperCase()}`,
        html: data,
      });
      console.log(info);
    } else {
      user.name = name ? name : user.name;
      user.age = age ? age : user.age;
      user.pets = pets ? pets : user.pets;
      user.cart = cart ? cart : user.cart;
      user.bio = bio ? bio : user.bio;
      user.ubication = ubication ? ubication : user.ubication;
      user.image = result ? result.url : user.image;
    }
    let userUpdate = await user.save();
    res.status(200).send(userUpdate);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Error al modificar el perfil" });
  }
});

module.exports = updateProfile;
