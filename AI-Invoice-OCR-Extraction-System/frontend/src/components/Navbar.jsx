import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      background: 'white',
      padding: '16px 40px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ 
        fontSize: '24px', 
        fontWeight: '700', 
        color: '#0F1E3A',
        cursor: 'pointer'
      }} onClick={() => navigate('/')}>
        AI Invoice OCR
      </div>
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        {authenticated ? (
          <>
            <span style={{ cursor: 'pointer', color: '#0F1E3A' }} onClick={() => navigate('/dashboard')}>Dashboard</span>
            <span style={{ cursor: 'pointer', color: '#0F1E3A' }} onClick={() => navigate('/upload')}>Upload</span>
            <span style={{ cursor: 'pointer', color: '#0F1E3A' }} onClick={() => navigate('/analytics')}>Analytics</span>
            <button onClick={handleLogout} style={{
              padding: '8px 20px',
              background: '#2D6CDF',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>Logout</button>
          </>
        ) : (
          <>
            <span style={{ cursor: 'pointer', color: '#0F1E3A' }}>Features</span>
            <span style={{ cursor: 'pointer', color: '#0F1E3A' }}>About</span>
            <span style={{ cursor: 'pointer', color: '#0F1E3A' }}>Pricing</span>
            <span style={{ cursor: 'pointer', color: '#0F1E3A' }}>Contact</span>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
