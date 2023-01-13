const { Router } = require("express");
const allUsers = Router();
const User = require("../../models/User");

allUsers.get("/", async (req, res) => {
  try {
    const users = await User.find().populate("pets", {
      hidden: 0,
      expireAt: 0,
      __v: 0,
      user: 0,
    });
    res.json(users);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = allUsers;
