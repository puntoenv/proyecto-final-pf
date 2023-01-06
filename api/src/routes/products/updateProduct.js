// en proceso...
const Router  = require("express");
const Product = require("../../models/Product");
const updateProduct = Router();

updateProduct.put("/:_id", async (req, res) => {
        try {
        
        let {
        name,
        description,
        image,
        price,
        stock,
        category
            } = req.body;

    let product = await Product.findOne(Product._id =req.params.id);
    console.log(product);

    product.name = name ? name : product.name;
    product.description = description ? description : product.description;
    product.image = image ? image : product.image;
    product.price = price ? price : product.price;
    product.stock = stock ? stock : product.stock;
    product.category = category ? category : product.category;
    let updateProduct = await product.updateOne(product);
    res.status(200).json(updateProduct);
        } catch (error) {
    res.status(400).json("no anda el putProduct"+error);
    }
});

module.exports = updateProduct;









/*
                                        ◥------◥
                                        l ● ▄ ◉ l ѠOOƑ!
                                        l‿/ʊ\‿l
                                        l══o══l
                                        ︳ ︳︳ l⊃
                                        ఋ︵ ఋ




 */
