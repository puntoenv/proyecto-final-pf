const { Router } = require("express");
const { related } = require("../../controllers/relateds/relatedUserBuy");
const Product = require("../../models/Product");
const Merchant_orders = require("../../models/Merchant_orders");
const router = Router();
const mercadopago = require("mercadopago");
require("dotenv").config();
const axios = require("axios");

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
      category_id: products[i].id_User,
      id: products[i]._id, // +` | id-del-usuario: ${products[i].id_User}`,
      title: products[i].name,
      unit_price: products[i].price,
      quantity: products[i].amount ? products[i].amount : 1,
    };
    // console.log("id PRoducto-----", products[i]._id);
    arr.push(obj);
  }
  let preference = {
    items: arr,
    back_urls: {
      success: "https://proyecto-final-pf.vercel.app/popUpHist",
      failure: "https://proyecto-final-pf.vercel.app/cart",
      pending: "",
    },
    // auto_return: "approved",

    //notification_url:"https://07ec-2802-8010-a805-1b00-758d-9c13-3e99-4d73.sa.ngrok.io/payment/buyNotification",
  };
  mercadopago.preferences
    .create(preference)
    .then((response) => {
      console.log(response);
      res.status(200).send({ response });
    })
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

    const idUser = data.items[0].category_id; //id.split(" | id-del-usuario: ")[1];
    console.log("id PRoducto-----", idUser);
    const productsId = data.items.map(
      (product) => product.id //.split(" | id-del-usuario: ")[0]
    );
    related(idUser, productsId, data, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  //  === aprovved ==> buscarUser ==> relacionar con el producto y viseverza
});

router.put("/update/:id_product/:quantity", async (req, res) => {
  try {
    let { id_product, quantity } = req.params;
    let product = await Product.findById(id_product);

    let { name, description, price, boughtBy, hidden, image, stock, category } =
      req.body;

    product.name = name ? name : product.name;
    product.description = description ? description : product.description;
    product.price = price ? price : product.price;
    product.boughtBy = boughtBy ? boughtBy : product.boughtBy;
    product.stock = product.stock - quantity;
    product.category = category ? category : product.category;

    let save = await product.save();
    console.log(save);
    res.status(200).send(product + "funciono el put a mp");
  } catch (error) {
    console.log(error + "no funciono el put a mp");
  }
});

router.post("/buyNotification/:idMo", async (req, res) => {
  try {
    const { idMo } = req.params;

    const merchant_order = await mercadopago.merchant_orders.findById(idMo);

    const mOrderVerify = await Merchant_orders.findOne({ id: idMo });

    if (merchant_order.body.id && mOrderVerify == null) {
      await axios.post(
        `https://proyecto-final-pf-production.up.railway.app/merchantorders`,
        merchant_order.body
      );

      if (
        merchant_order.body.payments[0].status == "approved" &&
        merchant_order.body.payments[0].status_detail == "accredited"
      ) {
        for (let i = 0; i < merchant_order.body.items.length; i++) {
          let quantity = merchant_order.body.items[i].quantity;

          let id_product = merchant_order.body.items[i].id;

          await axios.put(
            `https://proyecto-final-pf-production.up.railway.app/payment/update/${id_product}/${quantity}`
          ); 
        }
      }
    }

    res.status(200);
  } catch (error) {
    res.status(404);
  }
});

module.exports = router;
