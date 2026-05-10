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
          <div className="recommendation-card__ai-header">
            <span className="recommendation-card__ai-badge">
              {aiExplanation?.includes('Analizando') ? 'Procesando...' : 'Consejo de IA'}
            </span>
            <div className="ai-sparkle">✨</div>
          </div>
          <p className={`recommendation-card__ai-text ${aiExplanation?.includes('Analizando') ? 'analyzing' : ''}`}>
            {aiExplanation || 'Esperando el primer monitoreo...'}
          </p>
        </div>
      </div>

      <style>{`
        .recommendation-card {
          background: white;
          border-radius: 1.5rem;
          overflow: hidden;
          border: 1px solid var(--color-border);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
        }
        .recommendation-card__header {
          padding: 0.5rem 1.25rem;
          text-align: left;
        }
        .recommendation-card__priority-label {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--color-text);
          letter-spacing: 0.05em;
        }
        .recommendation-card__body {
          padding: 1.25rem;
        }
        .recommendation-card__title {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
          color: var(--color-text);
        }
        .recommendation-card__text {
          font-size: 0.9rem;
          color: var(--color-text);
          font-weight: 600;
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        .recommendation-card__metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .metric-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #f8fafc;
          padding: 0.6rem;
          border-radius: 0.75rem;
          border: 1px solid #f1f5f9;
        }
        .metric-item__icon {
          font-size: 1.25rem;
        }
        .metric-item__value {
          display: block;
          font-weight: 800;
          font-size: 1rem;
          color: var(--color-text);
          line-height: 1;
        }
        .metric-item__label {
          display: block;
          font-size: 0.6rem;
          font-weight: 700;
          color: var(--color-text-muted);
          text-transform: uppercase;
          margin-top: 0.15rem;
        }
        .recommendation-card__divider {
          margin: 1rem 0;
          border: 0;
          border-top: 1px dashed var(--color-border);
        }
        .recommendation-card__ai-section {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          padding: 0.75rem 1rem;
          border-radius: 1rem;
          position: relative;
          border: 1px solid #bae6fd;
        }
        .recommendation-card__ai-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.35rem;
        }
        .recommendation-card__ai-badge {
          background: var(--color-primary);
          color: white;
          font-size: 0.6rem;
          font-weight: 800;
          padding: 0.2rem 0.5rem;
          border-radius: 2rem;
          text-transform: uppercase;
        }
        .ai-sparkle {
          font-size: 0.8rem;
        }
        .recommendation-card__ai-text {
          margin: 0;
          font-size: 0.9rem;
          font-style: italic;
          color: #0369a1;
          line-height: 1.35;
          font-weight: 500;
        }
        .recommendation-card__ai-text.analyzing {
          animation: aiPulse 1.5s infinite ease-in-out;
          color: #64748b;
        }
        @keyframes aiPulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
