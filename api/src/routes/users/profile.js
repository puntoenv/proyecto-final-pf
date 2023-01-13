const { Router } = require("express");
const User = require("../../models/User");
const profile = Router();

profile.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;

    let user = await User.findById(id);

    if (user.hidden) return res.json("User not found");
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = profile;
