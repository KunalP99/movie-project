import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/css/main.css';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/helpers/ScrollToTop';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
