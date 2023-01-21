const { Router } = require("express");
const router = Router();
const mercadopago = require("mercadopago");
require("dotenv").config();
var axios = require("axios");

//configuracion de credenciales de mercado pago

router.post("/", (req, res) => {
  // Agrega credenciales
  mercadopago.configure({
    access_token: process.env.PROD_ACCESS_TOKEN,
  });
  let arr = [];

  const products = req.body;

  for (let i = 0; i < products.length; i++) {
    let obj = {
      id: products[i]._id,
      title: products[i].name,
      unit_price: products[i].price,
      quantity: products[i].amount ? products[i].amount : 1,
    };
    arr.push(obj);
  }
  let preference = {
    items: arr,
    back_urls: {
      success: "http://localhost:3000/popUpHist",
      failure: "http://localhost:3000/404",
      pending: "",
    },
    auto_return: "approved",
  };

  const pay = mercadopago.preferences
    .create(preference)
    .then((response) => res.status(200).send({ response }))
    .catch((error) => res.status(400).send({ error: error.message }));

  console.log(pay);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  var config = {
    method: "get",
    url: `https://api.mercadopago.com/merchant_orders/${id}`,
    headers: {
      Authorization: `Bearer ${process.env.PROD_ACCESS_TOKEN}`,
    },
  };

  axios(config)
    .then(function (response) {
      res.status(200).send(response.data);
    })
    .catch(function (error) {
      res.status(400).send(error);
    });
});

module.exports = router;
