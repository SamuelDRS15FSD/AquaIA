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
  const priorityStyles = {
    alta:  { bg: '#fee2e2', text: '#991b1b', label: 'Necesita agua pronto' },
    media: { bg: '#fef3c7', text: '#92610b', label: 'Pendiente de riego' },
    baja:  { bg: '#f0fdf4', text: '#166534', label: 'El cultivo va bien' },
    ninguna: { bg: '#f1f5f9', text: '#475569', label: 'No necesita agua por ahora' },
  };

  const currentPriority = priorityStyles[priority] || priorityStyles.ninguna;

  return (
    <div className="recommendation-card">
      <div className="recommendation-card__body">
        {/* Badge de Prioridad Integrado */}
        <div className="recommendation-card__top">
          <span 
            className="priority-pill" 
            style={{ backgroundColor: currentPriority.bg, color: currentPriority.text }}
          >
            {currentPriority.label}
          </span>
        </div>

        {/* Sección Técnica Principal */}
        <div className="recommendation-card__section">
          <h3 className="recommendation-card__title">💡 Recomendación de Riego</h3>
          <p className="recommendation-card__text">{recommendation}</p>
        </div>

        {/* Métricas de Riego */}
        <div className="recommendation-card__metrics">
          <div className="metric-item">
            <span className="metric-item__icon">🛢️</span>
            <div className="metric-item__content">
              <span className="metric-item__value">{liters}<small>L</small></span>
              <span className="metric-item__label">por planta</span>
            </div>
          </div>
          <div className="metric-item">
            <span className="metric-item__icon">📅</span>
            <div className="metric-item__content">
              <span className="metric-item__value">{frequency}</span>
              <span className="metric-item__label">frecuencia</span>
            </div>
          </div>
        </div>

        <div className="recommendation-card__ai-section">
          <div className="recommendation-card__ai-header">
            <span className="recommendation-card__ai-badge">
              {aiExplanation?.includes('Analizando') ? 'Procesando...' : 'Asistente AquaIA'}
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
        .recommendation-card__body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .recommendation-card__top {
          display: flex;
          justify-content: flex-start;
          margin-bottom: -0.25rem;
        }
        .priority-pill {
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.35rem 0.85rem;
          border-radius: 2rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .recommendation-card__section {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .recommendation-card__title {
          font-size: 1rem;
          font-weight: 800;
          color: var(--color-text);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .recommendation-card__text {
          font-size: 0.95rem;
          color: var(--color-text);
          font-weight: 500;
          line-height: 1.5;
          margin: 0;
        }
        .recommendation-card__metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .metric-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #f8fafc;
          padding: 0.75rem;
          border-radius: 1rem;
          border: 1px solid #f1f5f9;
        }
        .metric-item__icon {
          font-size: 1.5rem;
          background: white;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.03);
        }
        .metric-item__content {
          display: flex;
          flex-direction: column;
        }
        .metric-item__value {
          font-weight: 900;
          font-size: 1.1rem;
          color: var(--color-text);
          line-height: 1;
        }
        .metric-item__value small {
          font-size: 0.7rem;
          margin-left: 0.1rem;
          opacity: 0.5;
        }
        .metric-item__label {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--color-text-muted);
          text-transform: uppercase;
          margin-top: 0.2rem;
        }
        .recommendation-card__ai-section {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          padding: 1rem;
          border-radius: 1.25rem;
          position: relative;
          border: 1px solid #bae6fd;
        }
        .recommendation-card__ai-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.4rem;
        }
        .recommendation-card__ai-badge {
          background: var(--color-primary);
          color: white;
          font-size: 0.6rem;
          font-weight: 800;
          padding: 0.2rem 0.6rem;
          border-radius: 2rem;
          text-transform: uppercase;
        }
        .ai-sparkle {
          font-size: 0.8rem;
          opacity: 0.8;
        }
        .recommendation-card__ai-text {
          margin: 0;
          font-size: 0.9rem;
          font-style: italic;
          color: #0369a1;
          line-height: 1.4;
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
