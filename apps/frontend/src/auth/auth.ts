import { LogoutOptions, useAuth0 } from '@auth0/auth0-react';

export const useAuth = () => {
  const {
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
    isAuthenticated,
    user,
  } = useAuth0();

  const login = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/home',
      },
    });
  };

  const logoutWithRedirect = () => {
    logout({ returnTo: window.location.origin } as LogoutOptions);
  };

  const getToken = async () => {
    try {
      const token = await getAccessTokenSilently();
      return token;
    } catch (error) {
      console.error('Error getting token: ', error);
    }
  };

  const isLoggedIn = () => {
    return isAuthenticated;
  };

  return {
    login,
    logout: logoutWithRedirect,
    getToken,
    isLoggedIn,
    user,
  };
};
