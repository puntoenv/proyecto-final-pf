const { Router } = require("express");
const User = require("../../models/User");
const updateProfile = Router();
const cloudinary = require("../../../cloud");
const ejs = require("ejs");
const path = require("path");
const mailer = require("../../../mailer")

updateProfile.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { name, age, pets, image, bio, ubication, cart, hidden, directions, gender } =
      req.body;
    let result = image && (await cloudinary.uploader.upload(image));
    let user = await User.findById(id);
    if (hidden) {
      user.hidden === "show"
        ? user.hidden = false
        : (user.hidden = true);
      let data = await ejs.renderFile(path.join(__dirname + "/banned.ejs"), {
        email: "littlePaws0508@gmail.com",
      });
       await mailer.sendMail({
        from: "littlePaws0508@gmail.com",
        to: `${user.email}`,
        subject: `ATENCÍON ${user.name.toUpperCase()}`,
        html: data,
      });
    } else {
      user.name = name ? name : user.name;
      user.age = age ? age : user.age;
      user.pets = pets ? pets : user.pets;
      user.cart = cart ? cart : user.cart;
      user.bio = bio ? bio : user.bio;
      user.ubication = ubication ? ubication : user.ubication;
      user.image = result ? result.url : user.image;
      user.directions = directions ? directions : user.directions;
      user.gender = gender ? gender : user.gender;
    }
    let userUpdate = await user.save();
    res.status(200).send(userUpdate);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message});
  }
});

module.exports = updateProfile;
