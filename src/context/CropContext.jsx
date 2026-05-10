/**
 * CropContext.jsx — AquaIA Global Crop State
 *
 * Gestiona el estado de los cultivos y sus actualizaciones.
 * Prepara el terreno para la integración con Firestore en la Fase 3.
 */

import { createContext, useContext, useState } from 'react';

const CropContext = createContext();

export function CropProvider({ children }) {
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
      type: 'cafe'
    },
    { 
      id: '2', 
      name: 'Ladera Sur - Papa', 
      status: 'saludable', 
      moisturePercent: 65, 
      lastCheck: 'Hoy, 10:30 AM',
      recommendation: 'El cultivo está en óptimas condiciones.',
      aiExplanation: '¡Buenas noticias! La humedad es perfecta.',
      type: 'papa'
    },
  ]);

  // Función para registrar monitoreo (Mock Engine Simple)
  const updateCropStatus = (cropId, { moisture, weather, rain }) => {
    setCrops(prevCrops => prevCrops.map(crop => {
      if (crop.id !== cropId) return crop;

      // Mock Engine: Reglas simples para Fase 2
      let newMoisture = 50;
      let newStatus = 'saludable';
      let newRec = 'Mantener monitoreo regular.';

      if (moisture === 'seca') {
        newMoisture = 15;
        newStatus = 'critico';
        newRec = 'Riego de emergencia inmediato.';
      } else if (moisture === 'baja') {
        newMoisture = 35;
        newStatus = 'sediento';
        newRec = 'Se recomienda riego moderado.';
      } else if (moisture === 'saturada' || rain === 'mucha') {
        newMoisture = 90;
        newStatus = 'saturado';
        newRec = 'Suspender riego por 48 horas.';
      }

      return {
        ...crop,
        moisturePercent: newMoisture,
        status: newStatus,
        lastCheck: 'Justo ahora',
        recommendation: newRec,
        aiExplanation: 'Estado actualizado según tu reporte visual reciente.'
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
      ...newCrop
    };
    setCrops(prev => [...prev, cropToAdd]);
  };

  return (
    <CropContext.Provider value={{ crops, updateCropStatus, addCrop }}>
      {children}
    </CropContext.Provider>
  );
}

export const useCrops = () => useContext(CropContext);
