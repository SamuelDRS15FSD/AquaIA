/**
 * StatusBadge.jsx — AquaIA Crop Status Indicator
 *
 * Muestra el estado del cultivo con alto contraste y colores semánticos.
 * Prioriza legibilidad bajo luz solar directa.
 *
 * Props:
 *   status: 'saludable' | 'sediento' | 'critico' | 'saturado' | 'monitoreo'
 */

export default function StatusBadge({ status }) {
  const configs = {
    saludable: { label: 'Saludable', color: 'var(--color-status-saludable)', icon: '✅' },
    sediento:  { label: 'Sediento',  color: 'var(--color-status-sediento)',  icon: '⚠️' },
    critico:   { label: 'Crítico',   color: 'var(--color-status-critico)',   icon: '🚨' },
    saturado:  { label: 'Saturado',  color: 'var(--color-status-saturado)',  icon: '💧' },
    monitoreo: { label: 'Revisar',   color: 'var(--color-status-monitoreo)', icon: '🔍' },
  };

  const config = configs[status] || configs.monitoreo;

  return (
    <div className="aquaia-badge" style={{ backgroundColor: config.color }}>
      <span className="aquaia-badge__icon">{config.icon}</span>
      <span className="aquaia-badge__label">{config.label}</span>

      <style>{`
        .aquaia-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          color: white;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .aquaia-badge__icon {
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
}
