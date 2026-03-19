# 🌐 Devian — Universal Data Dashboard

> One place for every type of data you'd ever need.

Devian is a full-stack universal data dashboard built with the MERN stack and powered by Gemini AI. Get live weather, stocks, crypto, currency, AI-powered product price search, and emergency numbers — all in one sleek dark interface.


## ✨ Features

- 🌤️ **Weather** — Live weather data for any city worldwide
- 📈 **Stocks** — Real-time global stock market data
- 🪙 **Crypto** — Live cryptocurrency prices & 7-day trends
- 💱 **Currency** — Forex exchange rates & converter
- 🤖 **AI Search** — Search any product price with Gemini AI + Google
- 🚨 **Emergency** — Emergency contact numbers by country
- 📱 **Responsive** — Works on mobile, tablet & desktop
- 🎨 **Glassmorphism UI** — Clean dark aesthetic with violet accents


## 🛠️ Tech Stack

| Layer | Technology |
| Frontend | React.js + Vite + Tailwind CSS |
| Backend | Node.js + Express.js |
| AI | Google Gemini API |
| Search Fallback | SerpApi |
| Styling | Glassmorphism + Urbanist Font |


## 🔌 APIs Used

| Data | API |
| Weather | OpenWeatherMap |
| Stocks | Alpha Vantage |
| Crypto | CoinGecko |
| Currency | ExchangeRate-API |
| AI Price Search | Gemini AI + SerpApi |
| Emergency Numbers | Static Dataset |


## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm

### 1️⃣ Clone the repo

git clone https://github.com/SaipritamKanungo/devian.git
cd devian

### 2️⃣ Setup the backend

cd server
npm install

Create a ".env" file inside "server/" And Paste The Following In It 👇

GEMINI_API_KEY=your_key_here
OPENWEATHER_API_KEY=your_key_here
EXCHANGERATE_API_KEY=your_key_here
ALPHA_VANTAGE_API_KEY=your_key_here
SERP_API_KEY=your_key_here
PORT=5000

Start the server 👇

npm run dev


### 3️⃣ Setup the frontend

cd ../client
npm install
npm run dev


### 4️⃣ Open the app

http://localhost:5173



## 📁 Project Structure

devian/
├── client/          # React.js frontend
│   ├── src/
│   │   ├── pages/   # All page components
│   │   └── App.jsx  # Main app with routing
│   └── vite.config.js
│
├── server/          # Node.js backend
│   ├── routes/      # API routes
│   ├── controllers/ # Route controllers
│   ├── services/    # Business logic & API calls
│   └── index.js     # Entry point
│
└── README.md



## 🌐 Deployment

- **Frontend** → Vercel
- **Backend** → Render / Railway


## 👨‍💻 Developer

Built by **Saipritam Kanungo**

- GitHub: [@SaipritamKanungo](https://github.com/SaipritamKanungo)
- LinkedIn: [saipritam-kanungo](https://linkedin.com/in/saipritam-kanungo)

---

## 📄 License
MIT License — feel free to use and modify!