/**
 * WeatherAlert.jsx — AquaIA Climate Alerter
 *
 * Muestra alertas climáticas globales (Niño, Niña, Lluvias intensas).
 *
 * Props:
 *   mode: 'normal' | 'nino' | 'nina'
 */

export default function WeatherAlert({ mode = 'normal' }) {
  const config = {
    normal: {
      label: 'Monitoreo Estacional',
      desc: 'Clima estable. Momento ideal para realizar podas y mantenimiento preventivo.',
      color: '#10b981', // emerald-500
      icon: '🌱',
    },
    nino: {
      label: 'Fenómeno del Niño',
      desc: 'Riesgo de sequía. Prioriza el ahorro de agua y el riego nocturno.',
      color: '#fbbf24', // amber-400
      icon: '☀️',
    },
    nina: {
      label: 'Fenómeno de La Niña',
      desc: 'Riesgo de inundación. Evita el riego excesivo y revisa drenajes.',
      color: '#60a5fa', // blue-400
      icon: '🌧️',
    },
  }[mode] || {
    label: 'Clima Actual',
    desc: 'Consulta las recomendaciones específicas para cada lote.',
    color: '#94a3b8',
    icon: '☁️'
  };

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
