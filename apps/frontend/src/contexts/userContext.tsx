import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react';
import { useRegister } from '../api/authApi';
import {useAuth} from "./authContext.tsx";
import {useConnectedUser} from "../api/userApi.ts";

interface UserContextProps {
    user: any;
    loading: boolean;
    refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const { isLoggedIn, getToken, auth0User } = useAuth();
    const { mutate: registerUser } = useRegister();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { data: dbUser, isLoading, refetch } = useConnectedUser(false);
    useEffect(() => {
        const loadUser = async () => {
            const token = await getToken();
            if (token && auth0User) {
                registerUser(auth0User); // register using Auth0 user
                await refetch();
            }
        };

        if (isLoggedIn()) {
            loadUser();
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (dbUser) setUser(dbUser);
    }, [dbUser]);

    return (
        <UserContext.Provider value={{ user, loading: isLoading, refreshUser: refetch }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
