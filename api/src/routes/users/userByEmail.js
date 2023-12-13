const { Router } = require("express");
const User = require("../../models/User");

const router = Router();

router.get("/user-by-email/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    console.log(email);
    if (!user) return res.json({ error: "User no existing" });
    res.json({ error: null, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
