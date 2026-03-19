import { useState } from 'react'
import axios from 'axios'

const isMobile = () => window.innerWidth < 768

const card = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '24px',
  padding: '32px',
}

const suggestions = [
  'iPhone 17 price in India', 'PS5 price in India',
  'Samsung 65 inch TV price', 'MacBook Air M3 price',
  'RTX 5090 price in India', 'OnePlus 13 price',
]

export default function AISearch() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const mobile = isMobile()

  const fetchSearch = async (q) => {
    const searchQuery = q || query
    if (!searchQuery) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/search?query=${encodeURIComponent(searchQuery)}`)
      setResult(res.data)
    } catch {
      setError('Search failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: mobile ? '24px 16px' : '40px', maxWidth: '1100px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: mobile ? '32px' : '40px', fontWeight: 900, marginBottom: '8px' }}>
          🤖 <span style={{ color: '#a78bfa' }}>AI Search</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>Search any product price powered by AI + Google</p>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexDirection: mobile ? 'column' : 'row' }}>
        <input
          type="text"
          placeholder="e.g. iPhone 17 price in India"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchSearch()}
          style={{
            flex: 1, background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px', padding: '14px 20px',
            color: '#fff', fontSize: '15px', outline: 'none',
            fontFamily: 'Urbanist, sans-serif'
          }}
        />
        <button onClick={() => fetchSearch()} disabled={loading} style={{
          background: '#7c3aed', border: 'none', borderRadius: '16px',
          padding: '14px 28px', color: '#fff', fontSize: '15px',
          fontWeight: 700, cursor: 'pointer', fontFamily: 'Urbanist, sans-serif',
          opacity: loading ? 0.6 : 1
        }}>
          {loading ? '🔍 Searching...' : '🔍 Search'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}>
        {suggestions.map(s => (
          <button key={s} onClick={() => { setQuery(s); fetchSearch(s) }} style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px', padding: '8px 14px', color: 'rgba(255,255,255,0.6)',
            fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Urbanist, sans-serif'
          }}>
            {s}
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', paddingTop: '80px' }}>
          <div style={{ fontSize: '70px', marginBottom: '16px' }}>🤖</div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '18px' }}>AI is searching the web for you...</p>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '14px', marginTop: '8px' }}>This may take a few seconds</p>
        </div>
      )}

      {error && <p style={{ color: '#f87171' }}>{error}</p>}

      {result && !loading && (
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
          <div style={{ ...card, border: '1px solid rgba(124,58,237,0.4)', background: 'rgba(124,58,237,0.08)' }}>
            <span style={{
              background: 'rgba(124,58,237,0.2)', color: '#a78bfa',
              fontSize: '12px', fontWeight: 700, padding: '6px 14px',
              borderRadius: '20px', display: 'inline-block', marginBottom: '20px'
            }}>🤖 AI Result</span>
            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '20px' }}>{result.product}</h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginBottom: '8px' }}>Current Price</p>
            <p style={{ fontSize: '48px', fontWeight: 900, color: '#a78bfa', lineHeight: 1, marginBottom: '20px' }}>
              {result.currentPrice}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.6 }}>{result.summary}</p>
          </div>

          <div style={card}>
            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: 'rgba(255,255,255,0.7)' }}>Price Details</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Current Price', value: result.currentPrice, icon: '💰' },
                { label: 'Last Week Price', value: result.lastWeekPrice, icon: '📅' },
                { label: 'Price Change', value: result.priceChange, icon: '📊' },
                { label: 'Source', value: result.source, icon: '🔗' },
              ].map(item => (
                <div key={item.label} style={{
                  background: 'rgba(0,0,0,0.2)', borderRadius: '14px',
                  padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px'
                }}>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', whiteSpace: 'nowrap' }}>{item.icon} {item.label}</p>
                  <p style={{ fontWeight: 700, fontSize: '14px', textAlign: 'right' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!result && !loading && !error && (
        <div style={{ textAlign: 'center', paddingTop: '80px' }}>
          <div style={{ fontSize: '80px', marginBottom: '16px' }}>🔍</div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '18px' }}>Search any product to get AI-powered price data</p>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '14px', marginTop: '8px' }}>Powered by Gemini AI + Google Search</p>
        </div>
      )}
    </div>
  )
}