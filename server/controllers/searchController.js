const { searchProduct } = require("../services/searchService");

const fetchSearch = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Query is required" });

    const data = await searchProduct(query);
    res.json(data);
  } catch (error) {
    console.error("Search error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { fetchSearch };