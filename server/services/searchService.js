const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

const MODEL = "gemini-2.5-flash";

const getGenAI = () => {
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
};

// Check if Gemini response is valid or unknown
const isUnknown = (data) => {
  const unknownPhrases = [
    "not yet released",
    "unavailable",
    "no official",
    "not available",
    "unreleased",
    "n/a",
    "cannot find",
    "no information",
  ];
  const text = JSON.stringify(data).toLowerCase();
  return unknownPhrases.some((phrase) => text.includes(phrase));
};

// Search using Gemini
const searchWithGemini = async (query) => {
  const model = getGenAI().getGenerativeModel({ model: MODEL });
  const prompt = `
    You are a price research assistant. Give current approximate price for: ${query}
    Return ONLY a valid JSON object with exactly these fields, no extra text, no markdown:
    {
      "product": "product name",
      "currentPrice": "current price with currency symbol",
      "lastWeekPrice": "approximate price from last week",
      "priceChange": "difference from last week",
      "source": "likely source like Amazon, Flipkart etc",
      "summary": "brief 1 line summary"
    }
  `;
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
};

// Search using SerpApi (fallback)
const searchWithSerpApi = async (query) => {
  const API_KEY = process.env.SERP_API_KEY;
  const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(query)}&api_key=${API_KEY}&gl=in&hl=en`;

  const response = await axios.get(url);
  const results = response.data.shopping_results?.slice(0, 3) || [];

  if (results.length === 0) return null;

  const model = getGenAI().getGenerativeModel({ model: MODEL });
  const prompt = `
    Based on these Google Shopping results: ${JSON.stringify(results)}
    Return ONLY a valid JSON object with exactly these fields, no extra text, no markdown:
    {
      "product": "product name",
      "currentPrice": "best current price with currency symbol",
      "lastWeekPrice": "approximate price from last week if available",
      "priceChange": "difference from last week or stable",
      "source": "source website",
      "summary": "brief 1 line summary"
    }
  `;
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
};

// Main search function with fallback
const searchProduct = async (query) => {
  const geminiResult = await searchWithGemini(query);
  if (isUnknown(geminiResult)) {
    console.log("Gemini uncertain, falling back to SerpApi...");
    const serpResult = await searchWithSerpApi(query);
    if (serpResult) return serpResult;
  }
  return geminiResult;
};

module.exports = { searchProduct };