const { Router } = require("express");
const User = require("../../models/User");
const cart = Router();

cart.get("/carrito", async (user_id) => {
  try {
    const userCart = await User.find({
      user: user_id,
    });
    res.status(200).send(userCart.cart);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = cart;
