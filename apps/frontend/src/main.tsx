import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';
import { Auth0ProviderWithNavigate } from './auth/auth0Provider.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/authContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
