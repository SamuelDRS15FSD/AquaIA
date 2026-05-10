/**
 * Dashboard.jsx — AquaIA Main Control Panel
 *
 * Componente principal que orquestra la visualización de cultivos y recomendaciones.
 * En Phase 2, usa datos locales de prueba.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import WeatherAlert from './WeatherAlert';
import RecommendationCard from './RecommendationCard';

export default function Dashboard() {
  // Datos locales de prueba corregidos: Cada cultivo es 100% independiente
  const [crops] = useState([
    { 
      id: 1, 
      name: 'Lote Norte - Café', 
      status: 'sediento', 
      moisturePercent: 32, 
      lastCheck: 'Hoy, 8:00 AM',
      recommendation: 'Se recomienda aplicar 5 litros por planta en las próximas 3 horas.',
      aiExplanation: 'El sol ha estado muy fuerte y la tierra de este lote de café se secó rápido. Riega pronto para evitar que las hojas se marchiten.'
    },
    { 
      id: 2, 
      name: 'Ladera Sur - Papa', 
      status: 'saludable', 
      moisturePercent: 65, 
      lastCheck: 'Hoy, 10:30 AM',
      recommendation: 'El cultivo está en óptimas condiciones. No requiere riego hoy.',
      aiExplanation: '¡Buenas noticias! La humedad de la tierra es perfecta (65%) para tus plantas de papa. Sigue así y revisa mañana.'
    },
  ]);

  const [activeCropId, setActiveCropId] = useState(1);
  const activeCrop = crops.find(c => c.id === activeCropId);

  return (
    <div className="dashboard">
      {/* Alerta Climática Global */}
      <WeatherAlert mode="nino" />

      <div className="dashboard__grid">
        {/* Columna Izquierda: Lista de Cultivos */}
        <div className="dashboard__sidebar">
          <h2 className="dashboard__section-title">Mis Cultivos</h2>
          <div className="crop-list">
            {crops.map(crop => (
              <button
                key={crop.id}
                className={`crop-item ${activeCropId === crop.id ? 'active' : ''}`}
                onClick={() => setActiveCropId(crop.id)}
              >
                <div className="crop-item__info">
                  <span className="crop-item__name">{crop.name}</span>
                  <span className="crop-item__meta">Humedad: {crop.moisturePercent}%</span>
                </div>
                <StatusBadge status={crop.status} />
              </button>
            ))}

            <Link to="/add-crop" className="btn-add-crop" style={{ textDecoration: 'none', textAlign: 'center' }}>
              <span>➕ Crear nuevo lote</span>
            </Link>
          </div>
        </div>

        {/* Columna Derecha: Detalles y Recomendación */}
        <div className="dashboard__content">
          {activeCrop ? (
            <>
              <div className="crop-detail-header">
                <div className="crop-detail-header__title-group">
                  <h1 className="crop-detail-header__title">{activeCrop.name}</h1>
                  <p className="crop-detail-header__subtitle">Última revisión: {activeCrop.lastCheck}</p>
                </div>
                <div className="crop-detail-header__actions">
                  <Link to="/register-status" className="btn-primary btn-sm" style={{ textDecoration: 'none' }}>
                    📈 Registrar Monitoreo
                  </Link>
                  <StatusBadge status={activeCrop.status} />
                </div>
              </div>

              <div className="dashboard__cards">
                <RecommendationCard
                  priority={activeCrop.status === 'critico' || activeCrop.status === 'sediento' ? 'alta' : 'baja'}
                  recommendation={activeCrop.recommendation}
                  aiExplanation={activeCrop.aiExplanation}
                />

                <div className="card sensor-card">
                  <h3 className="sensor-card__title">Estado del Suelo</h3>
                  <div className="sensor-card__value">
                    <span className="sensor-card__number">{activeCrop.moisturePercent}%</span>
                    <span className="sensor-card__label">Humedad</span>
                  </div>
                  <div className="sensor-card__visual-bar">
                    <div 
                      className="bar-fill" 
                      style={{ 
                        width: `${activeCrop.moisturePercent}%`, 
                        backgroundColor: activeCrop.status === 'saludable' ? 'var(--color-status-saludable)' : 'var(--color-status-sediento)' 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="dashboard__empty">
              <p>Selecciona un cultivo para ver detalles</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .dashboard__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 1024px) {
          .dashboard__grid {
            grid-template-columns: 350px 1fr;
          }
        }
        .dashboard__section-title {
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }
        .crop-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .crop-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem;
          background: white;
          border: 2px solid var(--color-border);
          border-radius: 1rem;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }
        .crop-item:hover {
          border-color: var(--color-primary);
        }
        .crop-item.active {
          border-color: var(--color-primary);
          background: var(--color-bg);
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.1);
        }
        .crop-item__info {
          display: flex;
          flex-direction: column;
        }
        .crop-item__name {
          font-weight: 700;
          font-size: 1rem;
          color: var(--color-text);
        }
        .crop-item__meta {
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }
        .btn-add-crop {
          padding: 1rem;
          background: transparent;
          border: 2px dashed var(--color-border);
          border-radius: 1rem;
          color: var(--color-text-muted);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-add-crop:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
        .crop-detail-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .crop-detail-header__title {
          font-size: 2rem;
          margin: 0;
        }
        .crop-detail-header__subtitle {
          margin: 0;
          color: var(--color-text-muted);
        }
        .crop-detail-header__actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .btn-sm {
          padding: 0.75rem 1.25rem;
          font-size: 0.9rem;
          border-radius: 0.75rem;
        }
        .dashboard__cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .dashboard__cards {
            grid-template-columns: 1.5fr 1fr;
          }
        }
        .sensor-card {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }
        .sensor-card__title {
          font-size: 1rem;
          margin-bottom: 1.5rem;
          color: var(--color-text-muted);
        }
        .sensor-card__number {
          font-size: 3.5rem;
          font-weight: 800;
          color: var(--color-text);
          line-height: 1;
        }
        .sensor-card__label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-text-muted);
          text-align: center;
        }
        .sensor-card__visual-bar {
          width: 100%;
          height: 8px;
          background: var(--color-border);
          border-radius: 4px;
          margin-top: 2rem;
          overflow: hidden;
        }
        .bar-fill {
          height: 100%;
          transition: width 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
