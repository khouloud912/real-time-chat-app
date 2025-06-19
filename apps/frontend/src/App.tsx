import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import {useAuth} from "./contexts/authContext.tsx";
import {useEffect} from "react";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const RedirectToLogin = () => {
    const { login } = useAuth();

    useEffect(() => {
        login(); // triggers Auth0 login
    }, []);

    return null;
};

function App() {
    return (
        <Routes>
            <Route path="/" element={<RedirectToLogin />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        </Routes>
    );
}

export default App;