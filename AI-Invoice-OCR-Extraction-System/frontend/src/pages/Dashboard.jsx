import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getAnalytics, getInvoices } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [recentInvoices, setRecentInvoices] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const analyticsData = await getAnalytics();
      const invoicesData = await getInvoices();
      setAnalytics(analyticsData);
      setRecentInvoices(invoicesData.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  if (!analytics) return <div>Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#F5F7FB' }}>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '40px' }}>
          <h1 style={{ color: '#0F1E3A', marginBottom: '30px' }}>Dashboard</h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Total Invoices Processed</div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#0F1E3A' }}>{analytics.totalInvoices}</div>
            </div>
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>AI Extraction Accuracy</div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#2D6CDF' }}>{analytics.avgConfidence}%</div>
            </div>
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Invoices Today</div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#0F1E3A' }}>{analytics.invoicesToday}</div>
            </div>
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>ERP Integrations</div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#0F1E3A' }}>{analytics.erpConnections}</div>
            </div>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h2 style={{ color: '#0F1E3A', marginBottom: '20px' }}>Recent Invoices</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F5F7FB' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>File</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>Supplier</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>Total</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentInvoices.map((invoice) => (
                  <tr key={invoice._id} style={{ borderBottom: '1px solid #F5F7FB', cursor: 'pointer' }} onClick={() => navigate(`/results/${invoice._id}`)}>
                    <td style={{ padding: '12px' }}>{invoice.fileName}</td>
                    <td style={{ padding: '12px' }}>{invoice.supplierName || 'N/A'}</td>
                    <td style={{ padding: '12px' }}>{invoice.invoiceDate || 'N/A'}</td>
                    <td style={{ padding: '12px' }}>{invoice.currency} {invoice.total}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ 
                        padding: '4px 12px', 
                        borderRadius: '12px', 
                        background: invoice.validationStatus === 'valid' ? '#d4edda' : '#fff3cd',
                        color: invoice.validationStatus === 'valid' ? '#155724' : '#856404'
                      }}>
                        {invoice.validationStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
