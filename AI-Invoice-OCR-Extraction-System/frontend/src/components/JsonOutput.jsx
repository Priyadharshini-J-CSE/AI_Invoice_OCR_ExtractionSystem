import React, { useState } from 'react';
import { updateERPStatus } from '../services/api';

const JsonOutput = ({ invoice }) => {
  const [erpSystem, setErpSystem] = useState('');

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(invoice.jsonData, null, 2));
    alert('JSON copied to clipboard!');
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(invoice.jsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoice.invoiceNumber || 'data'}.json`;
    a.click();
  };

  const handleExportCSV = () => {
    const items = invoice.jsonData.items || [];
    let csv = 'Description,Quantity,Unit Price,Amount\n';
    items.forEach(item => {
      csv += `"${item.description}",${item.quantity},${item.unit_price},${item.amount}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoice.invoiceNumber || 'data'}.csv`;
    a.click();
  };

  const handleSendToERP = async () => {
    if (!erpSystem) {
      alert('Please select an ERP system');
      return;
    }
    
    try {
      await updateERPStatus(invoice._id, erpSystem);
      alert(`Invoice sent to ${erpSystem} successfully!`);
    } catch (error) {
      alert('Failed to send to ERP: ' + error.message);
    }
  };

  return (
    <div style={{
      background: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      <h3 style={{ color: '#0F1E3A', marginBottom: '20px' }}>JSON Output</h3>
      
      <pre style={{
        background: '#F5F7FB',
        padding: '20px',
        borderRadius: '8px',
        overflow: 'auto',
        maxHeight: '400px',
        fontSize: '13px',
        color: '#0F1E3A'
      }}>
        {JSON.stringify(invoice.jsonData, null, 2)}
      </pre>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
        <button onClick={handleCopyJSON} style={{
          padding: '10px',
          background: '#2D6CDF',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          📋 Copy JSON
        </button>
        <button onClick={handleDownloadJSON} style={{
          padding: '10px',
          background: '#2D6CDF',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          ⬇️ Download JSON
        </button>
        <button onClick={handleExportCSV} style={{
          padding: '10px',
          background: '#2D6CDF',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          📊 Export CSV
        </button>
      </div>

      <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #F5F7FB' }}>
        <h4 style={{ color: '#0F1E3A', marginBottom: '15px' }}>Send to ERP</h4>
        <select 
          value={erpSystem}
          onChange={(e) => setErpSystem(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #ddd',
            marginBottom: '10px'
          }}
        >
          <option value="">Select ERP System</option>
          <option value="SAP">SAP</option>
          <option value="Zoho">Zoho</option>
          <option value="QuickBooks">QuickBooks</option>
          <option value="Tally">Tally</option>
        </select>
        <button onClick={handleSendToERP} style={{
          width: '100%',
          padding: '10px',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          Send to ERP
        </button>
      </div>
    </div>
  );
};

export default JsonOutput;
