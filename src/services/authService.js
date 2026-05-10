/**
 * authService.js — AquaIA Authentication Service
 *
 * Funciones puras de autenticación Firebase.
 * Sin estado React. Sin efectos secundarios.
 * Cada función retorna { user } o lanza un error con mensaje en español.
 *
 * Usado por: Login.jsx, Register.jsx
 * NO importar directamente en hooks — pasar como dependencia.
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from './firebase';

/**
 * Traduce códigos de error Firebase a mensajes en español rural claro.
 * @param {string} code — Firebase error code
 * @returns {string} mensaje legible
 */
function traducirError(code) {
  const errores = {
    'auth/invalid-email':          'El correo electrónico no es válido.',
    'auth/user-not-found':         'No existe una cuenta con ese correo.',
    'auth/wrong-password':         'La contraseña es incorrecta.',
    'auth/email-already-in-use':   'Ya existe una cuenta con ese correo.',
    'auth/weak-password':          'La contraseña debe tener al menos 6 caracteres.',
    'auth/too-many-requests':      'Demasiados intentos. Espera un momento e intenta de nuevo.',
    'auth/network-request-failed': 'Sin conexión a internet. Verifica tu red.',
    'auth/invalid-credential':     'Correo o contraseña incorrectos.',
  };
  return errores[code] || 'Ocurrió un error. Intenta de nuevo.';
}

/**
 * Inicia sesión con email y contraseña.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('firebase/auth').UserCredential>}
 * @throws {Error} con mensaje en español
 */
export async function loginWithEmail(email, password) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    throw new Error(traducirError(err.code));
  }
}

/**
 * Registra un nuevo usuario con email y contraseña.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('firebase/auth').UserCredential>}
 * @throws {Error} con mensaje en español
 */
export async function registerWithEmail(email, password) {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    throw new Error(traducirError(err.code));
  }
}

/**
 * Cierra la sesión del usuario actual.
 * @returns {Promise<void>}
 */
export async function logout() {
  try {
    await signOut(auth);
  } catch (err) {
    throw new Error(traducirError(err.code));
  }
}
