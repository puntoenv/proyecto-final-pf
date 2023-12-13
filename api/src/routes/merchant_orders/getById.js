const express = require("express");
const Merchant_orders = require("../../models/Merchant_orders");
const byid = express.Router();

byid.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let detail = await Merchant_orders.findById({ _id: id });
    res.status(200).send(detail);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = byid;
