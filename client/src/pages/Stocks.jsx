import { useState } from 'react'
import axios from 'axios'

const isMobile = () => window.innerWidth < 768

const card = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '24px',
  padding: '32px',
}

const subCard = {
  background: 'rgba(0,0,0,0.2)',
  borderRadius: '14px',
  padding: '16px',
}

const stockNameMap = {
  'apple': 'AAPL', 'google': 'GOOGL', 'alphabet': 'GOOGL',
  'microsoft': 'MSFT', 'tesla': 'TSLA', 'amazon': 'AMZN',
  'meta': 'META', 'facebook': 'META', 'nvidia': 'NVDA',
  'netflix': 'NFLX', 'uber': 'UBER', 'spotify': 'SPOT',
  'adobe': 'ADBE', 'intel': 'INTC', 'amd': 'AMD',
  'paypal': 'PYPL', 'disney': 'DIS', 'walmart': 'WMT',
  'infosys': 'INFY', 'wipro': 'WIPRO.NS',
}

const resolveSymbol = (input) => stockNameMap[input.toLowerCase().trim()] || input.toUpperCase()
const popularStocks = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'META']

export default function Stocks() {
  const [symbol, setSymbol] = useState('')
  const [stock, setStock] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const mobile = isMobile()

  const fetchStock = async (sym) => {
    const query = resolveSymbol(sym || symbol)
    if (!query) return
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/stocks?symbol=${query}`)
      const quote = res.data['Global Quote']
      if (!quote || !quote['05. price']) {
        setError('Stock not found or API limit reached.')
        setStock(null)
        return
      }
      setStock(quote)
    } catch {
      setError('Failed to fetch stock data')
    } finally {
      setLoading(false)
    }
  }

  const isPositive = stock && parseFloat(stock['09. change']) > 0

  return (
    <div style={{ padding: mobile ? '24px 16px' : '40px', maxWidth: '1100px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: mobile ? '32px' : '40px', fontWeight: 900, marginBottom: '8px' }}>
          📈 <span style={{ color: '#a78bfa' }}>Stocks</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>Real-time stock market data</p>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexDirection: mobile ? 'column' : 'row' }}>
        <input
          type="text"
          placeholder="Search by name or symbol e.g. Apple or AAPL"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchStock()}
          style={{
            flex: 1, background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px', padding: '14px 20px',
            color: '#fff', fontSize: '15px', outline: 'none',
            fontFamily: 'Urbanist, sans-serif'
          }}
        />
        <button onClick={() => fetchStock()} style={{
          background: '#7c3aed', border: 'none', borderRadius: '16px',
          padding: '14px 28px', color: '#fff', fontSize: '15px',
          fontWeight: 700, cursor: 'pointer', fontFamily: 'Urbanist, sans-serif'
        }}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}>
        {popularStocks.map(s => (
          <button key={s} onClick={() => { setSymbol(s); fetchStock(s) }} style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px', padding: '8px 16px', color: 'rgba(255,255,255,0.6)',
            fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Urbanist, sans-serif'
          }}>
            {s}
          </button>
        ))}
      </div>

      {error && <p style={{ color: '#f87171', marginBottom: '24px' }}>{error}</p>}

      {loading && (
        <div style={{ textAlign: 'center', paddingTop: '80px' }}>
          <div style={{ fontSize: '60px', marginBottom: '16px' }}>⏳</div>
          <p style={{ color: 'rgba(255,255,255,0.4)' }}>Fetching stock data...</p>
        </div>
      )}

      {stock && !loading && (
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
          <div style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '28px', fontWeight: 900 }}>{stock['01. symbol']}</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '4px', fontSize: '13px' }}>
                  Latest: {stock['07. latest trading day']}
                </p>
              </div>
              <span style={{ fontSize: '32px' }}>{isPositive ? '📈' : '📉'}</span>
            </div>
            <p style={{ fontSize: '64px', fontWeight: 900, color: '#a78bfa', lineHeight: 1, marginBottom: '12px' }}>
              ${parseFloat(stock['05. price']).toFixed(2)}
            </p>
            <p style={{ fontSize: '18px', fontWeight: 700, color: isPositive ? '#4ade80' : '#f87171' }}>
              {isPositive ? '▲' : '▼'} {parseFloat(stock['09. change']).toFixed(2)} ({stock['10. change percent']})
            </p>
          </div>

          <div style={card}>
            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: 'rgba(255,255,255,0.7)' }}>Details</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { label: 'Open', value: `$${parseFloat(stock['02. open']).toFixed(2)}`, icon: '🔓' },
                { label: 'Prev Close', value: `$${parseFloat(stock['08. previous close']).toFixed(2)}`, icon: '🔒' },
                { label: 'High', value: `$${parseFloat(stock['03. high']).toFixed(2)}`, icon: '🔼' },
                { label: 'Low', value: `$${parseFloat(stock['04. low']).toFixed(2)}`, icon: '🔽' },
                { label: 'Volume', value: parseInt(stock['06. volume']).toLocaleString(), icon: '📊' },
                { label: 'Change %', value: stock['10. change percent'], icon: '📉' },
              ].map((item) => (
                <div key={item.label} style={subCard}>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginBottom: '6px' }}>{item.icon} {item.label}</p>
                  <p style={{ fontWeight: 700, fontSize: '15px' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!stock && !loading && !error && (
        <div style={{ textAlign: 'center', paddingTop: '80px' }}>
          <div style={{ fontSize: '80px', marginBottom: '16px' }}>📊</div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '18px' }}>Search by company name or stock symbol</p>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '14px', marginTop: '8px' }}>e.g. "Apple", "Tesla", "Microsoft"</p>
        </div>
      )}
    </div>
  )
}