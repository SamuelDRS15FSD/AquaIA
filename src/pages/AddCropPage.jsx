/**
 * AddCropPage.jsx — AquaIA New Crop Setup
 *
 * Interfaz para crear un nuevo lote/cultivo en el sistema.
 * Enfocado en datos estáticos del cultivo (Nombre, Tipo).
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisualInput from '../components/VisualInput';

export default function AddCropPage() {
  const navigate = useNavigate();
  const [cropType, setCropType] = useState('cafe');
  const [climateMode, setClimateMode] = useState('templado');

  const cropOptions = [
    { value: 'cafe',      label: 'Café',    icon: '☕' },
    { value: 'maiz',      label: 'Maíz',    icon: '🌽' },
    { value: 'platano',   label: 'Plátano', icon: '🍌' },
    { value: 'papa',      label: 'Papa',    icon: '🥔' },
    { value: 'aguacate',  label: 'Aguacate', icon: '🥑' },
    { value: 'tomate',    label: 'Tomate',   icon: '🍅' },
  ];

  const climateOptions = [
    { value: 'calido',    label: 'Cálido',   icon: '🔥' },
    { value: 'templado',  label: 'Templado', icon: '⛅' },
    { value: 'frio',      label: 'Frío',     icon: '❄️' },
  ];

  return (
    <section className="page-container" style={{ maxWidth: '600px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={() => navigate(-1)} className="btn-back">
          ← Volver
        </button>
        <h1 style={{ marginTop: '1rem' }}>🌱 Nuevo Cultivo</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Configura un nuevo lote para monitoreo inteligente.
        </p>
      </div>

      <form className="card" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
        <div className="form-group" style={{ marginBottom: '2rem' }}>
          <label className="visual-input__label">Nombre del Lote</label>
          <input 
            type="text" 
            placeholder="Ej: Lote La Esperanza" 
            className="aquaia-input" 
            required
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
          />
        </div>

        <VisualInput
          label="Tipo de Cultivo"
          options={cropOptions}
          value={cropType}
          onChange={setCropType}
        />

        <VisualInput
          label="Clima de la Zona"
          options={climateOptions}
          value={climateMode}
          onChange={setClimateMode}
        />

        <button
          type="submit"
          className="btn-primary"
          style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', marginTop: '1rem' }}
        >
          ✅ Crear y Empezar Monitoreo
        </button>
      </form>

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
