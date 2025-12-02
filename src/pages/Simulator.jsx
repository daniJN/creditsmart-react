import { useState } from 'react';
import { creditsData } from '../data/creditsData';
import CreditCard from '../components/CreditCard';
import '../styles/Simulator.css';

function Simulator() {
  const [searchTerm, setSearchTerm] = useState('');
  const [amountRange, setAmountRange] = useState('all');
  const [sortByRate, setSortByRate] = useState(false);

  const filteredCredits = creditsData
    .filter((credit) => {
      const matchesSearch = credit.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      let matchesAmount = true;
      if (amountRange === 'low') {
        matchesAmount = credit.maxAmount <= 30000;
      } else if (amountRange === 'medium') {
        matchesAmount = credit.maxAmount > 30000 && credit.maxAmount <= 100000;
      } else if (amountRange === 'high') {
        matchesAmount = credit.maxAmount > 100000;
      }

      return matchesSearch && matchesAmount;
    })
    .sort((a, b) => {
      if (sortByRate) {
        return a.interestRate - b.interestRate;
      }
      return 0;
    });

  return (
    <div className="simulator">
      <h1 className="page-title">Simulador de Créditos</h1>

      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="search">Buscar por nombre:</label>
          <input
            type="text"
            id="search"
            placeholder="Ej: Personal, Vehicular..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="amount">Rango de monto:</label>
          <select
            id="amount"
            value={amountRange}
            onChange={(e) => setAmountRange(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todos los montos</option>
            <option value="low">Hasta $30,000</option>
            <option value="medium">$30,001 - $100,000</option>
            <option value="high">Más de $100,000</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={sortByRate}
              onChange={(e) => setSortByRate(e.target.checked)}
            />
            Ordenar por tasa (menor a mayor)
          </label>
        </div>
      </div>

      <div className="results-container">
        <p className="results-count">
          {filteredCredits.length} crédito(s) encontrado(s)
        </p>

        {filteredCredits.length > 0 ? (
          <div className="credits-grid">
            {filteredCredits.map((credit) => (
              <CreditCard key={credit.id} credit={credit} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>😕 No hay créditos disponibles con los filtros seleccionados</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setAmountRange('all');
                setSortByRate(false);
              }}
              className="reset-button"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Simulator;