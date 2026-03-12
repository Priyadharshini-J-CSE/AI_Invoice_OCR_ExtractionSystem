import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#F5F7FB' }}>
      <Navbar />
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '80px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '60px'
      }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ 
            fontSize: '48px', 
            color: '#0F1E3A', 
            marginBottom: '20px',
            fontWeight: '700'
          }}>
            AI Powered Invoice Intelligence for ERP Systems
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#666', 
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Automatically extract invoice data from images, PDFs, or camera scans and convert them into structured JSON ready for ERP integration.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button 
              onClick={() => navigate('/login')}
              style={{
                padding: '14px 32px',
                background: '#2D6CDF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/register')}
              style={{
                padding: '14px 32px',
                background: 'white',
                color: '#2D6CDF',
                border: '2px solid #2D6CDF',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Register
            </button>
          </div>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📄</div>
            <div style={{ fontSize: '32px', margin: '20px 0' }}>→</div>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🤖</div>
            <div style={{ fontSize: '32px', margin: '20px 0' }}>→</div>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📊</div>
            <div style={{ fontSize: '32px', margin: '20px 0' }}>→</div>
            <div style={{ fontSize: '48px' }}>💼</div>
            <p style={{ marginTop: '20px', color: '#666' }}>Invoice → AI → JSON → ERP</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
