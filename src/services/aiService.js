import { GoogleGenerativeAI } from '@google/generative-ai';

// Configuración de Gemini API
// Nota: La API Key debe estar en .env.local como VITE_GEMINI_API_KEY
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

/**
 * Genera un insight contextual usando IA para humanizar las recomendaciones técnicas.
 * 
 * @param {Object} cropData - { name, status, moisturePercent, climateMode, recentRain, recommendation }
 * @returns {Promise<string>} - Insight generado o mensaje de fallback.
 */
export async function generateCropInsight(cropData) {
  if (!genAI) {
    return 'Conecta internet para recibir consejos personalizados de IA.';
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Eres un experto agrónomo asistente para pequeños agricultores en Colombia. 
      Tu objetivo es explicar de forma simple, humana y motivadora el estado de un cultivo.
      
      DATOS TÉCNICOS:
      - Cultivo: ${cropData.name}
      - Estado: ${cropData.status}
      - Humedad: ${cropData.moisturePercent}%
      - Clima: ${cropData.climateMode}
      - Lluvia reciente: ${cropData.recentRain}
      - Recomendación técnica: ${cropData.recommendation}

      TAREA:
      Escribe un mensaje de máximo 2 frases que humanice esta información. 
      Usa un tono amable, rural y alentador. No uses lenguaje técnico complejo. 
      Evita sonar como un robot. Empieza directo con el consejo o la observación.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();

  } catch (error) {
    console.error('[AI Service Error]:', error);
    return 'Sigue monitoreando tu lote con regularidad para mejores resultados.';
  }
}

/**
 * Mantenemos los placeholders anteriores por compatibilidad si es necesario
 */
export async function getIrrigationRecommendation(sensorData) {
  return { recommendation: null };
}

export async function getClimateAdaptedSchedule(forecast) {
  return { schedule: null };
}
