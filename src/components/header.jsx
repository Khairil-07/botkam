import React from 'react';

const Header = () => {
  const headerStyle = {
    background: 'linear-gradient(135deg, #7a8cdd 0%, #a282c0 100%)',
    color: 'white',
    padding: '40px 30px',
    borderRadius: '16px',
    marginBottom: '40px',
    boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
    textAlign: 'center',
    fontFamily: "'Poppins', sans-serif",
  };

  const titleStyle = {
    margin: 0,
    fontSize: '2.5rem',
    fontWeight: '800',
    letterSpacing: '-1px',
  };

  const subtitleStyle = {
    margin: '10px 0 0',
    opacity: 0.9,
    fontSize: '1.1rem',
    fontWeight: '400',
  };

  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>Dashboard Profil Tim</h1>
      <p style={subtitleStyle}>Temukan dan berinteraksi dengan bakat-bakat luar biasa di tim kami.</p>
    </header>
  );
};

export default Header;