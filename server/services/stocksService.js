const axios = require("axios");

const getStock = async (symbol) => {
  const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

  const response = await axios.get(url);
  return response.data;
};

module.exports = { getStock };