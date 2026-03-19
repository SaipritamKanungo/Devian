const express = require("express");
const router = express.Router();
const { fetchSearch } = require("../controllers/searchController");

router.get("/", fetchSearch);

module.exports = router;