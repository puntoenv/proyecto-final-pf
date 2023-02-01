const { Router } = require("express");
const Pet = require("../../models/Pet");
const User = require("../../models/User");
const Merchant_orders = require("../../models/Merchant_orders")

const data = Router();
const last24hours = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); 

data.get("/users", async (req, res) => {
  try {
    const users = await User.find({ createdAt: { $gte: last24hours } });

    res.status(200).send(users);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

data.get("/posts", async (req, res) => {
  try {
    const pets = await Pet.find({ createdAt: { $gte: last24hours } });

    res.status(200).send(pets);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});


data.get("/sales", async (req, res) => {
  try {
    const sales = await Merchant_orders.find({ createdAt: { $gte: last24hours } });

    res.status(200).send(sales);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});
module.exports = data;
