const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://devian-client.vercel.app', '*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Routes
const weatherRoutes = require("./routes/weatherRoutes");
const cryptoRoutes = require("./routes/cryptoRoutes");
const currencyRoutes = require("./routes/currencyRoutes");
const stocksRoutes = require("./routes/stocksRoutes");
const searchRoutes = require("./routes/searchRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");

app.get("/", (req, res) => {
  res.json({ message: "Devian API is running! 🚀" });
});

app.use("/api/weather", weatherRoutes);
app.use("/api/crypto", cryptoRoutes);
app.use("/api/currency", currencyRoutes);
app.use("/api/stocks", stocksRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/emergency", emergencyRoutes);

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`✅ Devian server running on port ${PORT}`);
  });
}

module.exports = app;