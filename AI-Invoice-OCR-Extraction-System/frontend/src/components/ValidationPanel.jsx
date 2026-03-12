import React from 'react';

const ValidationPanel = ({ invoice }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'valid': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return '❓';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'valid': return '#4CAF50';
      case 'warning': return '#FFA726';
      case 'error': return '#F44336';
      default: return '#999';
    }
  };

  return (
    <div style={{
      background: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <span style={{ fontSize: '24px' }}>{getStatusIcon(invoice.validationStatus)}</span>
        <h3 style={{ color: '#0F1E3A', margin: 0 }}>Validation Status</h3>
        <span style={{
          marginLeft: 'auto',
          padding: '4px 12px',
          borderRadius: '12px',
          background: getStatusColor(invoice.validationStatus) + '20',
          color: getStatusColor(invoice.validationStatus),
          fontWeight: '600',
          fontSize: '14px'
        }}>
          {invoice.validationStatus.toUpperCase()}
        </span>
      </div>

      {invoice.validationMessages && invoice.validationMessages.length > 0 && (
        <div>
          {invoice.validationMessages.map((message, index) => (
            <div key={index} style={{
              padding: '12px',
              background: invoice.isDuplicate && message.includes('Duplicate') ? '#fff3cd' : '#f8f9fa',
              borderRadius: '8px',
              marginBottom: '10px',
              borderLeft: `4px solid ${invoice.isDuplicate && message.includes('Duplicate') ? '#FFA726' : '#2D6CDF'}`
            }}>
              <div style={{ color: '#0F1E3A', fontSize: '14px' }}>{message}</div>
            </div>
          ))}
        </div>
      )}

      {(!invoice.validationMessages || invoice.validationMessages.length === 0) && (
        <div style={{ color: '#4CAF50', fontSize: '14px' }}>
          ✓ All validations passed successfully
        </div>
      )}
    </div>
  );
};

export default ValidationPanel;
