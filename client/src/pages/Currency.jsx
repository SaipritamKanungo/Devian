import { useState, useEffect } from 'react'
import axios from 'axios'

const isMobile = () => window.innerWidth < 768
const isTablet = () => window.innerWidth < 1024

const card = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '24px',
  padding: '28px',
}

const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'INR', 'AUD', 'CAD', 'SGD', 'AED', 'CHF', 'CNY', 'KRW']
const currencyNames = {
  USD: 'US Dollar', EUR: 'Euro', GBP: 'British Pound', JPY: 'Japanese Yen',
  INR: 'Indian Rupee', AUD: 'Australian Dollar', CAD: 'Canadian Dollar',
  SGD: 'Singapore Dollar', AED: 'UAE Dirham', CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan', KRW: 'South Korean Won', NZD: 'New Zealand Dollar',
  ZAR: 'South African Rand', BRL: 'Brazilian Real', SAR: 'Saudi Riyal',
}
const currencyFlags = {
  USD: '🇺🇸', EUR: '🇪🇺', GBP: '🇬🇧', JPY: '🇯🇵', INR: '🇮🇳',
  AUD: '🇦🇺', CAD: '🇨🇦', SGD: '🇸🇬', AED: '🇦🇪', CHF: '🇨🇭',
  CNY: '🇨🇳', KRW: '🇰🇷', NZD: '🇳🇿', ZAR: '🇿🇦', BRL: '🇧🇷', SAR: '🇸🇦',
}

export default function Currency() {
  const [base, setBase] = useState('USD')
  const [rates, setRates] = useState(null)
  const [loading, setLoading] = useState(true)
  const [amount, setAmount] = useState(1)
  const [search, setSearch] = useState('')
  const mobile = isMobile()
  const tablet = isTablet()

  const fetchCurrency = async (b) => {
    setLoading(true)
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/currency?base=${b || base}`)
      setRates(res.data.conversion_rates)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCurrency() }, [])

  const handleBaseChange = (b) => { setBase(b); fetchCurrency(b) }

  const displayCurrencies = search
    ? Object.entries(rates || {}).filter(([code]) =>
        code.toLowerCase().includes(search.toLowerCase()) ||
        (currencyNames[code] || '').toLowerCase().includes(search.toLowerCase())
      ).slice(0, 12)
    : popularCurrencies.filter(c => c !== base).map(c => [c, rates?.[c]])

  return (
    <div style={{ padding: mobile ? '24px 16px' : '40px', maxWidth: '1100px' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: mobile ? '32px' : '40px', fontWeight: 900, marginBottom: '8px' }}>
          💱 <span style={{ color: '#a78bfa' }}>Currency</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>Live forex exchange rates</p>
      </div>

      {/* Converter Card */}
      <div style={{ ...card, marginBottom: '28px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: 'rgba(255,255,255,0.7)' }}>
          💰 Converter
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : '1fr 1fr 1fr',
          gap: '16px', alignItems: 'end'
        }}>

          {/* Amount with +/- */}
          <div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginBottom: '8px' }}>Amount</p>
            <div style={{
              display: 'flex', alignItems: 'center',
              background: 'rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '14px', overflow: 'hidden'
            }}>
              <button
                onClick={() => setAmount(a => Math.max(1, Number(a) - 1))}
                style={{
                  background: 'transparent', border: 'none',
                  color: '#a78bfa', fontSize: '22px', fontWeight: 700,
                  padding: '12px 16px', cursor: 'pointer',
                  fontFamily: 'Urbanist, sans-serif', lineHeight: 1
                }}
              >−</button>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{
                  flex: 1, background: 'transparent', border: 'none',
                  color: '#fff', fontSize: '16px', fontWeight: 700,
                  outline: 'none', fontFamily: 'Urbanist, sans-serif',
                  textAlign: 'center', MozAppearance: 'textfield',
                }}
              />
              <button
                onClick={() => setAmount(a => Number(a) + 1)}
                style={{
                  background: 'transparent', border: 'none',
                  color: '#a78bfa', fontSize: '22px', fontWeight: 700,
                  padding: '12px 16px', cursor: 'pointer',
                  fontFamily: 'Urbanist, sans-serif', lineHeight: 1
                }}
              >+</button>
            </div>
          </div>

          {/* From */}
          <div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginBottom: '8px' }}>From</p>
            <select
              value={base}
              onChange={(e) => handleBaseChange(e.target.value)}
              style={{
                width: '100%', background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '14px', padding: '13px 16px',
                color: '#fff', fontSize: '14px', outline: 'none',
                fontFamily: 'Urbanist, sans-serif', boxSizing: 'border-box',
                cursor: 'pointer'
              }}
            >
              {Object.keys(currencyNames).map(c => (
                <option key={c} value={c} style={{ background: '#1a1a1a' }}>
                  {currencyFlags[c]} {c} - {currencyNames[c]}
                </option>
              ))}
            </select>
          </div>

          {/* Base display */}
          <div style={{
            background: 'rgba(124,58,237,0.1)',
            border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: '14px', padding: '13px 16px'
          }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginBottom: '4px' }}>Base</p>
            <p style={{ fontSize: '18px', fontWeight: 800, color: '#a78bfa' }}>
              {currencyFlags[base]} {base}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Switch */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AED'].map(c => (
          <button key={c} onClick={() => handleBaseChange(c)} style={{
            background: base === c ? '#7c3aed' : 'rgba(255,255,255,0.05)',
            border: base === c ? '1px solid #7c3aed' : '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px', padding: '8px 16px',
            color: base === c ? '#fff' : 'rgba(255,255,255,0.6)',
            fontSize: '13px', fontWeight: 700, cursor: 'pointer',
            fontFamily: 'Urbanist, sans-serif', transition: 'all 0.2s'
          }}>
            {currencyFlags[c]} {c}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search any currency..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%', background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px', padding: '14px 20px', color: '#fff',
          fontSize: '15px', outline: 'none', fontFamily: 'Urbanist, sans-serif',
          marginBottom: '28px', boxSizing: 'border-box'
        }}
      />

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', paddingTop: '60px' }}>
          <div style={{ fontSize: '60px', marginBottom: '16px' }}>⏳</div>
          <p style={{ color: 'rgba(255,255,255,0.4)' }}>Fetching rates...</p>
        </div>
      )}

      {/* Rates Grid */}
      {!loading && rates && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr 1fr' : tablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: '16px'
        }}>
          {displayCurrencies.map(([code, rate]) => rate && (
            <div key={code}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px', padding: '20px', transition: 'all 0.3s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(124,58,237,0.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <span style={{ fontSize: mobile ? '22px' : '28px' }}>{currencyFlags[code] || '🏳️'}</span>
                <div>
                  <p style={{ fontWeight: 800, fontSize: '15px' }}>{code}</p>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>{currencyNames[code] || code}</p>
                </div>
              </div>
              <p style={{ fontSize: mobile ? '20px' : '24px', fontWeight: 900, color: '#a78bfa' }}>
                {(rate * amount).toFixed(2)}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', marginTop: '4px' }}>
                1 {base} = {rate.toFixed(4)} {code}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}