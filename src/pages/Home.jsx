import React from 'react';

const Home = () => {
  const productos = [
    {
      nombre: "Crédito Personal",
      descripcion: "Ideal para gastos personales y proyectos inmediatos",
      tasa: "12.5% anual",
      imagen: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600"
    },
    {
      nombre: "Crédito Hipotecario",
      descripcion: "Financia la compra de tu casa o departamento",
      tasa: "8.9% anual",
      imagen: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600"
    },
    {
      nombre: "Crédito Automotriz",
      descripcion: "Obtén el auto de tus sueños con las mejores tasas",
      tasa: "10.5% anual",
      imagen: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600"
    },
    {
      nombre: "Crédito Empresarial",
      descripcion: "Impulsa tu negocio con capital de inversión",
      tasa: "15.0% anual",
      imagen: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600"
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '0',
      margin: '0'
    }}>
      {/* Hero Section */}
      <div style={{
        width: '100%',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '60px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            color: '#667eea',
            marginBottom: '20px',
            fontWeight: 'bold'
          }}>
            Bienvenido a CreditSmart
          </h1>
          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: '#666',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Las mejores opciones de crédito para hacer realidad tus proyectos
          </p>
        </div>
      </div>

      {/* Productos Section */}
      <div style={{
        width: '100%',
        padding: '60px 20px'
      }}>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 42px)',
          color: 'white',
          textAlign: 'center',
          marginBottom: '50px',
          fontWeight: 'bold'
        }}>
          Nuestros Productos Crediticios
        </h2>

        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          padding: '0 20px'
        }}>
          {productos.map((producto, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
              }}
            >
              <div style={{
                width: '100%',
                height: '200px',
                backgroundImage: `url(${producto.imagen})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
              
              <div style={{ padding: '25px' }}>
                <h3 style={{
                  fontSize: '24px',
                  color: '#333',
                  marginBottom: '15px',
                  fontWeight: 'bold'
                }}>
                  {producto.nombre}
                </h3>
                
                <p style={{
                  fontSize: '15px',
                  color: '#666',
                  marginBottom: '20px',
                  lineHeight: '1.6'
                }}>
                  {producto.descripcion}
                </p>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '15px',
                  borderTop: '1px solid #eee'
                }}>
                  <span style={{
                    fontSize: '14px',
                    color: '#999',
                    fontWeight: '600'
                  }}>
                    Tasa:
                  </span>
                  <span style={{
                    fontSize: '18px',
                    color: '#667eea',
                    fontWeight: 'bold'
                  }}>
                    {producto.tasa}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div style={{
        width: '100%',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            color: 'white',
            marginBottom: '25px',
            fontWeight: 'bold'
          }}>
            ¿Listo para comenzar?
          </h2>
          <p style={{
            fontSize: 'clamp(16px, 2vw, 18px)',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '35px'
          }}>
            Solicita tu crédito hoy y obtén una respuesta en 24 horas
          </p>
          
        </div>
      </div>
    
      {/* Media Query para móviles */}
      <style>{`
        @media (max-width: 768px) {
          body {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;