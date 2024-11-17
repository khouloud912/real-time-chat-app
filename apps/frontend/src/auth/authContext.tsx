import { createContext, useContext, useState, useEffect } from 'react';
import { LogoutOptions, useAuth0 } from '@auth0/auth0-react';
import { register } from '../api/authAPI';

interface AuthContextProps {
  login: () => Promise<void>;
  logout: () => void;
  getToken: () => Promise<string | undefined>;
  isLoggedIn: () => boolean;
  user: any;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const {
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
    isAuthenticated,
    user,
  } = useAuth0();

  const [accessToken, setAccessToken] = useState<string | null>(null);

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

  const getToken = async () => {
    // Get the access token immediately if available
    if (accessToken) {
      return accessToken;
    }

    try {
      const token = await getAccessTokenSilently();
      setAccessToken(token); // Store the token in memory
      return token;
    } catch (error) {
      console.error('Error getting token: ', error);
    }
  };

  useEffect(() => {
    // Refresh the token every 10 minutes if authenticated
    const interval = setInterval(() => {
      if (isAuthenticated) {
        getToken(); // Refresh the token
      }
    }, 600000); // Refresh every 10 minutes (600000 ms)

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isAuthenticated]);

  useEffect(() => {
    const registerUser = async () => {
      if (user) {
        try {
          // Log user details to ensure you are sending the right data to register
          console.log('Registering user:', user);
          const response = await register(user); // Assuming this is the right registration API
          console.log('User registered:', response);
        } catch (error) {
          console.error('Error registering user:', error);
        }
      }
    };

    if (user) {
      registerUser();
    }
  }, [user]); // Only run when the user data is available

  return (
    <AuthContext.Provider
      value={{
        login,
        logout: logoutWithRedirect,
        getToken,
        isLoggedIn: () => isAuthenticated,
        user,
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


// import { LogoutOptions, useAuth0 } from '@auth0/auth0-react';

// export const useAuth = () => {
//   const {
//     loginWithRedirect,
//     logout,
//     getAccessTokenSilently,
//     isAuthenticated,
//     user,
//   } = useAuth0();

//   const login = async () => {
//     await loginWithRedirect({
//       appState: {
//         returnTo: '/home',
//       },
//     });
//   };

//   const logoutWithRedirect = () => {
//     logout({ returnTo: window.location.origin } as LogoutOptions);
//   };

//   const getToken = async () => {
//     try {
//       const token = await getAccessTokenSilently();
//       return token;
//     } catch (error) {
//       console.error('Error getting token: ', error);
//     }
//   };

//   const isLoggedIn = () => {
//     return isAuthenticated;
//   };

//   return {
//     login,
//     logout: logoutWithRedirect,
//     getToken,
//     isLoggedIn,
//     user,
//   };
// };
