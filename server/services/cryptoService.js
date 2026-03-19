const axios = require("axios");

const getCrypto = async (coins) => {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins}&price_change_percentage=7d`;

  const response = await axios.get(url);
  return response.data;
};

module.exports = { getCrypto };