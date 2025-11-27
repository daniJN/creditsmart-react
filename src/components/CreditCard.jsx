// src/components/CreditCard.jsx
import '../styles/CreditCard.css';

function CreditCard({ credit }) {
  return (
    <div className="credit-card">
      <img 
        src={credit.image} 
        alt={credit.name} 
        className="credit-card-image"
      />
      <div className="credit-card-content">
        <h3 className="credit-card-title">{credit.name}</h3>
        <p className="credit-card-description">{credit.description}</p>
        <div className="credit-card-details">
          <div className="detail-item">
            <span className="detail-label">Tasa:</span>
            <span className="detail-value">{credit.interestRate}% anual</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Monto:</span>
            <span className="detail-value">
              ${credit.minAmount.toLocaleString()} - ${credit.maxAmount.toLocaleString()}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Plazo:</span>
            <span className="detail-value">
              {credit.minTerm} - {credit.maxTerm} meses
            </span>
          </div>
        </div>
        <button className="credit-card-button">Solicitar ahora</button>
      </div>
    </div>
  );
}

export default CreditCard;