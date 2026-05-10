/**
 * Dashboard.jsx — AquaIA Main Control Panel
 *
 * Componente principal que orquestra la visualización de cultivos y recomendaciones.
 * En Phase 2, usa datos locales de prueba.
 */

import { useState } from 'react';
import { Link }     from 'react-router-dom';
import { useCrops } from '../context/CropContext';
import StatusBadge  from './StatusBadge';
import WeatherAlert from './WeatherAlert';
import RecommendationCard from './RecommendationCard';

export default function Dashboard() {
  const { crops, climateMode } = useCrops();
  const [activeCropId, setActiveCropId] = useState('1');
  const activeCrop = crops.find(c => c.id === activeCropId);

  return (
    <div className="dashboard">
      {/* Alerta Climática Global */}
      <WeatherAlert mode={climateMode} />

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
                  <Link 
                    to={`/register-status?id=${activeCrop.id}`} 
                    className="btn-primary btn-sm" 
                    style={{ textDecoration: 'none' }}
                  >
                    📈 Registrar Monitoreo
                  </Link>
                  <StatusBadge status={activeCrop.status} />
                </div>
              </div>

              <div className="dashboard__cards">
                <RecommendationCard
                  priority={activeCrop.priority || (activeCrop.status === 'critico' || activeCrop.status === 'sediento' ? 'alta' : 'baja')}
                  recommendation={activeCrop.recommendation}
                  aiExplanation={activeCrop.aiExplanation}
                  liters={activeCrop.liters}
                  frequency={activeCrop.frequency}
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
        .dashboard {
          width: 100%;
        }
        .dashboard__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .dashboard__grid {
            grid-template-columns: 320px 1fr;
          }
        }
        .dashboard__sidebar {
          width: 100%;
        }
        .dashboard__content {
          width: 100%;
          min-width: 0; /* Important for grid item wrapping */
        }
        .dashboard__section-title {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          color: var(--color-text);
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
          transition: all 0.2s ease;
          text-align: left;
        }
        .crop-item:hover {
          border-color: var(--color-primary);
          transform: translateX(4px);
        }
        .crop-item.active {
          border-color: var(--color-primary);
          background: #f0f9ff;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.1);
        }
        .crop-item__info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .crop-item__name {
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--color-text);
        }
        .crop-item__meta {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }
        .btn-add-crop {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
          background: transparent;
          border: 2px dashed var(--color-border);
          border-radius: 1rem;
          color: var(--color-text-muted);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }
        .btn-add-crop:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
          background: var(--color-bg);
        }
        .crop-detail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .crop-detail-header__title {
          font-size: 2.25rem;
          margin: 0;
          color: var(--color-text);
        }
        .crop-detail-header__subtitle {
          margin: 0.25rem 0 0;
          color: var(--color-text-muted);
          font-size: 0.95rem;
        }
        .crop-detail-header__actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .btn-sm {
          padding: 0.75rem 1.5rem;
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
            grid-template-columns: 1.6fr 1fr;
          }
        }
        .sensor-card {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          min-height: 250px;
        }
        .sensor-card__title {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          color: var(--color-text-muted);
          font-weight: 600;
        }
        .sensor-card__value {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .sensor-card__number {
          font-size: 4rem;
          font-weight: 900;
          color: var(--color-text);
          line-height: 1;
        }
        .sensor-card__label {
          display: block;
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-text-muted);
          text-transform: uppercase;
          margin-top: 0.5rem;
        }
        .sensor-card__visual-bar {
          width: 100%;
          height: 10px;
          background: var(--color-border);
          border-radius: 5px;
          margin-top: 2.5rem;
          overflow: hidden;
        }
        .bar-fill {
          height: 100%;
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
