const { Router } = require("express");
const User = require("../../models/User");

const router = Router();

router.post("/create-user", async (req, res) => {
  const { email, name } = req.body;

  try {
    const user = await User.create({ email, name});
    await user.save();

    res.json({ error: null, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
