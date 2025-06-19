// components/ProtectedRoute.tsx
import { ReactNode, useEffect } from 'react';
import { useAuth } from '../contexts/authContext';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isLoggedIn, login, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && !isLoggedIn()) {
            login();
        }
    }, [isLoading, isLoggedIn, login]);

    if (isLoading) return null;

    return isLoggedIn() ? <>{children}</> : null;
};
export default ProtectedRoute;