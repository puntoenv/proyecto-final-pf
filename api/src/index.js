const express = require("express");
const router = express.Router();
const detail = require("./routes/pets/detail");
const allPets = require("./routes/pets/allPets");
const postPet = require("./routes/pets/postPet");
const routeAuth = require("./routes/Auth/routeAuth");

router.use("/detail", detail);
router.use("/pets", allPets);
router.use("/postPet", postPet);
router.use("/auth", routeAuth);

module.exports = router;
