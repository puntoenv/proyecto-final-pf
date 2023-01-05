const express = require("express");
const router = express.Router();
const detail = require("./routes/pets/detail");
const allPets = require("./routes/pets/allPets");
const postPet = require("./routes/pets/postPet");
const routeAuth = require("./routes/Auth/routeAuth");
const verifyAuth = require("../middlewares/mw-jwt");
const user = require("./routes/users/profile");

router.use("/pets", allPets);
router.use("/pets", detail);
router.use("/pets", postPet);
router.use("/auth", routeAuth);
router.use("/user", user);
router.use("/updateProfile", updateProfile);

// buyProduct aun no esta listo
router.use("/products", postproducts, getAllProducts, buyProduct);

module.exports = router;
