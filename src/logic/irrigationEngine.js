/**
 * irrigationEngine.js — AquaIA Core Irrigation Logic
 * 
 * Motor determinístico para calcular recomendaciones de riego.
 * Basado en reglas agronómicas simplificadas para el contexto rural colombiano.
 */

import { getAdjustedThresholds, getClimateWaterFactor } from './climateEngine';

export const CROP_TYPES = {
  CAFE: 'cafe',
  PAPA: 'papa',
  AGUACATE: 'aguacate',
  MAIZ: 'maiz',
  TOMATE: 'tomate',
  PLATANO: 'platano'
};

// Configuración base por cultivo (Humedad %)
const CROP_SPECS = {
  [CROP_TYPES.CAFE]: {
    name: 'Café',
    thresholds: { critical: 40, optimal: 65, saturation: 85 },
    litersPerPlant: 4, // Litros base por riego
    frequency: 'Cada 3-4 días'
  },
  [CROP_TYPES.PAPA]: {
    name: 'Papa',
    thresholds: { critical: 50, optimal: 75, saturation: 90 },
    litersPerPlant: 3,
    frequency: 'Cada 2 días'
  },
  [CROP_TYPES.AGUACATE]: {
    name: 'Aguacate',
    thresholds: { critical: 45, optimal: 70, saturation: 80 }, // Muy sensible a saturación
    litersPerPlant: 15,
    frequency: 'Cada 5 días'
  },
  [CROP_TYPES.MAIZ]: {
    name: 'Maíz',
    thresholds: { critical: 35, optimal: 60, saturation: 90 },
    litersPerPlant: 2,
    frequency: 'Cada 3 días'
  },
  [CROP_TYPES.TOMATE]: {
    name: 'Tomate',
    thresholds: { critical: 45, optimal: 70, saturation: 85 },
    litersPerPlant: 1.5,
    frequency: 'Diario'
  },
  [CROP_TYPES.PLATANO]: {
    name: 'Plátano',
    thresholds: { critical: 50, optimal: 75, saturation: 95 },
    litersPerPlant: 8,
    frequency: 'Cada 3 días'
  }
};

/**
 * Calcula el estado y la recomendación de riego.
 * 
 * @param {Object} params - { cropType, moisturePercent, climateMode, recentRain }
 * @returns {Object} Resultado con status, recommendation, liters, etc.
 */
export const calculateIrrigation = ({
  cropType,
  moisturePercent,
  climateMode = 'normal',
  recentRain = 'ninguna' // 'ninguna', 'poca', 'mucha'
}) => {
  const spec = CROP_SPECS[cropType] || CROP_SPECS[CROP_TYPES.CAFE];
  const adjustedThresholds = getAdjustedThresholds(spec.thresholds, climateMode);
  const waterFactor = getClimateWaterFactor(climateMode);

  let status = 'saludable';
  let recommendation = '';
  let priority = 'baja';
  let liters = 0;
  let frequency = spec.frequency;

  // Lógica de Determinación de Estado
  if (moisturePercent <= adjustedThresholds.critical) {
    status = 'critico';
    priority = 'alta';
    recommendation = `Riego urgente requerido. El nivel de humedad (${moisturePercent}%) está por debajo del límite crítico para el ${spec.name}.`;
    liters = spec.litersPerPlant * 1.5 * waterFactor;
  } else if (moisturePercent < adjustedThresholds.optimal) {
    status = 'sediento';
    priority = 'media';
    recommendation = `Se recomienda aplicar riego moderado para estabilizar el cultivo.`;
    liters = spec.litersPerPlant * waterFactor;
  } else if (moisturePercent >= adjustedThresholds.saturation) {
    status = 'saturado';
    priority = 'ninguna';
    recommendation = `Suelo saturado. Suspender riego inmediatamente para evitar pudrición de raíces en el ${spec.name}.`;
    liters = 0;
    frequency = 'Suspender';
  } else {
    status = 'saludable';
    priority = 'ninguna';
    recommendation = `El nivel de humedad es óptimo. Mantener el monitoreo regular.`;
    liters = 0;
  }

  // Ajuste por Lluvia Reciente
  if (recentRain === 'mucha' && status !== 'saturado') {
    status = 'saludable';
    recommendation = `La lluvia reciente ha cubierto las necesidades. No es necesario regar hoy.`;
    liters = 0;
  } else if (recentRain === 'poca' && liters > 0) {
    liters = liters * 0.5;
    recommendation += ` (Reducido por lluvia ligera).`;
  }

  return {
    status,
    recommendation,
    priority,
    liters: parseFloat(liters.toFixed(1)),
    frequency,
    moisturePercent,
    cropName: spec.name
  };
};
