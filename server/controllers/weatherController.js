const { getWeather } = require("../services/weatherService");

const fetchWeather = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) return res.status(400).json({ error: "City is required" });

    const data = await getWeather(city);
    res.json(data);
  } catch (error) {
    console.error("Weather error:", error.message);
    res.status(500).json({ error: error.message }); 
  }
};

module.exports = { fetchWeather };