/**
 * useAuth.js — AquaIA Authentication Hook
 *
 * Un único listener de onAuthStateChanged por ciclo de vida de la app.
 * Cleanup garantizado en el return del useEffect → sin memory leaks.
 * Sin listeners duplicados.
 *
 * Retorna:
 *   user    → objeto Firebase User | null
 *   loading → true mientras Firebase verifica la sesión inicial
 *
 * Usado por: ProtectedRoute.jsx, Navbar.jsx (Phase 2)
 */

import { useState, useEffect } from 'react';
import { onAuthStateChanged }  from 'firebase/auth';
import { auth }                from '../services/firebase';

export function useAuth() {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Suscripción única — Firebase llama a este callback cuando cambia el estado de auth
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    // Cleanup obligatorio → evita memory leaks y listeners duplicados
    return () => unsubscribe();
  }, []); // array vacío → solo se ejecuta una vez al montar

  return { user, loading };
}
