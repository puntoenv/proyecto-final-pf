// const verifyAuth = require("../middlewares/mw-jwt");
const express = require("express");
const router = express.Router();
const detail = require("./routes/pets/detail");
const allPets = require("./routes/pets/allPets");
const petsByName = require("./routes/pets/getByName");
const postPet = require("./routes/pets/postPet");
const routeAuth = require("./routes/Auth/routeAuth");
const user = require("./routes/users/profile");
const updateProfile = require("./routes/users/updateProfile");
const postproducts = require("./routes/products/postProduct");
const getAllProducts = require("./routes/products/e-shop");
const updateProduct = require("./routes/products/updateProduct");
const filterP = require("./routes/products/getFilteredProducts");
const detailProduct = require("./routes/products/detailProduct");
const allUsers = require("./routes/users/allUsers");
const createUser = require("./routes/users/createUser");
const userByEmail = require("./routes/users/userByEmail");
const productsByName = require("./routes/products/getByName");
const payment = require("./routes/mercadoPago");
const updatePet = require("./routes/pets/updatePet");
const contactUs = require("./routes/ContactUs/routeContactUs");
// NO ESTA LISTO.....................
const buyProduct = require("./routes/products/buyProduct");
const categories = require("./routes/products/categories");
const types = require("./routes/pets/types");
const petsRelated = require("./routes/pets/related");
const productsRelated = require("./routes/products/related");
const adoptEmail = require("./routes/pets/adopt");
const buyEmail = require("./routes/products/buyEmail");
const postMerchant_order = require("./routes/merchant_orders/postMerchantOrder");
const byid = require("./routes/merchant_orders/getById");
const buyHistory = require("./routes/merchant_orders/buyHistory");

router.use("/updatePet", updatePet);
router.use("/pets", petsByName);
router.use("/pets", allPets);
router.use("/pets", detail);
router.use("/pets", postPet);
router.use("/auth", routeAuth);
router.use("/", createUser, userByEmail);
router.use("/users", allUsers);
router.use("/user", user);
router.use("/updateProfile", updateProfile);
router.use("/types", types);
router.use("/petsRelated", petsRelated);
router.use("/adoptEmail", adoptEmail);
// buyProduct aun no esta listo
router.use(
  "/products",
  postproducts,
  getAllProducts,
  buyProduct,
  detailProduct,
  productsByName
);
router.use("/updateProduct", updateProduct);
router.use("/FilteredProducts", filterP);
router.use("/payment", payment);
router.use("/categories", categories);
router.use("/productsRelated", productsRelated);
router.use("/contact-us", contactUs);
router.use("/buyEmail", buyEmail);
router.use("/merchantorders", postMerchant_order, byid);
router.use("/buyHistory", buyHistory);
module.exports = router;
