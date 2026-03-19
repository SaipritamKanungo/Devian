import { useState, useEffect } from 'react'
import axios from 'axios'

const isMobile = () => window.innerWidth < 768
const isTablet = () => window.innerWidth < 1024

const subCard = {
  background: 'rgba(0,0,0,0.2)',
  borderRadius: '12px',
  padding: '12px',
  flex: 1,
  textAlign: 'center',
}

export default function Crypto() {
  const [cryptos, setCryptos] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const mobile = isMobile()
  const tablet = isTablet()

  const fetchCrypto = async () => {
    setLoading(true)
    try {
      const res = await axios.get('http://localhost:5000/api/crypto?coins=bitcoin,ethereum,solana,dogecoin,cardano,polkadot')
      setCryptos(res.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCrypto() }, [])

  const filtered = cryptos.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.symbol.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ padding: mobile ? '24px 16px' : '40px', maxWidth: '1100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: mobile ? '32px' : '40px', fontWeight: 900, marginBottom: '8px' }}>
            🪙 <span style={{ color: '#a78bfa' }}>Crypto</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>Live cryptocurrency market data</p>
        </div>
        <button onClick={fetchCrypto} style={{
          background: '#7c3aed', border: 'none', borderRadius: '14px',
          padding: '12px 20px', color: '#fff', fontSize: '14px',
          fontWeight: 700, cursor: 'pointer', fontFamily: 'Urbanist, sans-serif'
        }}>🔄 Refresh</button>
      </div>

      <input
        type="text"
        placeholder="Search crypto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%', background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px', padding: '14px 20px',
          color: '#fff', fontSize: '15px', outline: 'none',
          fontFamily: 'Urbanist, sans-serif', marginBottom: '28px',
          boxSizing: 'border-box'
        }}
      />

      {loading && (
        <div style={{ textAlign: 'center', paddingTop: '80px' }}>
          <div style={{ fontSize: '60px', marginBottom: '16px' }}>⏳</div>
          <p style={{ color: 'rgba(255,255,255,0.4)' }}>Fetching crypto data...</p>
        </div>
      )}

      {!loading && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : tablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: '20px'
        }}>
          {filtered.map((coin) => {
            const isPos = coin.price_change_percentage_7d_in_currency > 0
            return (
              <div key={coin.id}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '24px', padding: '24px', transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(124,58,237,0.15)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <img src={coin.image} alt={coin.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                  <div>
                    <p style={{ fontWeight: 800, fontSize: '16px' }}>{coin.name}</p>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', textTransform: 'uppercase' }}>{coin.symbol}</p>
                  </div>
                  <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>#{coin.market_cap_rank}</span>
                </div>

                <p style={{ fontSize: '26px', fontWeight: 900, marginBottom: '14px' }}>
                  ${coin.current_price.toLocaleString()}
                </p>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
                  <div style={subCard}>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '4px' }}>24h</p>
                    <p style={{ fontWeight: 700, fontSize: '14px', color: coin.price_change_percentage_24h > 0 ? '#4ade80' : '#f87171' }}>
                      {coin.price_change_percentage_24h > 0 ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
                    </p>
                  </div>
                  <div style={subCard}>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '4px' }}>7d</p>
                    <p style={{ fontWeight: 700, fontSize: '14px', color: isPos ? '#4ade80' : '#f87171' }}>
                      {isPos ? '+' : ''}{coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
                    </p>
                  </div>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '12px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '4px' }}>Market Cap</p>
                  <p style={{ fontWeight: 700 }}>${(coin.market_cap / 1e9).toFixed(2)}B</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}