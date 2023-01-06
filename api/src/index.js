const express = require("express");
const router = express.Router();
const detail = require("./routes/pets/detail");
const allPets = require("./routes/pets/allPets");
const postPet = require("./routes/pets/postPet");
const routeAuth = require("./routes/Auth/routeAuth");
const verifyAuth = require("../middlewares/mw-jwt");
const user = require("./routes/users/profile");
const updateProfile = require("./routes/users/profile");
const postproducts = require("./routes/products/postProduct");
const getAllProducts = require("./routes/products/e-shop");
const updateProduct = require("./routes/products/updateProduct");
const filterP = require("./routes/products/getFilteredProducts");
const detailProduct = require("./routes/products/detailProduct");

// NO ESTA LISTO.....................
const buyProduct = require("./routes/products/buyProduct");

// AGREGAR PARA EL PRIMER SPRINT EL VERIFY AUTH PARA LAS SIGUIENTES RUTAS
/* RUTAS SEGURAS
detail pet
detail produt
profile user
update pet
compra producto
post pet
*/

router.use("/pets", allPets);
router.use("/pets", detail);
router.use("/pets", postPet);
router.use("/auth", routeAuth);
router.use("/user", user);
router.use("/updateProfile", updateProfile);

// buyProduct aun no esta listo
router.use("/products", postproducts, getAllProducts, buyProduct,detailProduct);
router.use("/updateProduct", updateProduct);
router.use("/FilteredProducts", filterP);

module.exports = router;
