import { useState } from 'react'
import axios from 'axios'

const isMobile = () => window.innerWidth < 768
const isTablet = () => window.innerWidth < 1024

const countries = [
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪' },
]

const emergencyIcons = {
  police: '👮', ambulance: '🚑', fire: '🚒',
  emergency: '🆘', women_helpline: '👩', child_helpline: '👶', disaster: '🌊',
}

const emergencyColors = {
  police: { bg: 'rgba(56,189,248,0.1)', border: 'rgba(56,189,248,0.3)' },
  ambulance: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)' },
  fire: { bg: 'rgba(251,146,60,0.1)', border: 'rgba(251,146,60,0.3)' },
  emergency: { bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)' },
  women_helpline: { bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.3)' },
  child_helpline: { bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.3)' },
  disaster: { bg: 'rgba(34,211,238,0.1)', border: 'rgba(34,211,238,0.3)' },
}

export default function Emergency() {
  const [selected, setSelected] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const mobile = isMobile()
  const tablet = isTablet()

  const fetchEmergency = async (code) => {
    setLoading(true)
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/emergency?country=${code}`)
      setData(res.data)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (code) => { setSelected(code); fetchEmergency(code) }

  return (
    <div style={{ padding: mobile ? '24px 16px' : '40px', maxWidth: '1100px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: mobile ? '32px' : '40px', fontWeight: 900, marginBottom: '8px' }}>
          🚨 <span style={{ color: '#a78bfa' }}>Emergency</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>Emergency contact numbers by country</p>
      </div>

      {/* Country Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? 'repeat(3, 1fr)' : tablet ? 'repeat(4, 1fr)' : 'repeat(5, 1fr)',
        gap: '12px', marginBottom: '40px'
      }}>
        {countries.map(c => (
          <button key={c.code} onClick={() => handleSelect(c.code)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            padding: mobile ? '14px 8px' : '20px 12px',
            borderRadius: '20px', cursor: 'pointer', fontFamily: 'Urbanist, sans-serif',
            transition: 'all 0.2s',
            background: selected === c.code ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.04)',
            border: selected === c.code ? '1px solid rgba(124,58,237,0.6)' : '1px solid rgba(255,255,255,0.08)',
          }}>
            <span style={{ fontSize: mobile ? '24px' : '32px' }}>{c.flag}</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: selected === c.code ? '#fff' : 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
              {c.name}
            </span>
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', paddingTop: '60px' }}>
          <div style={{ fontSize: '60px', marginBottom: '16px' }}>⏳</div>
          <p style={{ color: 'rgba(255,255,255,0.4)' }}>Fetching emergency numbers...</p>
        </div>
      )}

      {data && !loading && (
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '24px', color: 'rgba(255,255,255,0.8)' }}>
            {countries.find(c => c.code === selected)?.flag} Emergency Numbers — {data.country}
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr 1fr' : tablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: '16px'
          }}>
            {Object.entries(data)
              .filter(([key]) => key !== 'country')
              .map(([key, value]) => {
                const colors = emergencyColors[key] || { bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.08)' }
                return (
                  <div key={key} style={{
                    background: colors.bg, border: `1px solid ${colors.border}`,
                    borderRadius: '24px', padding: mobile ? '20px' : '28px',
                  }}>
                    <div style={{ fontSize: mobile ? '32px' : '40px', marginBottom: '12px' }}>{emergencyIcons[key] || '📞'}</div>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', textTransform: 'capitalize', marginBottom: '8px' }}>
                      {key.replace(/_/g, ' ')}
                    </p>
                    <p style={{ fontSize: mobile ? '36px' : '44px', fontWeight: 900, letterSpacing: '-1px' }}>{value}</p>
                  </div>
                )
              })}
          </div>
        </div>
      )}

      {!data && !loading && (
        <div style={{ textAlign: 'center', paddingTop: '80px' }}>
          <div style={{ fontSize: '80px', marginBottom: '16px' }}>🌍</div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '18px' }}>Select a country to see emergency numbers</p>
        </div>
      )}
    </div>
  )
}