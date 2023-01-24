const { Router } = require("express");
const Merchant_orders = require("../../models/Merchant_orders");
const User = require("../../models/User");
const buyHistory = Router();

buyHistory.get("/", async (req, res) => {
  try {
    let users = await User.find();
    let history = await Merchant_orders.find().then((data) =>
      data.map((buy) => {
        buy.user = users.find((user) => user._id);
        return { ...buy };
      })
    );
    res.status(200).send(history);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

module.exports = buyHistory;
