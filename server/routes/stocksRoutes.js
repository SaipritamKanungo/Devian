const express = require("express");
const router = express.Router();
const { fetchStock } = require("../controllers/stocksController");

router.get("/", fetchStock);

module.exports = router;