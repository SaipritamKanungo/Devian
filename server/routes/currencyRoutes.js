const express = require("express");
const router = express.Router();
const { fetchCurrency } = require("../controllers/currencyController");

router.get("/", fetchCurrency);

module.exports = router;