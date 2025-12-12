
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          💳 CreditSmart
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">Inicio</Link>
          </li>
          <li>
            <Link to="/simulator" className="navbar-link">Simulador</Link>
          </li>
          <li>
            <Link to="/application" className="navbar-link">Solicitar</Link>
          </li>
          <li>
            <Link to="/solicitudes">Gestión</Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;