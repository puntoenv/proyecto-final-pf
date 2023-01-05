const express = require("express");
const router = express.Router();
const detail = require("./routes/pets/detail");
const allPets = require("./routes/pets/allPets");
const postPet = require("./routes/pets/postPet");
const routeAuth = require("./routes/Auth/routeAuth");
const user = require("./routes/users/profile");
const updateProfile = require("./routes/users/profile");
const postproducts= require("./routes/products/postProduct");

router.use("/pets", detail, allPets, postPet);
router.use("/auth", routeAuth);
router.use("/user", user);
router.use("/updateProfile", updateProfile);
router.use("/products", postproducts);

module.exports = router;
