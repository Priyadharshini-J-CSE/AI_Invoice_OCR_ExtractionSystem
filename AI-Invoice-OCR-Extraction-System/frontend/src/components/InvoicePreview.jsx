import React from 'react';

const InvoicePreview = ({ invoice }) => {
  return (
    <div style={{
      background: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      <h3 style={{ color: '#0F1E3A', marginBottom: '20px' }}>Invoice Preview</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <img 
          src={`http://localhost:5000/${invoice.filePath}`} 
          alt="Invoice" 
          style={{ 
            width: '100%', 
            borderRadius: '8px',
            border: '1px solid #ddd'
          }} 
        />
      </div>

      <div style={{ borderTop: '1px solid #F5F7FB', paddingTop: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <div style={{ color: '#666', fontSize: '14px', marginBottom: '4px' }}>Supplier Name</div>
          <div style={{ color: '#0F1E3A', fontWeight: '600' }}>{invoice.supplierName || 'N/A'}</div>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <div style={{ color: '#666', fontSize: '14px', marginBottom: '4px' }}>Invoice Number</div>
          <div style={{ color: '#0F1E3A', fontWeight: '600' }}>{invoice.invoiceNumber || 'N/A'}</div>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <div style={{ color: '#666', fontSize: '14px', marginBottom: '4px' }}>Date</div>
          <div style={{ color: '#0F1E3A', fontWeight: '600' }}>{invoice.invoiceDate || 'N/A'}</div>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <div style={{ color: '#666', fontSize: '14px', marginBottom: '4px' }}>Currency</div>
          <div style={{ color: '#0F1E3A', fontWeight: '600' }}>{invoice.currency || 'N/A'}</div>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <div style={{ color: '#666', fontSize: '14px', marginBottom: '4px' }}>Tax</div>
          <div style={{ color: '#0F1E3A', fontWeight: '600' }}>{invoice.tax}%</div>
        </div>
        <div>
          <div style={{ color: '#666', fontSize: '14px', marginBottom: '4px' }}>Total Amount</div>
          <div style={{ color: '#2D6CDF', fontWeight: '700', fontSize: '24px' }}>
            {invoice.currency} {invoice.total}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
