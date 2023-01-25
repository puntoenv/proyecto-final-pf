const express = require("express");
const Product = require("../../models/Product");
const detailProduct = express.Router();

detailProduct.get("/detail/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let detail = await Product.findOne({ _id: id, hidden: false }).populate({
      path: "boughtBy",
      model: "User",
    });

    res.status(200).json(detail);
  } catch (error) {
    console.log("no anda el detail");
    res.status(400).send("no funciona detailProduct.js" + error.message);
  }
});

detailProduct.get("/avg/:id", async (req, res)=> {
  try{
    let {id} = req.params;
    let product = await Product.findById(id)
    let {star_reviews} =product
   if(!star_reviews.length){
    return res.json("No tienes reviews")
   }
    let promedio =  star_reviews.reduce((a,b)=> {
      return a += b.stars
    },0)
    res.json(promedio/star_reviews.length)
  }catch(e){
    
  }
})


module.exports = detailProduct;
