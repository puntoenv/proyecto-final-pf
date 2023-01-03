const express = require("express");
const router = express.Router();
const detail = require("./detail.js");
const allPets = require("./allPets.js");
const postPet = require("./postPet.js");

router.use("/detail", detail);
router.use("/pets", allPets);
router.use("/postPet", postPet);

module.exports = router;
