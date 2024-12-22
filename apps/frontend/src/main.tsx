import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { Auth0ProviderWithNavigate } from './auth/Auth0Provider.tsx';
import { SelectedUserProvider } from './context/SelectedUserContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <AuthProvider>
          <SelectedUserProvider>
            <App />
          </SelectedUserProvider>
        </AuthProvider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
