import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import UploadInvoice from '../components/UploadInvoice';
import CameraScanner from '../components/CameraScanner';

const UploadPage = () => {
  const [showCamera, setShowCamera] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#F5F7FB' }}>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '40px' }}>
          <h1 style={{ color: '#0F1E3A', marginBottom: '30px' }}>Upload Invoice</h1>
          
          {!showCamera ? (
            <>
              <UploadInvoice />
              <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <button
                  onClick={() => setShowCamera(true)}
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
                  📷 Capture Invoice
                </button>
              </div>
            </>
          ) : (
            <CameraScanner onClose={() => setShowCamera(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
