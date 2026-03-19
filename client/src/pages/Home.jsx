import { useNavigate } from 'react-router-dom'

const isMobile = () => window.innerWidth < 768
const isTablet = () => window.innerWidth < 1024

const cards = [
  { icon: "🌤️", label: "Weather", desc: "Live weather for any city worldwide", path: "/weather", gradient: "linear-gradient(135deg, rgba(56,189,248,0.15) 0%, rgba(56,189,248,0.05) 100%)", border: "rgba(56,189,248,0.25)" },
  { icon: "📈", label: "Stocks", desc: "Real-time global stock market data", path: "/stocks", gradient: "linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(34,197,94,0.05) 100%)", border: "rgba(34,197,94,0.25)" },
  { icon: "🪙", label: "Crypto", desc: "Live cryptocurrency prices & trends", path: "/crypto", gradient: "linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(251,191,36,0.05) 100%)", border: "rgba(251,191,36,0.25)" },
  { icon: "💱", label: "Currency", desc: "Forex exchange rates & converter", path: "/currency", gradient: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(124,58,237,0.05) 100%)", border: "rgba(124,58,237,0.25)" },
  { icon: "🤖", label: "AI Search", desc: "Search any product price with AI", path: "/search", gradient: "linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(236,72,153,0.05) 100%)", border: "rgba(236,72,153,0.25)" },
  { icon: "🚨", label: "Emergency", desc: "Emergency numbers by country", path: "/emergency", gradient: "linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0.05) 100%)", border: "rgba(239,68,68,0.25)" },
]

const stats = [
  { label: "Live APIs", value: "6", icon: "⚡" },
  { label: "Countries", value: "150+", icon: "🌍" },
  { label: "Currencies", value: "160+", icon: "💱" },
  { label: "Cryptos", value: "100+", icon: "🪙" },
]

export default function Home() {
  const navigate = useNavigate()
  const mobile = isMobile()
  const tablet = isTablet()

  return (
    <div style={{ padding: mobile ? '24px 16px' : '40px', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ marginBottom: mobile ? '28px' : '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 12px #4ade80' }} />
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase' }}>
            Live Data
          </span>
        </div>
        <h2 style={{ fontSize: mobile ? '36px' : '52px', fontWeight: 900, lineHeight: 1.1, marginBottom: '12px', color: '#fff' }}>
          Welcome to<br />
          <span style={{ color: '#a78bfa' }}>Devian</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: mobile ? '14px' : '16px', fontWeight: 500, maxWidth: '400px' }}>
          Your universal data dashboard. Everything you need, in one place.
        </p>
      </div>

      {/* Stats Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: '12px', marginBottom: '24px'
      }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px', padding: mobile ? '16px' : '20px',
          }}>
            <p style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</p>
            <p style={{ fontSize: mobile ? '22px' : '28px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{stat.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 500, marginTop: '4px' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : tablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
        gap: '16px'
      }}>
        {cards.map((card) => (
          <button
            key={card.label}
            onClick={() => navigate(card.path)}
            style={{
              textAlign: 'left', background: card.gradient,
              border: `1px solid ${card.border}`,
              borderRadius: '24px', padding: mobile ? '20px' : '28px',
              cursor: 'pointer', transition: 'all 0.3s ease', color: '#fff', width: '100%',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = `0 24px 60px ${card.border}`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{ fontSize: mobile ? '36px' : '44px', marginBottom: '16px' }}>{card.icon}</div>
            <h3 style={{ fontSize: mobile ? '17px' : '20px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{card.label}</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>{card.desc}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.35)', fontSize: '13px', fontWeight: 600 }}>
              <span>Explore</span><span>→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}