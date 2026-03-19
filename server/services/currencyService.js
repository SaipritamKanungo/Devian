const axios = require("axios");

const getCurrency = async (base) => {
  const API_KEY = process.env.EXCHANGERATE_API_KEY;
  const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`;

  const response = await axios.get(url);
  return response.data;
};

module.exports = { getCurrency };