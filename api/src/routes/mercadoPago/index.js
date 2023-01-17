const { Router } = require("express");
const router = Router();
const mercadopago = require("mercadopago");
require("dotenv").config();

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
      title: products[i].name,
      unit_price: products[i].price,
      quantity: 1,
    };
    arr.push(obj);
  }
  let preference = {
    items: arr,
    back_urls: {
      success: "http://localhost:3000/eShop",
      failure: "http://localhost:3000/404",
      pending: "",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then((response) => res.status(200).send({ response }))
    .catch((error) => res.status(400).send({ error: error.message }));
});

module.exports = router;
