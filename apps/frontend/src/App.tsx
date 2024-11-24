import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
