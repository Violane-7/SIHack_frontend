import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App1 from './App1.jsx';
import Map from './MapComponent.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App1 />
    </BrowserRouter>
  </StrictMode>
);

