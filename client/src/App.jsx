import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Weather from './pages/Weather'
import Stocks from './pages/Stocks'
import Crypto from './pages/Crypto'
import Currency from './pages/Currency'
import AISearch from './pages/AISearch'
import Emergency from './pages/Emergency'

const navItems = [
  { icon: "🏠", label: "Home", path: "/" },
  { icon: "🌤️", label: "Weather", path: "/weather" },
  { icon: "📈", label: "Stocks", path: "/stocks" },
  { icon: "🪙", label: "Crypto", path: "/crypto" },
  { icon: "💱", label: "Currency", path: "/currency" },
  { icon: "🤖", label: "AI Search", path: "/search" },
  { icon: "🚨", label: "Emergency", path: "/emergency" },
]

function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNav = (path) => {
    navigate(path)
    setMobileOpen(false)
  }

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 40,
          }}
        />
      )}

      {/* Sidebar */}
      <div style={{
        width: collapsed ? '72px' : '240px',
        minWidth: collapsed ? '72px' : '240px',
        background: 'rgba(255,255,255,0.04)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 50,
        // Mobile: fixed position
        ...(window.innerWidth < 768 && {
          position: 'fixed',
          left: mobileOpen ? '0' : '-240px',
          width: '240px',
          minWidth: '240px',
          transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        })
      }}>

        {/* Logo */}
        <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {!collapsed && (
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>
                Dev<span style={{ color: '#a78bfa' }}>ian</span>
              </h1>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginTop: '2px' }}>
                Dashboard
              </p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              width: '32px', height: '32px', borderRadius: '10px',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', fontWeight: 700, marginLeft: 'auto',
              transition: 'all 0.2s', fontFamily: 'Urbanist, sans-serif'
            }}
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0 16px' }} />

        {/* Nav */}
        <nav style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <button
                key={item.label}
                onClick={() => handleNav(item.path)}
                title={collapsed ? item.label : ''}
                style={{
                  display: 'flex', alignItems: 'center',
                  gap: '12px', padding: '11px 12px',
                  borderRadius: '14px', border: 'none', cursor: 'pointer',
                  fontFamily: 'Urbanist, sans-serif', fontSize: '14px', fontWeight: 600,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  transition: 'all 0.2s',
                  background: isActive ? 'rgba(124,58,237,0.7)' : 'transparent',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                  boxShadow: isActive ? '0 0 24px rgba(124,58,237,0.3)' : 'none',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.color = '#fff'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
                  }
                }}
              >
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Bottom Badge */}
        {!collapsed && (
          <div style={{
            margin: '16px', padding: '16px', borderRadius: '18px',
            background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)'
          }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600 }}>Devian v1.0</p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', marginTop: '2px' }}>Universal Dashboard</p>
          </div>
        )}
      </div>
    </>
  )
}

function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#080810' }}
        className="bg-animated">

        {/* Mobile Header */}
        <div style={{
          display: 'none',
          position: 'fixed', top: 0, left: 0, right: 0,
          height: '60px', zIndex: 30,
          background: 'rgba(8,8,16,0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          alignItems: 'center', padding: '0 20px', gap: '16px',
        }} className="mobile-header">
          <button onClick={() => setMobileOpen(true)} style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px', padding: '8px 12px', color: '#fff',
            fontSize: '18px', cursor: 'pointer'
          }}>☰</button>
          <h1 style={{ fontSize: '20px', fontWeight: 900 }}>
            Dev<span style={{ color: '#a78bfa' }}>ian</span>
          </h1>
        </div>

        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* Main Content */}
        <div style={{ flex: 1, overflowY: 'auto', height: '100vh' }} className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/crypto" element={<Crypto />} />
            <Route path="/currency" element={<Currency />} />
            <Route path="/search" element={<AISearch />} />
            <Route path="/emergency" element={<Emergency />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App