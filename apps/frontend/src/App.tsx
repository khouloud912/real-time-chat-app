import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import {useAuth} from "./contexts/authContext.tsx";
import {useEffect} from "react";

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
            <Route path="/home" element={<Home />} />
        </Routes>
    );
}

export default App;