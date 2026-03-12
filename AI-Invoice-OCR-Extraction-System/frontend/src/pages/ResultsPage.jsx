import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import InvoicePreview from '../components/InvoicePreview';
import JsonOutput from '../components/JsonOutput';
import ValidationPanel from '../components/ValidationPanel';
import { getInvoiceById } from '../services/api';

const ResultsPage = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    fetchInvoice();
  }, [id]);

  const fetchInvoice = async () => {
    try {
      const data = await getInvoiceById(id);
      setInvoice(data);
    } catch (error) {
      console.error('Failed to fetch invoice:', error);
    }
  };

  if (!invoice) return <div>Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#F5F7FB' }}>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '40px' }}>
          <h1 style={{ color: '#0F1E3A', marginBottom: '30px' }}>Extraction Results</h1>
          
          <ValidationPanel invoice={invoice} />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '30px' }}>
            <InvoicePreview invoice={invoice} />
            <JsonOutput invoice={invoice} />
          </div>

          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            marginTop: '30px'
          }}>
            <h3 style={{ color: '#0F1E3A', marginBottom: '20px' }}>Extraction Confidence</h3>
            {Object.entries(invoice.confidenceScores || {}).map(([field, score]) => (
              <div key={field} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ color: '#0F1E3A', textTransform: 'capitalize' }}>
                    {field.replace(/_/g, ' ')}
                  </span>
                  <span style={{ color: '#2D6CDF', fontWeight: '600' }}>{score}%</span>
                </div>
                <div style={{ background: '#F5F7FB', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    background: score >= 90 ? '#4CAF50' : score >= 75 ? '#FFA726' : '#F44336',
                    height: '100%',
                    width: `${score}%`,
                    transition: 'width 0.3s'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
