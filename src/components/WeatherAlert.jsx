/**
 * WeatherAlert.jsx — AquaIA Climate Alerter
 *
 * Muestra alertas climáticas globales (Niño, Niña, Lluvias intensas).
 *
 * Props:
 *   mode: 'normal' | 'nino' | 'nina'
 */

export default function WeatherAlert({ mode = 'normal' }) {
  if (mode === 'normal') return null;

  const config = {
    nino: {
      label: 'Fenómeno del Niño',
      desc: 'Riesgo de sequía. Prioriza el ahorro de agua.',
      color: '#fbbf24', // amber-400
      icon: '☀️',
    },
    nina: {
      label: 'Fenómeno de La Niña',
      desc: 'Riesgo de inundación. Evita el riego excesivo.',
      color: '#60a5fa', // blue-400
      icon: '🌧️',
    },
  }[mode];

  return (
    <div className="weather-alert" style={{ borderLeftColor: config.color }}>
      <div className="weather-alert__icon">{config.icon}</div>
      <div className="weather-alert__content">
        <h4 className="weather-alert__title">{config.label}</h4>
        <p className="weather-alert__desc">{config.desc}</p>
      </div>

      <style>{`
        .weather-alert {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: white;
          border-left: 6px solid;
          border-radius: 0.75rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        .weather-alert__icon {
          font-size: 2rem;
        }
        .weather-alert__title {
          margin: 0;
          font-size: 1rem;
          color: var(--color-text);
        }
        .weather-alert__desc {
          margin: 0;
          font-size: 0.875rem;
          color: var(--color-text-muted);
        }
      `}</style>
    </div>
  );
}
