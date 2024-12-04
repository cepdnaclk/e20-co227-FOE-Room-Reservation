import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ContextWrapper from './context/ContextWrapper.tsx';
import React from 'react';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextWrapper>
      <App />
    </ContextWrapper>
  </React.StrictMode>
);
