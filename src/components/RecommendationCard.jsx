/**
 * RecommendationCard.jsx — AquaIA Advice Panel
 *
 * Muestra la recomendación técnica del motor y la explicación humanizada de la IA.
 *
 * Props:
 *   recommendation: Texto de la recomendación técnica
 *   aiExplanation: Explicación humanizada (placeholder para Phase 2)
 *   priority: 'alta' | 'media' | 'baja'
 */

export default function RecommendationCard({ 
  recommendation, 
  aiExplanation, 
  priority,
  liters = 0,
  frequency = ''
}) {
  const priorityColors = {
    alta:  '#fee2e2', // red-100
    media: '#fef3c7', // amber-100
    baja:  '#f0fdf4', // green-100
  };

  return (
    <div className="recommendation-card">
      <div className="recommendation-card__header" style={{ backgroundColor: priorityColors[priority] }}>
        <span className="recommendation-card__priority-label">Prioridad: {priority}</span>
      </div>

      <div className="recommendation-card__body">
        <h3 className="recommendation-card__title">💡 Recomendación Técnica</h3>
        <p className="recommendation-card__text">{recommendation}</p>

        {/* Métricas de Riego */}
        <div className="recommendation-card__metrics">
          <div className="metric-item">
            <span className="metric-item__icon">🛢️</span>
            <div>
              <span className="metric-item__value">{liters} L</span>
              <span className="metric-item__label">por planta</span>
            </div>
          </div>
          <div className="metric-item">
            <span className="metric-item__icon">📅</span>
            <div>
              <span className="metric-item__value">{frequency}</span>
              <span className="metric-item__label">Frecuencia</span>
            </div>
          </div>
        </div>

        <hr className="recommendation-card__divider" />

        <div className="recommendation-card__ai-section">
          <div className="recommendation-card__ai-badge">Asistente Offline</div>
          <p className="recommendation-card__ai-text">
            "{aiExplanation || 'Esperando el primer monitoreo...'}"
          </p>
        </div>
      </div>

      <style>{`
        .recommendation-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid var(--color-border);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .recommendation-card__header {
          padding: 0.5rem 1rem;
          text-align: center;
        }
        .recommendation-card__priority-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--color-text);
        }
        .recommendation-card__body {
          padding: 1.5rem;
        }
        .recommendation-card__title {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }
        .recommendation-card__text {
          font-size: 1rem;
          color: var(--color-text);
          font-weight: 500;
          margin-bottom: 1.5rem;
        }
        .recommendation-card__metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .metric-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #f8fafc; /* slate-50 */
          padding: 0.75rem;
          border-radius: 0.75rem;
        }
        .metric-item__icon {
          font-size: 1.5rem;
        }
        .metric-item__value {
          display: block;
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--color-text);
          line-height: 1.1;
        }
        .metric-item__label {
          display: block;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--color-text-muted);
          text-transform: uppercase;
        }
        .recommendation-card__divider {
          margin: 1.5rem 0;
          border: 0;
          border-top: 1px dashed var(--color-border);
        }
        .recommendation-card__ai-section {
          background: var(--color-bg);
          padding: 1rem;
          border-radius: 0.75rem;
          position: relative;
        }
        .recommendation-card__ai-badge {
          position: absolute;
          top: -0.6rem;
          left: 1rem;
          background: var(--color-primary);
          color: white;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: 0.5rem;
          text-transform: uppercase;
        }
        .recommendation-card__ai-text {
          margin: 0;
          font-size: 0.95rem;
          font-style: italic;
          color: var(--color-primary-dk);
        }
      `}</style>
    </div>
  );
}
