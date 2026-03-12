import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getAnalytics } from '../services/api';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  if (!analytics) return <div>Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#F5F7FB' }}>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '40px' }}>
          <h1 style={{ color: '#0F1E3A', marginBottom: '30px' }}>Analytics</h1>

          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            marginBottom: '30px'
          }}>
            <h3 style={{ color: '#0F1E3A', marginBottom: '20px' }}>Monthly Invoice Processing</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', height: '200px' }}>
              {Object.entries(analytics.monthlyData || {}).map(([month, count]) => (
                <div key={month} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{
                    background: '#2D6CDF',
                    height: `${(count / Math.max(...Object.values(analytics.monthlyData))) * 150}px`,
                    borderRadius: '8px 8px 0 0',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingTop: '10px',
                    color: 'white',
                    fontWeight: '600'
                  }}>
                    {count}
                  </div>
                  <div style={{ color: '#666', fontSize: '14px' }}>{month}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            marginBottom: '30px'
          }}>
            <h3 style={{ color: '#0F1E3A', marginBottom: '20px' }}>Supplier Spending</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F5F7FB' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>Supplier</th>
                  <th style={{ padding: '12px', textAlign: 'right', color: '#666' }}>Total Spent</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(analytics.supplierSpending || {}).map(([supplier, amount]) => (
                  <tr key={supplier} style={{ borderBottom: '1px solid #F5F7FB' }}>
                    <td style={{ padding: '12px' }}>{supplier}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: '600', color: '#2D6CDF' }}>
                      ${amount.toFixed(2)}
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

export default Analytics;
