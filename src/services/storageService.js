/**
 * storageService.js — AquaIA Local Persistence
 * 
 * Gestiona el guardado y recuperación de datos en localStorage.
 * Permite que la app mantenga el estado de los cultivos sin conexión.
 */

const STORAGE_KEYS = {
  CROPS: 'aquaia_crops',
  CLIMATE_MODE: 'aquaia_climate_mode'
};

export const saveCropsToLocal = (crops) => {
  try {
    const serializedCrops = JSON.stringify(crops);
    localStorage.setItem(STORAGE_KEYS.CROPS, serializedCrops);
  } catch (error) {
    console.error('Error guardando cultivos en localStorage:', error);
  }
};

export const getCropsFromLocal = () => {
  try {
    const serializedCrops = localStorage.getItem(STORAGE_KEYS.CROPS);
    if (!serializedCrops) return null;
    return JSON.parse(serializedCrops);
  } catch (error) {
    console.error('Error recuperando cultivos de localStorage:', error);
    return null;
  }
};

export const saveClimateModeToLocal = (mode) => {
  localStorage.setItem(STORAGE_KEYS.CLIMATE_MODE, mode);
};

export const getClimateModeFromLocal = () => {
  return localStorage.getItem(STORAGE_KEYS.CLIMATE_MODE) || 'normal';
};
