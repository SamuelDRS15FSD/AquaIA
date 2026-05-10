/**
 * firebase.js — AquaIA Firebase Initialization
 *
 * Exports:
 *   auth  → Firebase Authentication instance
 *   db    → Firestore instance (usado desde Phase 3)
 *
 * Pattern: Singleton initialization to prevent duplicate app errors.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth }       from 'firebase/auth';
import { getFirestore }  from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            "AIzaSyDe9ytXMxzYP4GvAHN6vzriAE-OXPaUJio",
  authDomain:        "aquaia-36337.firebaseapp.com",
  projectId:         "aquaia-36337",
  storageBucket:     "aquaia-36337.firebasestorage.app",
  messagingSenderId: "465418264767",
  appId:             "1:465418264767:web:cfffb3836532370514660a",
};

// Singleton initialization
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Export instances tied to the singleton app
export const auth = getAuth(app);
export const db   = getFirestore(app);

