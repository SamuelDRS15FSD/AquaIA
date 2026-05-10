/**
 * fallbackService.js — AquaIA Humanized Explanations (Offline)
 * 
 * Genera explicaciones claras y en lenguaje rural para los agricultores.
 * Este servicio garantiza que el usuario reciba un mensaje comprensible 
 * sin depender de la conexión a internet o de la IA.
 */

export const getHumanizedExplanation = (analysis) => {
  const { status, cropName, climateMode, liters, priority } = analysis;

  const templates = {
    critico: [
      `¡Atención! Tu cultivo de ${cropName} está sufriendo por falta de agua. Necesita ${liters} litros por planta lo antes posible.`,
      `El suelo está muy seco. Si no riegas pronto, podrías perder parte de la cosecha de ${cropName}.`
    ],
    sediento: [
      `A las plantas de ${cropName} les vendría bien un poco de agua (${liters} litros). El suelo está empezando a secarse.`,
      `Es un buen momento para regar moderadamente y mantener la fuerza del ${cropName}.`
    ],
    saludable: [
      `¡Buenas noticias! El ${cropName} tiene la humedad justa que necesita. No hace falta regar por ahora.`,
      `Todo se ve bien en el lote. Sigue monitoreando con frecuencia.`
    ],
    saturado: [
      `¡Cuidado! Hay demasiada agua en el suelo. El ${cropName} podría enfermarse si sigues regando.`,
      `El suelo no aguanta más agua. Deja que se seque un poco antes de volver a regar.`
    ]
  };

  // Seleccionar un mensaje aleatorio del estado correspondiente
  const options = templates[status] || templates.saludable;
  const baseMessage = options[Math.floor(Math.random() * options.length)];

  // Agregar contexto climático si es relevante
  let climateContext = '';
  if (climateMode === 'nino') {
    climateContext = ' Recuerda que estamos en Fenómeno del Niño y el calor es más fuerte.';
  } else if (climateMode === 'nina') {
    climateContext = ' Ten en cuenta que con El Fenómeno de La Niña los encharcamientos son peligrosos.';
  }

  return baseMessage + climateContext;
};
