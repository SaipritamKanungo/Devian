const { getCurrency } = require("../services/currencyService");

const fetchCurrency = async (req, res) => {
  try {
    const base = req.query.base || "USD";
    const data = await getCurrency(base);
    res.json(data);
  } catch (error) {
    console.error("Currency error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { fetchCurrency };