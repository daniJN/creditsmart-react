
import { useState } from 'react';
import { creditsData } from '../data/creditsData';
import '../styles/Application.css';
import { createSolicitud } from '../services/creditService';

function Application() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    creditType: '',
    amount: '',
    term: ''
  });

  const [errors, setErrors] = useState({});
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [applications, setApplications] = useState([]);
  const [guardando, setGuardando] = useState(false);
  const [errorFirebase, setErrorFirebase] = useState(null);

  // Validaciones en tiempo real
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'fullName':
        if (value.trim().length < 3) {
          error = 'El nombre debe tener al menos 3 caracteres';
        }
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Email inválido';
        }
        break;
      case 'phone':
        if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) {
          error = 'Teléfono debe tener 10 dígitos';
        }
        break;
      case 'creditType':
        if (!value) {
          error = 'Selecciona un tipo de crédito';
        }
        break;
      case 'amount':
        if (value && formData.creditType) {
          const credit = creditsData.find(c => c.id === parseInt(formData.creditType));
          if (credit && (value < credit.minAmount || value > credit.maxAmount)) {
            error = `Monto debe estar entre $${credit.minAmount.toLocaleString()} y $${credit.maxAmount.toLocaleString()}`;
          }
        }
        break;
      case 'term':
        if (value && formData.creditType) {
          const credit = creditsData.find(c => c.id === parseInt(formData.creditType));
          if (credit && (value < credit.minTerm || value > credit.maxTerm)) {
            error = `Plazo debe estar entre ${credit.minTerm} y ${credit.maxTerm} meses`;
          }
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validar campo
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    // Calcular cuota mensual si hay monto, plazo y tipo de crédito
    if ((name === 'amount' || name === 'term' || name === 'creditType')) {
      calculateMonthlyPayment(
        name === 'amount' ? value : formData.amount,
        name === 'term' ? value : formData.term,
        name === 'creditType' ? value : formData.creditType
      );
    }
  };

  const calculateMonthlyPayment = (amount, term, creditTypeId) => {
    if (amount && term && creditTypeId) {
      const credit = creditsData.find(c => c.id === parseInt(creditTypeId));
      if (credit) {
        const principal = parseFloat(amount);
        const monthlyRate = credit.interestRate / 100 / 12;
        const numPayments = parseInt(term);
        
        // Fórmula de cuota fija: P * [r(1+r)^n] / [(1+r)^n - 1]
        const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) 
                       / (Math.pow(1 + monthlyRate, numPayments) - 1);
        
        setMonthlyPayment(payment);
      }
    } else {
      setMonthlyPayment(0);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validar formulario
  const newErrors = {};
  
  if (!formData.fullName.trim()) {
    newErrors.fullName = 'El nombre es requerido';
  }
  
  if (!formData.email.trim()) {
    newErrors.email = 'El email es requerido';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Email inválido';
  }
  
  if (!formData.phone.trim()) {
    newErrors.phone = 'El teléfono es requerido';
  }
  
  if (!formData.amount || formData.amount < 1000000) {
    newErrors.amount = 'El monto mínimo es $1,000,000';
  }
  
  if (!formData.term || formData.term < 6) {
    newErrors.term = 'El plazo mínimo es 6 meses';
  }
  
  if (!formData.creditType) {
    newErrors.creditType = 'Selecciona un tipo de crédito';
  }
  
  setErrors(newErrors);
  
  // Si hay errores, no continuar
  if (Object.keys(newErrors).length > 0) {
    return;
  }
  
  try {
    setGuardando(true);
    setErrorFirebase(null);
    
    console.log('💾 Guardando solicitud en Firebase...');
    
    // Preparar datos para Firebase
    const solicitudData = {
      nombreCliente: formData.fullName,
      cedula: formData.phone, // Puedes agregar un campo específico para cédula
      email: formData.email,
      telefono: formData.phone,
      monto: parseFloat(formData.amount),
      plazo: parseInt(formData.term),
      producto: formData.creditType,
      estado: 'Pendiente',
      // Datos adicionales opcionales:
      ingresos: formData.income ? parseFloat(formData.income) : null,
      proposito: formData.purpose || null
    };
    
    // Guardar en Firebase
    const resultado = await createSolicitud(solicitudData);
    
    console.log('✅ Solicitud guardada exitosamente:', resultado);
    
    // Mostrar mensaje de éxito
    setShowSuccess(true);

    {errorFirebase && (
  <div className="error-message" style={{
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '1px solid #ef5350'
  }}>
    ⚠️ {errorFirebase}
  </div>
)}
    
    // Limpiar formulario después de 2 segundos
    setTimeout(() => {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        amount: '',
        term: '',
        creditType: '',
        income: '',
        purpose: ''
      });
      setShowSuccess(false);
    }, 3000);
    
  } catch (error) {
    console.error('❌ Error al guardar en Firebase:', error);
    setErrorFirebase('Hubo un error al guardar tu solicitud. Por favor, intenta nuevamente.');
  } finally {
    setGuardando(false);
  }
};

  const confirmApplication = () => {
    const credit = creditsData.find(c => c.id === parseInt(formData.creditType));
    
    const newApplication = {
      id: Date.now(),
      ...formData,
      creditName: credit.name,
      monthlyPayment: monthlyPayment,
      date: new Date().toLocaleDateString()
    };

    setApplications(prev => [...prev, newApplication]);
    setShowSuccess(true);
    setShowSummary(false);

    // Limpiar formulario después de 2 segundos
    setTimeout(() => {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        creditType: '',
        amount: '',
        term: ''
      });
      setMonthlyPayment(0);
      setShowSuccess(false);
    }, 3000);
  };

  const selectedCredit = formData.creditType 
    ? creditsData.find(c => c.id === parseInt(formData.creditType))
    : null;

  return (
    <div className="application">
      <h1 className="page-title">Solicitar Crédito</h1>

      {showSuccess && (
        <div className="success-message">
          ✅ ¡Solicitud enviada exitosamente! Te contactaremos pronto.
        </div>
      )}

      <form onSubmit={handleSubmit} className="application-form">
        {/* Datos personales */}
        <div className="form-section">
          <h2 className="form-section-title">Datos Personales</h2>

          <div className="form-group">
            <label htmlFor="fullName">Nombre Completo *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={errors.fullName ? 'input-error' : ''}
            />
            {errors.fullName && <span className="error-text">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Teléfono *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={errors.phone ? 'input-error' : ''}
              placeholder="1234567890"
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>
        </div>

        {/* Detalles del crédito */}
        <div className="form-section">
          <h2 className="form-section-title">Detalles del Crédito</h2>

          <div className="form-group">
            <label htmlFor="creditType">Tipo de Crédito *</label>
            <select
              id="creditType"
              name="creditType"
              value={formData.creditType}
              onChange={handleInputChange}
              className={errors.creditType ? 'input-error' : ''}
            >
              <option value="">Selecciona un crédito</option>
              {creditsData.map(credit => (
                <option key={credit.id} value={credit.id}>
                  {credit.name} - Tasa: {credit.interestRate}%
                </option>
              ))}
            </select>
            {errors.creditType && <span className="error-text">{errors.creditType}</span>}
          </div>

          {selectedCredit && (
            <div className="credit-info">
              <p><strong>Monto permitido:</strong> ${selectedCredit.minAmount.toLocaleString()} - ${selectedCredit.maxAmount.toLocaleString()}</p>
              <p><strong>Plazo permitido:</strong> {selectedCredit.minTerm} - {selectedCredit.maxTerm} meses</p>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="amount">Monto Solicitado ($) *</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className={errors.amount ? 'input-error' : ''}
              min="0"
            />
            {errors.amount && <span className="error-text">{errors.amount}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="term">Plazo (meses) *</label>
            <input
              type="number"
              id="term"
              name="term"
              value={formData.term}
              onChange={handleInputChange}
              className={errors.term ? 'input-error' : ''}
              min="1"
            />
            {errors.term && <span className="error-text">{errors.term}</span>}
          </div>

          {monthlyPayment > 0 && (
            <div className="monthly-payment">
              <strong>Cuota Mensual Estimada:</strong>
              <span className="payment-amount">${monthlyPayment.toFixed(2)}</span>
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={guardando}
          style={{
          opacity: guardando ? 0.6 : 1,
          cursor: guardando ? 'not-allowed' : 'pointer'
        }}
>
  {guardando ? '⏳ Guardando...' : 'Enviar Solicitud'}
</button>
      </form>

      {/* Modal de resumen */}
      {showSummary && (
        <div className="modal-overlay" onClick={() => setShowSummary(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Resumen de Solicitud</h2>
            <div className="summary-details">
              <p><strong>Nombre:</strong> {formData.fullName}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Teléfono:</strong> {formData.phone}</p>
              <p><strong>Crédito:</strong> {selectedCredit?.name}</p>
              <p><strong>Monto:</strong> ${parseFloat(formData.amount).toLocaleString()}</p>
              <p><strong>Plazo:</strong> {formData.term} meses</p>
              <p><strong>Cuota Mensual:</strong> ${monthlyPayment.toFixed(2)}</p>
            </div>
            <div className="modal-buttons">
              <button onClick={confirmApplication} className="confirm-button">
                Confirmar Solicitud
              </button>
              <button onClick={() => setShowSummary(false)} className="cancel-button">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Application;