const { getEmergency } = require("../services/emergencyService");

const fetchEmergency = async (req, res) => {
  try {
    const country = req.query.country || "IN";
    const data = getEmergency(country);
    res.json(data);
  } catch (error) {
    console.error("Emergency error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { fetchEmergency };