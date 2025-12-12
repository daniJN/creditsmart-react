// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Simulator from './pages/Simulator';
import Application from './pages/Application';
import Solicitudes from './pages/Solicitudes';

import './App.css';


function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/application" element={<Application />} />
            <Route path="/solicitudes" element={<Solicitudes />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2025 CreditSmart - Todos los derechos reservados</p>
        </footer>
      </div>
    </Router>
  );
}


export default App;