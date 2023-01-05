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
router.use("/pets", verifyAuth, detail);
router.use("/pets", verifyAuth, postPet);
router.use("/auth", routeAuth);
router.use("products");
router.use("/user", user);
router.use("/updateProfile", updateProfile);
router.use("/products", postproducts);

module.exports = router;
