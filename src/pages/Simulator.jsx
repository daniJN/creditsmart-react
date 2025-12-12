import React, { useState } from 'react';

const Simulador = () => {
  const [busqueda, setBusqueda] = useState('');
  const [rangoMonto, setRangoMonto] = useState('todos');
  const [ordenarPorTasa, setOrdenarPorTasa] = useState(false);

  const creditos = [
    {
      nombre: "Crédito Personal",
      descripcion: "Ideal para gastos personales y proyectos inmediatos",
      tasa: 12.5,
      montoMin: 5000,
      montoMax: 50000,
      plazoMax: 60,
      imagen: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600"
    },
    {
      nombre: "Crédito Hipotecario",
      descripcion: "Financia la compra de tu casa o departamento",
      tasa: 8.9,
      montoMin: 100000,
      montoMax: 5000000,
      plazoMax: 360,
      imagen: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600"
    },
    {
      nombre: "Crédito Automotriz",
      descripcion: "Obtén el auto de tus sueños con las mejores tasas",
      tasa: 10.5,
      montoMin: 50000,
      montoMax: 500000,
      plazoMax: 84,
      imagen: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600"
    },
    {
      nombre: "Crédito Empresarial",
      descripcion: "Impulsa tu negocio con capital de inversión",
      tasa: 15.0,
      montoMin: 20000,
      montoMax: 1000000,
      plazoMax: 120,
      imagen: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600"
    },
    {
      nombre: "Crédito Educativo",
      descripcion: "Invierte en tu educación y futuro profesional",
      tasa: 9.5,
      montoMin: 10000,
      montoMax: 200000,
      plazoMax: 96,
      imagen: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600"
    },
    {
      nombre: "Crédito de Nómina",
      descripcion: "Exclusivo para empleados con comprobante de nómina",
      tasa: 11.0,
      montoMin: 3000,
      montoMax: 80000,
      plazoMax: 48,
      imagen: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600"
    }
  ];

  // Filtrar créditos
  const creditosFiltrados = creditos
    .filter(credito => {
      const cumpleBusqueda = credito.nombre.toLowerCase().includes(busqueda.toLowerCase());
      
      let cumpleRango = true;
      if (rangoMonto === 'bajo') cumpleRango = credito.montoMax <= 100000;
      else if (rangoMonto === 'medio') cumpleRango = credito.montoMax > 100000 && credito.montoMax <= 500000;
      else if (rangoMonto === 'alto') cumpleRango = credito.montoMax > 500000;
      
      return cumpleBusqueda && cumpleRango;
    })
    .sort((a, b) => ordenarPorTasa ? a.tasa - b.tasa : 0);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 40px auto',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          color: 'white',
          marginBottom: '10px',
          fontWeight: 'bold',
          textShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}>
          Simulador de Créditos
        </h1>
      </div>

      {/* Filtros */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 30px auto',
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: 'clamp(20px, 3vw, 30px)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          alignItems: 'end'
        }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              fontSize: '14px',
              color: '#333'
            }}>
              Buscar por nombre:
            </label>
            <input
              type="text"
              placeholder="Ej: Personal, Vehicular..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 15px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '15px',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              fontSize: '14px',
              color: '#333'
            }}>
              Rango de monto:
            </label>
            <select
              value={rangoMonto}
              onChange={(e) => setRangoMonto(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 15px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '15px',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="todos">Todos los montos</option>
              <option value="bajo">Hasta $100,000</option>
              <option value="medio">$100,000 - $500,000</option>
              <option value="alto">Más de $500,000</option>
            </select>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            paddingTop: '8px'
          }}>
            <input
              type="checkbox"
              id="ordenarTasa"
              checked={ordenarPorTasa}
              onChange={(e) => setOrdenarPorTasa(e.target.checked)}
              style={{
                width: '18px',
                height: '18px',
                cursor: 'pointer'
              }}
            />
            <label
              htmlFor="ordenarTasa"
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                cursor: 'pointer',
                userSelect: 'none'
              }}
            >
              Ordenar por tasa (menor a mayor)
            </label>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 30px auto',
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{
          margin: 0,
          fontSize: 'clamp(18px, 2.5vw, 22px)',
          color: '#667eea',
          fontWeight: 'bold'
        }}>
          {creditosFiltrados.length} crédito(s) encontrado(s)
        </h3>
      </div>

      {/* Grid de Créditos */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '25px'
      }}>
        {creditosFiltrados.map((credito, index) => (
          <div
            key={index}
            style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
            }}
          >
            {/* Imagen */}
            <div style={{
              width: '100%',
              height: '180px',
              backgroundImage: `url(${credito.imagen})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                backgroundColor: '#667eea',
                color: 'white',
                padding: '8px 15px',
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: '14px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
              }}>
                {credito.tasa}% anual
              </div>
            </div>

            {/* Contenido */}
            <div style={{ padding: '25px' }}>
              <h3 style={{
                fontSize: '22px',
                color: '#333',
                marginBottom: '12px',
                fontWeight: 'bold'
              }}>
                {credito.nombre}
              </h3>

              <p style={{
                fontSize: '14px',
                color: '#666',
                marginBottom: '20px',
                lineHeight: '1.6',
                minHeight: '40px'
              }}>
                {credito.descripcion}
              </p>

              {/* Detalles */}
              <div style={{
                borderTop: '1px solid #f0f0f0',
                paddingTop: '15px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '13px'
                }}>
                  <span style={{ color: '#999', fontWeight: '600' }}>Monto:</span>
                  <span style={{ color: '#333', fontWeight: 'bold' }}>
                    ${credito.montoMin.toLocaleString()} - ${credito.montoMax.toLocaleString()}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '13px'
                }}>
                  <span style={{ color: '#999', fontWeight: '600' }}>Plazo máximo:</span>
                  <span style={{ color: '#333', fontWeight: 'bold' }}>
                    {credito.plazoMax} meses
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '13px'
                }}>
                  <span style={{ color: '#999', fontWeight: '600' }}>Tasa:</span>
                  <span style={{ color: '#667eea', fontWeight: 'bold', fontSize: '16px' }}>
                    {credito.tasa}% anual
                  </span>
                </div>
              </div>

              {/* Botón */}
              <button
                style={{
                  width: '100%',
                  marginTop: '20px',
                  padding: '12px',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#5568d3'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#667eea'}
                onClick={() => window.location.href = '/solicitar'}
              >
                Solicitar este crédito
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje si no hay resultados */}
      {creditosFiltrados.length === 0 && (
        <div style={{
          maxWidth: '600px',
          margin: '40px auto',
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '15px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>
            No se encontraron créditos
          </h3>
          <p style={{ color: '#666' }}>
            Intenta ajustar los filtros de búsqueda
          </p>
        </div>
      )}
    </div>
  );
};

export default Simulador;