const express = require("express");
const router = express.Router();
const detail = require("./routes/pets/detail");
const allPets = require("./routes/pets/allPets");
const postPet = require("./routes/pets/postPet");
const routeAuth = require("./routes/Auth/routeAuth");
const user = require("./routes/users/profile");

router.use("/pets", detail, allPets, postPet);
router.use("/auth", routeAuth);
router.use("/user", user);
router.use("/postUser", userPost);

module.exports = router;
