import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Settings = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#F5F7FB' }}>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '40px' }}>
          <h1 style={{ color: '#0F1E3A', marginBottom: '30px' }}>Settings</h1>

          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            marginBottom: '20px'
          }}>
            <h3 style={{ color: '#0F1E3A', marginBottom: '20px' }}>API Configuration</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>Google Vision API Key</label>
              <input
                type="text"
                placeholder="Enter your Google Vision API credentials path"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd'
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>OpenAI API Key</label>
              <input
                type="password"
                placeholder="Enter your OpenAI API key"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd'
                }}
              />
            </div>
            <button style={{
              padding: '12px 24px',
              background: '#2D6CDF',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              Save Configuration
            </button>
          </div>

          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ color: '#0F1E3A', marginBottom: '20px' }}>ERP Integration Settings</h3>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input type="checkbox" />
                <span style={{ color: '#0F1E3A' }}>Enable SAP Integration</span>
              </label>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input type="checkbox" />
                <span style={{ color: '#0F1E3A' }}>Enable Zoho Integration</span>
              </label>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input type="checkbox" />
                <span style={{ color: '#0F1E3A' }}>Enable QuickBooks Integration</span>
              </label>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input type="checkbox" />
                <span style={{ color: '#0F1E3A' }}>Enable Tally Integration</span>
              </label>
            </div>
            <button style={{
              padding: '12px 24px',
              background: '#2D6CDF',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              Update Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
