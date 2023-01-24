const { Router } = require("express");
const cloudinary = require("../../../cloud.js");
const mailer = require("../../../mailer");

const User = require("../../models/User");
const postMerchant_order = Router();
const path = require("path");
const ejs = require("ejs");
const aiText = require("../../../openai.js");

const Merchant_orders = require("../../models/Merchant_orders.js");

postMerchant_order.post("/", async (req, res) => {
  try {
    let {
        id,
        status,
        preference_id,
        payments,
        date_created,
        last_updated,
        total_amount,
        items,
        cancelled,
        order_status,
        
        
    } = req.body;
    let result = [];
    let userId=items[0].category_id;
    const user = await User.findById(userId);
    let merchant_orders = await Merchant_orders.create({
        id,
        status,
        preference_id,
        payments,
        date_created,
        last_updated,
        total_amount,
        items,
        cancelled,
        order_status,
        userId,
      user: user._id,
   
    });
    order = await Merchant_orders.findById(merchant_orders._id)
    user.merchant_orders = user.merchant_orders.concat(merchant_orders);
    await user.save();
   
   
    //console.log(info);
    res.status(200).send(merchant_orders);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error al crear una merchant order ");
  }
});

module.exports = postMerchant_order;