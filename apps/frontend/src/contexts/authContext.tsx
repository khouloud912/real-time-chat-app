import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { LogoutOptions, useAuth0 } from '@auth0/auth0-react';

interface AuthContextProps {
  login: () => Promise<void>;
  logout: () => void;
  getToken: () => Promise<string | undefined>;
  isLoggedIn: () => boolean;
  isLoading: boolean;
  auth0User: any;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const {
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
    isAuthenticated,
    user: auth0User,
    isLoading,
  } = useAuth0();

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = async () => {
    await loginWithRedirect({
      appState: { returnTo: '/home' },
    });
  };

  const logoutWithRedirect = () => {
    logout({ returnTo: window.location.origin } as LogoutOptions);
  };

  const isTokenExpired = (token: string) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000;
    return expirationTime < Date.now();
  };

  const getToken = useCallback(async () => {
    if (accessToken && !isTokenExpired(accessToken)) {
      return accessToken;
    }

    try {
      const token = await getAccessTokenSilently();
      setAccessToken(token);
      return token;
    } catch (error) {
      console.error('Error getting token: ', error);
      return undefined;
    }
  }, [accessToken, getAccessTokenSilently]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated) getToken();
    }, 600000); // Refresh every 10 minutes

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  return (
      <AuthContext.Provider
          value={{
            login,
            logout: logoutWithRedirect,
            getToken,
            isLoggedIn: () => isAuthenticated,
            isLoading,
            auth0User,
          }}
      >
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};






/*
import {createContext, useContext, useState, useEffect, useCallback} from 'react';
import { LogoutOptions, useAuth0 } from '@auth0/auth0-react';
import {useRegister} from "../api/authApi.ts";

interface AuthContextProps {
  login: () => Promise<void>;
  logout: () => void;
  getToken: () => Promise<string | undefined>;
  isLoggedIn: () => boolean;
  user: any;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const {
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
    isAuthenticated,
    user,
    isLoading
  } = useAuth0();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { mutate: registerUser } = useRegister();

  const login = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/home', // The URL to redirect to after login
      },
    });
  };

  const logoutWithRedirect = () => {
    logout({ returnTo: window.location.origin } as LogoutOptions);
  };

  const isTokenExpired = (token: string) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT
    const expirationTime = payload.exp * 1000; // Convert expiration time to milliseconds
    return expirationTime < Date.now(); // Check if the token has expired
  };

  const getToken = useCallback(async () => {
    if (accessToken && !isTokenExpired(accessToken)) {
      return accessToken;
    }

    try {
      const token = await getAccessTokenSilently();
      setAccessToken(token);
      return token;
    } catch (error) {
      console.error('Error getting token: ', error);
      return undefined;
    }
  }, [accessToken, getAccessTokenSilently]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated) {
        getToken(); // Refresh the token
      }
    }, 600000); // Refresh every 10 minutes (600000 ms)

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  useEffect(() => {
    if (user) {
      registerUser(user);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout: logoutWithRedirect,
        getToken,
        isLoggedIn: () => isAuthenticated,
        user,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};*/
