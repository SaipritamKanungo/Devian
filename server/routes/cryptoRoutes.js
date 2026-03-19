const express = require("express");
const router = express.Router();
const { fetchCrypto } = require("../controllers/cryptoController");

router.get("/", fetchCrypto);

module.exports = router;