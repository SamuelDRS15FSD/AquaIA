/**
 * RegisterStatusPage.jsx — AquaIA Crop Monitoring
 *
 * Interfaz rural-first para registrar variables ambientales de un cultivo existente.
 * Utiliza VisualInput para evitar el teclado.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisualInput from '../components/VisualInput';

export default function RegisterStatusPage() {
  const navigate = useNavigate();
  const [moisture, setMoisture] = useState('media');
  const [weather, setWeather] = useState('soleado');
  const [rain, setRain] = useState('ninguna');

  const moistureOptions = [
    { value: 'seca',      label: 'Seca / Polvo', icon: '🏜️' },
    { value: 'baja',      label: 'Poca humedad', icon: '🥀' },
    { value: 'media',     label: 'Húmeda',      icon: '🌱' },
    { value: 'adecuada',  label: 'Muy Húmeda',  icon: '💧' },
    { value: 'saturada',  label: 'Encharcada',  icon: '🌊' },
  ];

  const weatherOptions = [
    { value: 'soleado',   label: 'Mucho Sol',    icon: '☀️' },
    { value: 'nublado',   label: 'Nublado',      icon: '☁️' },
    { value: 'lluvia_l',  label: 'Llovizna',     icon: '🌦️' },
    { value: 'lluvia_f',  label: 'Lluvia Fuerte', icon: '⛈️' },
  ];

  const rainOptions = [
    { value: 'ninguna',   label: 'No ha llovido', icon: '🚫' },
    { value: 'poca',      label: 'Llovió poco',  icon: '💧' },
    { value: 'mucha',     label: 'Llovió mucho', icon: '🌊' },
  ];

  return (
    <section className="page-container" style={{ maxWidth: '600px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={() => navigate(-1)} className="btn-back">
          ← Volver
        </button>
        <h1 style={{ marginTop: '1rem' }}>📈 Registrar Monitoreo</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Ingresa las condiciones actuales del lote.
        </p>
      </div>

      <div className="card">
        <VisualInput
          label="¿Cómo sientes la tierra hoy?"
          options={moistureOptions}
          value={moisture}
          onChange={setMoisture}
        />

        <VisualInput
          label="¿Cómo está el cielo?"
          options={weatherOptions}
          value={weather}
          onChange={setWeather}
        />

        <VisualInput
          label="¿Ha llovido recientemente?"
          options={rainOptions}
          value={rain}
          onChange={setRain}
        />

        <button
          className="btn-primary"
          style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', marginTop: '1rem' }}
          onClick={() => navigate('/dashboard')}
        >
          ✅ Actualizar y Ver Recomendación
        </button>
      </div>

      <style>{`
        .btn-back {
          background: none;
          border: none;
          color: var(--color-primary);
          font-weight: 700;
          cursor: pointer;
          font-size: 1rem;
          padding: 0;
        }
      `}</style>
    </section>
  );
}
