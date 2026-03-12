import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/upload', label: 'Upload Invoice', icon: '📤' },
    { path: '/analytics', label: 'Analytics', icon: '📈' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div style={{
      width: '250px',
      background: 'white',
      minHeight: 'calc(100vh - 60px)',
      padding: '20px',
      boxShadow: '2px 0 8px rgba(0,0,0,0.05)'
    }}>
      {menuItems.map((item) => (
        <div
          key={item.path}
          onClick={() => navigate(item.path)}
          style={{
            padding: '12px 16px',
            marginBottom: '8px',
            borderRadius: '8px',
            cursor: 'pointer',
            background: location.pathname === item.path ? '#2D6CDF' : 'transparent',
            color: location.pathname === item.path ? 'white' : '#0F1E3A',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
