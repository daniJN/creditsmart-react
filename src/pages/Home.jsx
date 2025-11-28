// src/pages/Home.jsx
import { creditsData } from '../data/creditsData';
import CreditCard from '../components/CreditCard';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero-title">Bienvenido a CreditSmart</h1>
        <p className="hero-subtitle">
          Las mejores opciones de crédito para hacer realidad tus proyectos
        </p>
      </section>

      <section className="credits-section">
        <h2 className="section-title">Nuestros Productos Crediticios</h2>
        <div className="credits-grid">
          {creditsData.map((credit) => (
            <CreditCard key={credit.id} credit={credit} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;