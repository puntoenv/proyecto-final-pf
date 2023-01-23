const { Router } = require("express");
const { related } = require("../../controllers/relateds/relatedUserBuy");
const router = Router();
const mercadopago = require("mercadopago");
require("dotenv").config();
var axios = require("axios");

//configuracion de credenciales de mercado pago

router.post("/", async (req, res) => {
  // Agrega credenciales
  mercadopago.configure({
    access_token: process.env.PROD_ACCESS_TOKEN,
  });
  let arr = [];

  const products = req.body;

  for (let i = 0; i < products.length; i++) {
    let obj = {
      id: products[i]._id + ` | id-del-usuario: ${products[i].id_User}`,
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

  mercadopago.preferences
    .create(preference)
    .then((response) => res.status(200).send({ response }))
    .catch((error) => res.status(400).send({ error: error.message }));
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

  try {
    const response = await axios(config);
    const data = response.data;

    const idUser = data.items[0].id.split(" | id-del-usuario: ")[1];
    const productsId = data.items.map(
      (product) => product.id.split(" | id-del-usuario: ")[0]
    );
    related(idUser, productsId, data, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  //  === aprovved ==> buscarUser ==> relacionar con el producto y viseverza
});

module.exports = router;
