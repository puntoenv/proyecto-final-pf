const express = require("express");
const router = express.Router();
const detail = require("./detail.js");
const allPets = require("./allPets.js");
const postPet = require("./postPet.js");
const routeAuth = require("./routeAuth");

router.use("/detail", detail);
router.use("/pets", allPets);
router.use("/postPet", postPet);
router.use("/auth", routeAuth);

module.exports = router;
