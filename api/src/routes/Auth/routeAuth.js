const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcyrpt = require("bcrypt");
const User = require("../../models/User");
const {
  schemaUserRegister,
  schemaUserLogin,
} = require("../../controllers/schemaValidations/schemaUser");

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

router.post("/login", async (req, res) => {
  try {
    const { error } = schemaUserLogin.validate(req.body);
    if (error) {
      return res.json({ error: error.details[0].context });
    }

    const user = await User.findOne({ mail: req.body.mail });
    if (!user) {
      return res.json({ error: "Credenciales no validas" });
    }
    const passwordValidate = await bcyrpt.compare(
      req.body.password,
      user.password
    );

    if (!passwordValidate) {
      return res.json({ error: "Credenciales no validas" });
    }

    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      `${process.env.JWT_TOKEN_SECRET}`
    );

    res.header("auth-token", token).json({
      error: null,
      data: { token },
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

module.exports = router;
