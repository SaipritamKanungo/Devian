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
  borderRadius: '16px',
  padding: '16px',
}

export default function Weather() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const mobile = isMobile()

  const fetchWeather = async () => {
    if (!city) return
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/weather?city=${city}`)
      setWeather(res.data)
    } catch {
      setError('City not found. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: mobile ? '24px 16px' : '40px', maxWidth: '1100px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: mobile ? '32px' : '40px', fontWeight: 900, marginBottom: '8px' }}>
          🌤️ <span style={{ color: '#a78bfa' }}>Weather</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>Live weather data for any city</p>
      </div>

      {/* Search */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexDirection: mobile ? 'column' : 'row' }}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
          style={{
            flex: 1, background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px', padding: '14px 20px',
            color: '#fff', fontSize: '15px', outline: 'none',
            fontFamily: 'Urbanist, sans-serif'
          }}
        />
        <button onClick={fetchWeather} style={{
          background: '#7c3aed', border: 'none', borderRadius: '16px',
          padding: '14px 28px', color: '#fff', fontSize: '15px',
          fontWeight: 700, cursor: 'pointer', fontFamily: 'Urbanist, sans-serif'
        }}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p style={{ color: '#f87171', marginBottom: '24px' }}>{error}</p>}

      {weather && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
          gap: '20px'
        }}>
          <div style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '6px' }}>
                  {weather.name}, {weather.sys.country}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', textTransform: 'capitalize' }}>
                  {weather.weather[0].description}
                </p>
              </div>
              <span style={{ fontSize: '56px' }}>
                {weather.weather[0].main === 'Clear' ? '☀️' :
                 weather.weather[0].main === 'Clouds' ? '☁️' :
                 weather.weather[0].main === 'Rain' ? '🌧️' :
                 weather.weather[0].main === 'Snow' ? '❄️' :
                 weather.weather[0].main === 'Thunderstorm' ? '⛈️' : '🌤️'}
              </span>
            </div>
            <div style={{ fontSize: '80px', fontWeight: 900, color: '#a78bfa', lineHeight: 1, marginBottom: '12px' }}>
              {Math.round(weather.main.temp)}°
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)' }}>Feels like {Math.round(weather.main.feels_like)}°C</p>
          </div>

          <div style={card}>
            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: 'rgba(255,255,255,0.7)' }}>Details</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { label: 'Humidity', value: `${weather.main.humidity}%`, icon: '💧' },
                { label: 'Wind Speed', value: `${weather.wind.speed} m/s`, icon: '💨' },
                { label: 'Pressure', value: `${weather.main.pressure} hPa`, icon: '🌡️' },
                { label: 'Visibility', value: `${(weather.visibility / 1000).toFixed(1)} km`, icon: '👁️' },
                { label: 'Min Temp', value: `${Math.round(weather.main.temp_min)}°C`, icon: '🔽' },
                { label: 'Max Temp', value: `${Math.round(weather.main.temp_max)}°C`, icon: '🔼' },
              ].map((item) => (
                <div key={item.label} style={subCard}>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginBottom: '6px' }}>{item.icon} {item.label}</p>
                  <p style={{ fontWeight: 700, fontSize: '16px' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!weather && !loading && !error && (
        <div style={{ textAlign: 'center', paddingTop: '80px' }}>
          <div style={{ fontSize: '80px', marginBottom: '16px' }}>🌍</div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '18px' }}>Search for any city to get live weather data</p>
        </div>
      )}
    </div>
  )
}