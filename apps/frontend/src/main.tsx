import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './assets/styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext.tsx';
import { UserProvider } from './contexts/userContext.tsx';

import { Auth0ProviderWithNavigate } from './providers/Auth0Provider.tsx';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
        },
    },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
          <QueryClientProvider client={queryClient}>
          <AuthProvider>
              <UserProvider>
                  <App />
              </UserProvider>
          </AuthProvider>
          </QueryClientProvider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
