const { Router } = require("express");
const Merchant_orders = require("../../models/Merchant_orders");
const User = require("../../models/User");
const buyHistory = Router();

buyHistory.get("/", async (req, res) => {
  try {
    let history = await Merchant_orders.find().populate({
      path: "user",
      model: User,
    });
    res.status(200).send(history);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
});

module.exports = buyHistory;
