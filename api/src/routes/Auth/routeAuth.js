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
    name: req.body.name,
    age: req.body.age,
    bio: req.body.bio,
    image:
      "https://cdn-icons-png.flaticon.com/512/5372/5372211.png" ||
      req.body.image,
    email: req.body.email,
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
  const { provider } = req.body;

  // LOGIN WITH AUTH EXTERNAL
  if (provider.status === "external") {
    try {
      if (new RegExp(/([A-Za-z\w]){64,64}$/, "g").test(provider.key)) {
        let user = await User.findOne({ email: req.body.email });
        console.log("desde line 46: " + user);
        if (!user) {
          user = await User.create({
            name: req.body.name,
            email: req.body.email,
            image: req.body.image,
          });
        }
        const token = jwt.sign(
          {
            name: user.name,
            id: user._id,
          },
          `${process.env.JWT_TOKEN_SECRET}`
        );

        return res.header("auth-token", token).json({
          error: null,
          data: { token },
        });
      } else {
        res.status(403).json({ error: "access denied bad authentication" });
      }
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
  //LOGIN WITH CREDENTIALS
  try {
    const { error } = schemaUserLogin.validate(req.body);
    if (error) {
      return res.json({ error: error.details[0].context });
    }

    const user = await User.findOne({ email: req.body.email });
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
        name: user.name,
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
