const { getStock } = require("../services/stocksService");

const fetchStock = async (req, res) => {
  try {
    const symbol = req.query.symbol || "AAPL";
    const data = await getStock(symbol);
    res.json(data);
  } catch (error) {
    console.error("Stocks error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { fetchStock };