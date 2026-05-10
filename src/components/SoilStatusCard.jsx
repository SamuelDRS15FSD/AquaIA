export default function SoilStatusCard({ moisture, status }) {
  // Mapeo de estados visuales con semántica de color de alto impacto
  const configs = {
    saludable: {
      label: 'Saludable',
      color: '#10b981', // Emerald-500
      bgColor: '#ecfdf5',
      barColor: '#10b981',
      description: 'Estado Óptimo',
      plantScale: 1.1,
      leafAngle: 0,
    },
    sediento: {
      label: 'Bajo',
      color: '#f97316', // Orange-500
      bgColor: '#fff7ed',
      barColor: '#f97316',
      description: 'Necesita Riego',
      plantScale: 0.9,
      leafAngle: 25,
    },
    critico: {
      label: 'Crítico',
      color: '#ef4444', // Red-500
      bgColor: '#fef2f2',
      barColor: '#ef4444',
      description: 'Estrés Hídrico',
      plantScale: 0.8,
      leafAngle: 45,
    },
    saturado: {
      label: 'Saturado',
      color: '#3b82f6', // Blue-500
      bgColor: '#eff6ff',
      barColor: '#3b82f6',
      description: 'Exceso de Agua',
      plantScale: 1,
      leafAngle: 10,
    },
    monitoreo: {
      label: 'Monitoreo',
      color: '#8b5cf6', // Violet-500 for neutral/review
      bgColor: '#f5f3ff',
      barColor: '#eab308', // Yellow for "needs review" in bar
      description: 'Pendiente',
      plantScale: 1,
      leafAngle: 15,
    }
  };

  const config = configs[status] || configs.monitoreo;

  return (
    <div className="soil-card-premium" style={{ borderTop: `6px solid ${config.color}` }}>
      <div className="soil-card__header">
        <div className="header-info">
          <h3 className="soil-card__title">Humedad del Suelo</h3>
          <span className="soil-card__subtitle">{config.description}</span>
        </div>
        <div className="status-badge-premium" style={{ color: config.color, backgroundColor: config.bgColor }}>
          {config.label}
        </div>
      </div>

      <div className="soil-card__content">
        <div className="metrics-hero">
          <div className="percentage-main" style={{ color: config.color }}>
            {moisture}<small>%</small>
          </div>
          <div className="moisture-trend">
            <span className="trend-label">Nivel actual</span>
          </div>
        </div>
        
        <div className="visual-indicator">
          <div className="plant-wrapper" style={{ 
            transform: `scale(${config.plantScale * 1.2}) translateY(5px)`,
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.02))'
          }}>
            <svg viewBox="0 -10 100 130" className="plant-svg-premium">
              <defs>
                <linearGradient id="plantGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={config.color} />
                  <stop offset="100%" stopColor={config.color} stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Suelo sutil */}
              <ellipse cx="50" cy="115" rx="35" ry="8" fill={config.color} opacity="0.05" />
              
              {/* Contenedor de la planta para animar flexión total */}
              <g style={{ 
                transformOrigin: '50px 115px',
                transform: `rotate(${(config.leafAngle || 0) * 0.15}deg)`,
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                {/* Tallo principal ESTABLE */}
                <path 
                  d="M50,115 C52,90 48,60 50,25"
                  stroke="url(#plantGradient)" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                  fill="none" 
                  className="plant-path" 
                  style={{ opacity: 0.35 }}
                />
                
                {/* Hojas con diseño orgánico y asimétrico */}
                
                {/* Par Inferior - Hojas maduras y grandes */}
                <g transform={`rotate(${config.leafAngle * 1.1}, 50, 95)`} style={{ transition: 'transform 0.8s ease' }}>
                  {/* Hoja Izquierda Grande */}
                  <path d="M50 95 Q10 90 5 50 Q30 45 50 95" fill="url(#plantGradient)" className="plant-path" style={{ opacity: 0.2 }} />
                  <path d="M50 95 Q25 80 5 50" stroke="white" strokeWidth="2" strokeOpacity="0.08" fill="none" />
                </g>

                <g transform={`rotate(${-config.leafAngle * 0.9}, 50, 100)`} style={{ transition: 'transform 0.8s ease' }}>
                  {/* Hoja Derecha Grande - Diferente forma */}
                  <path d="M50 100 Q85 95 95 65 Q65 60 50 100" fill="url(#plantGradient)" className="plant-path" style={{ opacity: 0.2 }} />
                  <path d="M50 100 Q75 85 95 65" stroke="white" strokeWidth="2" strokeOpacity="0.08" fill="none" />
                </g>

                {/* Par Medio - Hojas medianas */}
                <g transform={`rotate(${config.leafAngle * 0.8}, 50, 65)`} style={{ transition: 'transform 0.8s ease' }}>
                  {/* Hoja Izquierda Media */}
                  <path d="M50 65 Q25 60 20 35 Q45 32 50 65" fill="url(#plantGradient)" className="plant-path" style={{ opacity: 0.3 }} />
                  <path d="M50 65 Q35 55 20 35" stroke="white" strokeWidth="1.5" strokeOpacity="0.1" fill="none" />
                </g>

                <g transform={`rotate(${-config.leafAngle * 1.2}, 50, 70)`} style={{ transition: 'transform 0.8s ease' }}>
                  {/* Hoja Derecha Media - Más pequeña y alta */}
                  <path d="M50 70 Q70 65 78 45 Q58 42 50 70" fill="url(#plantGradient)" className="plant-path" style={{ opacity: 0.3 }} />
                  <path d="M50 70 Q65 60 78 45" stroke="white" strokeWidth="1.5" strokeOpacity="0.1" fill="none" />
                </g>

                {/* Brotes Superiores - Pequeños y nuevos */}
                <g transform={`rotate(${config.leafAngle * 0.4}, 50, 40)`} style={{ transition: 'transform 0.8s ease' }}>
                  <path d="M50 40 Q40 38 38 25 Q48 24 50 40" fill={config.color} className="plant-path" style={{ opacity: 0.3 }} />
                </g>
                
                {/* Brote central superior estable */}
                <path d="M50 25 Q45 12 50 0 Q55 12 50 25" fill={config.color} className="plant-path" style={{ opacity: 0.4 }} />
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div className="soil-card__footer-premium">
        <div className="modern-progress">
          <div className="modern-progress__track">
            <div 
              className="modern-progress__fill" 
              style={{ 
                width: `${moisture}%`, 
                backgroundColor: config.barColor,
                boxShadow: `0 4px 12px ${config.barColor}55`
              }} 
            />
          </div>
          <div className="modern-progress__labels">
            <span className="label-min">0%</span>
            <span className="label-target">Óptimo (50%)</span>
            <span className="label-max">100%</span>
          </div>
        </div>
      </div>

      <style>{`
        .soil-card-premium {
          background: white;
          border-radius: 1.5rem;
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          min-height: 400px;
          position: relative;
          overflow: hidden;
        }
        .soil-card__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          z-index: 2;
        }
        .soil-card__title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-text);
          margin: 0;
        }
        .soil-card__subtitle {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-muted);
          display: block;
          margin-top: 0.25rem;
        }
        .status-badge-premium {
          font-size: 0.75rem;
          font-weight: 800;
          padding: 0.4rem 1rem;
          border-radius: 2rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .soil-card__content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex: 1;
          position: relative;
        }
        .metrics-hero {
          display: flex;
          flex-direction: column;
          z-index: 2;
        }
        .percentage-main {
          font-size: 6rem;
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -0.05em;
          transition: color 0.4s ease;
        }
        .percentage-main small {
          font-size: 2rem;
          opacity: 0.4;
          margin-left: 0.2rem;
        }
        .trend-label {
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-text-muted);
          margin-top: 0.5rem;
          display: block;
        }
        .visual-indicator {
          width: 200px;
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          right: -40px;
          bottom: -20px;
          z-index: 1;
        }
        .plant-wrapper {
          width: 100%;
          height: 100%;
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .plant-svg-premium {
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .plant-path {
          transition: all 0.8s ease;
        }
        .modern-progress {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .modern-progress__track {
          width: 100%;
          height: 16px;
          background: #f1f5f9;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
        }
        .modern-progress__fill {
          height: 100%;
          border-radius: 8px;
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.5s ease;
        }
        .modern-progress__labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-text-muted);
          padding: 0 0.25rem;
        }
        .label-target {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}
