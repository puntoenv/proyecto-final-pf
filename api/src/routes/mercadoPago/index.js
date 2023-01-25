const { Router } = require("express");
const { related } = require("../../controllers/relateds/relatedUserBuy");
const Product = require("../../models/Product");
const Merchant_orders = require("../../models/Merchant_orders");
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
      category_id: products[i].id_User,
      id: products[i]._id, // +` | id-del-usuario: ${products[i].id_User}`,
      title: products[i].name,
      unit_price: products[i].price,
      quantity: products[i].amount ? products[i].amount : 1,
    };
    arr.push(obj);
  }
  let preference = {
    items: arr,
    back_urls: {
      success: "https://proyecto-final-pf.vercel.app/popUpHist",
      failure: "https://proyecto-final-pf.vercel.app/cart",
      pending: "",
    },
    auto_return: "approved",

    notification_url:
      "https://proyecto-final-pf-production.up.railway.app/payment/buyNotification",
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

    const idUser = data.items[0].category_id; //id.split(" | id-del-usuario: ")[1];
    const productsId = data.items.map(
      (product) => product.id //.split(" | id-del-usuario: ")[0]
    );
    related(idUser, productsId, data, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  //  === aprovved ==> buscarUser ==> relacionar con el producto y viseverza
});

router.put("/update/:id_user/:id_product/:quantity", async (req, res) => {
  try {
    let { id_user, id_product, quantity } = req.params;
    let product = await Product.findById(id_product);
    const stockTT = product.stock;

    //let user = await User.findById(id_user);
    /* console.log(quantity)
        console.log("esto es quantity")
        console.log(quantity)
    */
    let { name, description, price, boughtBy, hidden, image, stock, category } =
      req.body;
    let stockT = stockTT;

    let quantityT = stockT - quantity;
    /*console.log (product.stock)    
    console.log("esto es product.stock")
    console.log (product.stock) */

    product.name = name ? name : product.name;
    product.description = description ? description : product.description;
    product.price = price ? price : product.price;
    product.boughtBy = boughtBy ? boughtBy : product.boughtBy;
    product.stock = stockT - quantity;
    product.category = category ? category : product.category;

    /*
        console.log (quantityT)    
        console.log("esto es quantityT")
        console.log (quantityT) 
        console.log(quantity)
        console.log("esto es quantity")
        console.log(quantity)
        console.log (product.stock)    
        console.log("esto es product.stock despues")
        console.log (product.stock) 
*/

    let save = await product.save();
    console.log(save);
    res.status(200).send(product + "funciono el put a mp");
  } catch (error) {
    console.log(error + "no funciono el put a mp");
  }
});

router.post("/buyNotification", async (req, res) => {
  try {
    const { query } = req;
    const topic = query.topic;
    const idMo = query.id;
    res.send();
    var merchant_order;

    switch (topic) {
      case "payments":
        const paymentId = query.id;
        //console.log(topic, "geting payment",paymentId);
        const payment = await mercadopago.merchant_orders.findById(
          paymentId.body.order.id
        );
        merchant_order = await mercadopago.merchant_orders.findById(
          payment.body.order.id
        );
        //console.log(payment)
        break;
      case "merchant_order":
        const orderId = query.id;
        merchant_order = await mercadopago.merchant_orders.findById(orderId);
      default:
        break;
    }

    /*

console.log("notificac;ion");
console.log("notifica;cion");
console.log(merchant_order.body);
console.log("notificacion");
console.log("notificacion");
console.log(query);*/

    /*

console.log("merchant_order")
console.log(merchant_order.body)
console.log("merchant_order")
console.log("notificacion")
console.log(idMo)
console.log("notificacion")
*/

    /* 
console.log("mOrderVerifyn")
console.log("mOrderVerifyn")
console.log(mOrderVerify)
console.log(mOrderVerify)
console.log("mOrderVerifyn")
console.log("mOrderVerifyn")
*/
const mOrderVerify= await Merchant_orders.findOne({id:idMo})
   
if (merchant_order.body.id && mOrderVerify==null){
  await axios.post(`http://localhost:3001/merchantorders`,merchant_order.body);


      if (merchant_order.body.payments[0].status=='approved'&&merchant_order.body.payments[0].status_detail=='accredited') {
        
      
    
      
     
    for (let i = 0; i < merchant_order.body.items.length; i++) {
  
  let quantity=merchant_order.body.items[i].quantity
   
     let id_product=merchant_order.body.items[i].id
  
     await axios.put(`http://localhost:3001/payment/update/123/${id_product}/${quantity}`) //item)
       }
      
      
      
      
     }
     
    }
    /*
console.log("merchant_order")
console.log("merchant_order")
console.log(merchant_order)
console.log("merchant_order")
console.log("merchant_order")
*/

res.sendStatus(200);
} catch (error) {
  res.sendStatus(404);
}




})




module.exports = router;
