// src/pages/Solicitudes.jsx
import React, { useState, useEffect } from 'react';
import { 
  getAllSolicitudes, 
  createSolicitud, 
  deleteSolicitud 
} from '../services/creditService';
import '../styles/Application.css'; // Ajusta la ruta según tu proyecto

function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [formData, setFormData] = useState({
    nombreCliente: '',
    cedula: '',
    monto: '',
    plazo: '',
    producto: 'Crédito Personal'
  });

  // Cargar solicitudes al montar el componente
  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const cargarSolicitudes = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Cargando solicitudes desde Firebase...');
      const data = await getAllSolicitudes();
      console.log('✅ Solicitudes cargadas:', data);
      setSolicitudes(data);
    } catch (err) {
      setError('Error al cargar solicitudes. Verifica tu conexión a internet.');
      console.error('❌ Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setGuardando(true);
      setError(null);
      console.log('💾 Guardando nueva solicitud...');
      
      const nuevaSolicitud = await createSolicitud({
        ...formData,
        monto: parseFloat(formData.monto),
        plazo: parseInt(formData.plazo)
      });
      
      console.log('✅ Solicitud guardada:', nuevaSolicitud);
      setSolicitudes([nuevaSolicitud, ...solicitudes]);
      
      // Limpiar formulario
      setFormData({
        nombreCliente: '',
        cedula: '',
        monto: '',
        plazo: '',
        producto: 'Crédito Personal'
      });
      
      alert('✅ Solicitud creada exitosamente');
    } catch (err) {
      setError('Error al crear solicitud. Intenta nuevamente.');
      console.error('❌ Error:', err);
    } finally {
      setGuardando(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta solicitud?')) {
      return;
    }
    
    try {
      console.log('🗑️ Eliminando solicitud:', id);
      await deleteSolicitud(id);
      setSolicitudes(solicitudes.filter(s => s.id !== id));
      console.log('✅ Solicitud eliminada');
      alert('✅ Solicitud eliminada exitosamente');
    } catch (err) {
      setError('Error al eliminar solicitud.');
      console.error('❌ Error:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ 
          textAlign: 'center', 
          padding: '50px',
          fontSize: '18px'
        }}>
          <div className="spinner" style={{
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>⏳ Cargando solicitudes desde Firebase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ 
      padding: '20px', 
      maxWidth: '1200px', 
      margin: '0 auto' 
    }}>
      
    {/* Lista de solicitudes */}
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ color: '#34495e', marginBottom: '20px' }}>
          📋 Solicitudes Registradas ({solicitudes.length})
        </h2>
        
        {solicitudes.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            color: '#7f8c8d'
          }}>
            <p style={{ fontSize: '18px', marginBottom: '10px' }}>
              📭 No hay solicitudes registradas aún
            </p>
            <p>Crea tu primera solicitud usando el formulario de arriba</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gap: '20px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'
          }}>
            {solicitudes.map((solicitud) => (
              <div 
                key={solicitud.id}
                style={{
                  border: '1px solid #e0e0e0',
                  padding: '20px',
                  borderRadius: '12px',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                <h3 style={{ 
                  color: '#2c3e50', 
                  marginBottom: '15px',
                  fontSize: '20px'
                }}>
                  👤 {solicitud.nombreCliente}
                </h3>
                <div style={{ 
                  display: 'grid', 
                  gap: '10px',
                  color: '#555'
                }}>
                  <p><strong>🆔 Cédula:</strong> {solicitud.cedula}</p>
                  <p><strong>💰 Monto:</strong> ${solicitud.monto?.toLocaleString('es-CO')}</p>
                  <p><strong>📅 Plazo:</strong> {solicitud.plazo} meses</p>
                  <p><strong>🏦 Producto:</strong> {solicitud.producto}</p>
                  <p>
                    <strong>📊 Estado:</strong>{' '}
                    <span style={{
                      backgroundColor: solicitud.estado === 'Aprobado' ? '#d4edda' : '#fff3cd',
                      color: solicitud.estado === 'Aprobado' ? '#155724' : '#856404',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '14px'
                    }}>
                      {solicitud.estado || 'Pendiente'}
                    </span>
                  </p>
                </div>
                
                <button
                  onClick={() => handleDelete(solicitud.id)}
                  style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    marginTop: '15px',
                    width: '100%',
                    fontSize: '15px',
                    fontWeight: '600',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#c0392b'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#e74c3c'}
                >
                  🗑️ Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Solicitudes;