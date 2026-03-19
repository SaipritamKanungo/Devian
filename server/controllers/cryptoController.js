const { getCrypto } = require("../services/cryptoService");

const fetchCrypto = async (req, res) => {
  try {
    const coins = req.query.coins || "bitcoin,ethereum,solana";
    const data = await getCrypto(coins);
    res.json(data);
  } catch (error) {
    console.error("Crypto error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { fetchCrypto };