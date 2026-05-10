/**
 * CropContext.jsx — AquaIA Global Crop State
 *
 * Gestiona el estado de los cultivos y sus actualizaciones.
 * Prepara el terreno para la integración con Firestore en la Fase 3.
 */

import { createContext, useContext, useState } from 'react';
import { calculateIrrigation } from '../logic/irrigationEngine';
import { getHumanizedExplanation } from '../logic/fallbackService';

const CropContext = createContext();

export function CropProvider({ children }) {
  // Estado del Fenómeno Climático Global
  const [climateMode, setClimateMode] = useState('normal'); // 'normal', 'nino', 'nina'

  // Datos iniciales de prueba (Mocks de Fase 2)
  const [crops, setCrops] = useState([
    { 
      id: '1', 
      name: 'Lote Norte - Café', 
      status: 'sediento', 
      moisturePercent: 32, 
      lastCheck: 'Hoy, 8:00 AM',
      recommendation: 'Se recomienda aplicar 5 litros por planta.',
      aiExplanation: 'El sol ha estado muy fuerte. Riega pronto.',
      type: 'cafe',
      liters: 5,
      frequency: 'Cada 3-4 días'
    },
    { 
      id: '2', 
      name: 'Ladera Sur - Papa', 
      status: 'saludable', 
      moisturePercent: 65, 
      lastCheck: 'Hoy, 10:30 AM',
      recommendation: 'El cultivo está en óptimas condiciones.',
      aiExplanation: '¡Buenas noticias! La humedad es perfecta.',
      type: 'papa',
      liters: 0,
      frequency: 'Cada 2 días'
    },
  ]);

  // Función para registrar monitoreo (Motor Real Fase 3)
  const updateCropStatus = (cropId, { moisture, weather, rain }) => {
    setCrops(prevCrops => prevCrops.map(crop => {
      if (crop.id !== cropId) return crop;

      // Mapeo de niveles visuales a porcentaje numérico
      const moistureMap = {
        'seca': 15,
        'baja': 35,
        'media': 55,
        'adecuada': 75,
        'saturada': 95
      };

      const moisturePercent = moistureMap[moisture] || 50;

      // Ejecutar el motor de riego
      const analysis = calculateIrrigation({
        cropType: crop.type,
        moisturePercent,
        climateMode,
        recentRain: rain // 'ninguna', 'poca', 'mucha'
      });

      // Generar explicación humanizada (Offline)
      const humanized = getHumanizedExplanation(analysis);

      return {
        ...crop,
        moisturePercent: analysis.moisturePercent,
        status: analysis.status,
        lastCheck: 'Justo ahora',
        recommendation: analysis.recommendation,
        aiExplanation: humanized,
        liters: analysis.liters,
        frequency: analysis.frequency,
        priority: analysis.priority
      };
    }));
  };

  // Función para añadir nuevo cultivo
  const addCrop = (newCrop) => {
    const cropToAdd = {
      id: Date.now().toString(),
      status: 'monitoreo',
      moisturePercent: 50,
      lastCheck: 'Recién creado',
      recommendation: 'Realiza el primer monitoreo para recibir consejos.',
      aiExplanation: '¡Bienvenido! Empieza registrando el estado del lote.',
      liters: 0,
      frequency: 'Pendiente',
      ...newCrop
    };
    setCrops(prev => [...prev, cropToAdd]);
  };

  return (
    <CropContext.Provider value={{ 
      crops, 
      updateCropStatus, 
      addCrop, 
      climateMode, 
      setClimateMode 
    }}>
      {children}
    </CropContext.Provider>
  );
}

export const useCrops = () => useContext(CropContext);
