const express = require("express");
const { addToCart, getCartItems } = require("../controllers/CartController");
const cartRoutes = express.Router();

cartRoutes.post("/", addToCart);
cartRoutes.get("/", getCartItems);

module.exports = cartRoutes;
