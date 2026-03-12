import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadInvoice } from '../services/api';

const UploadInvoice = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    setProgress('Uploading invoice...');
    
    try {
      setTimeout(() => setProgress('Scanning invoice...'), 1000);
      setTimeout(() => setProgress('Extracting text...'), 2000);
      setTimeout(() => setProgress('Analyzing fields...'), 3000);
      setTimeout(() => setProgress('Generating JSON...'), 4000);
      
      const result = await uploadInvoice(file);
      navigate(`/results/${result.invoice._id}`);
    } catch (error) {
      alert('Upload failed: ' + error.message);
      setUploading(false);
      setProgress('');
    }
  };

  if (uploading) {
    return (
      <div style={{
        background: 'white',
        padding: '60px',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
        <h3 style={{ color: '#0F1E3A', marginBottom: '10px' }}>Processing Invoice</h3>
        <p style={{ color: '#666' }}>{progress}</p>
      </div>
    );
  }

  return (
    <div>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          background: dragActive ? '#e8f0fe' : 'white',
          padding: '60px',
          borderRadius: '16px',
          border: `2px dashed ${dragActive ? '#2D6CDF' : '#ddd'}`,
          textAlign: 'center',
          cursor: 'pointer'
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>📄</div>
        <h3 style={{ color: '#0F1E3A', marginBottom: '10px' }}>
          {file ? file.name : 'Drag and Drop Invoice Here'}
        </h3>
        <p style={{ color: '#666', marginBottom: '20px' }}>or</p>
        <label style={{
          padding: '12px 24px',
          background: '#2D6CDF',
          color: 'white',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'inline-block'
        }}>
          Browse Files
          <input type="file" onChange={handleChange} accept=".pdf,.png,.jpg,.jpeg" style={{ display: 'none' }} />
        </label>
        <p style={{ color: '#999', marginTop: '20px', fontSize: '14px' }}>
          Supported formats: PDF, PNG, JPG
        </p>
      </div>
      
      {file && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={handleUpload}
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
            Upload and Process
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadInvoice;
