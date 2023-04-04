import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/css/main.css';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/helpers/ScrollToTop';
// Context
import UserProvider from './components/context/UserContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
