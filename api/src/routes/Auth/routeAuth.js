const { Router } = require("express");
const bcyrpt = require("bcrypt");
const {
  schemaUserRegister,
} = require("../../controllers/schemaValidations/schemaUser");
const User = require("../models/User");

const router = Router();

router.post("/register", async (req, res) => {
  const saltGen = await bcyrpt.genSalt(10);

  const hashedPassword = await bcyrpt.hash(req.body.password, saltGen);
  const user = new User({
    username: req.body.username,
    age: req.body.age,
    bio: req.body.bio,
    image: req.body.image,
    mail: req.body.mail,
    password: hashedPassword,
  });

  try {
    const { error } = schemaUserRegister.validate(req.body);
    if (error) return res.json({ error: error.details[0].context });

    const savedUser = await user.save();
    return res.json({
      error: null,
      data: savedUser,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
