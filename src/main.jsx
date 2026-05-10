/**
 * main.jsx — AquaIA Application Entry Point
 *
 * Bootstraps React with:
 *   - BrowserRouter (React Router v6)
 *   - Global CSS styles
 *   - StrictMode for development warnings
 */

import { StrictMode }   from 'react';
import { createRoot }   from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './styles/global.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
