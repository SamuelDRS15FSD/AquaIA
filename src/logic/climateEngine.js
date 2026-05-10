/**
 * climateEngine.js — AquaIA Climate Logic
 * 
 * Ajusta los umbrales de riego y saturación según fenómenos climáticos
 * regionales (El Niño / La Niña / Normal).
 */

export const CLIMATE_MODES = {
  NORMAL: 'normal',
  NINO: 'nino', // Sequía extrema
  NINA: 'nina'  // Exceso de lluvias
};

/**
 * Ajusta los umbrales de humedad de un cultivo según el modo climático.
 * 
 * @param {Object} baseThresholds - { critical, optimal, saturation }
 * @param {string} mode - CLIMATE_MODES
 * @returns {Object} Umbrales ajustados
 */
export const getAdjustedThresholds = (baseThresholds, mode) => {
  const { critical, optimal, saturation } = baseThresholds;

  switch (mode) {
    case CLIMATE_MODES.NINO:
      // En El Niño, el suelo se seca más rápido. 
      // Aumentamos el umbral crítico para alertar antes.
      return {
        critical: critical + 10,
        optimal: optimal + 5,
        saturation: saturation + 5
      };

    case CLIMATE_MODES.NINA:
      // En La Niña, hay riesgo de saturación.
      // Bajamos el umbral de saturación para alertar antes del exceso.
      return {
        critical: critical - 5,
        optimal: optimal - 5,
        saturation: saturation - 10
      };

    case CLIMATE_MODES.NORMAL:
    default:
      return baseThresholds;
  }
};

/**
 * Retorna un factor de ajuste para el cálculo de litros.
 */
export const getClimateWaterFactor = (mode) => {
  switch (mode) {
    case CLIMATE_MODES.NINO: return 1.2; // Aumentar un 20% el agua por evaporación
    case CLIMATE_MODES.NINA: return 0.8; // Reducir un 20% el agua por humedad ambiental
    default: return 1.0;
  }
};
