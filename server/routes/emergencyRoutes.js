const express = require("express");
const router = express.Router();
const { fetchEmergency } = require("../controllers/emergencyController");

router.get("/", fetchEmergency);

module.exports = router;