import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const uploadInvoice = async (file) => {
  const formData = new FormData();
  formData.append('invoice', file);
  
  const response = await axios.post(`${API_URL}/invoices/upload`, formData, {
    headers: {
      ...getAuthHeader(),
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response.data;
};

export const getInvoices = async () => {
  const response = await axios.get(`${API_URL}/invoices`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getInvoiceById = async (id) => {
  const response = await axios.get(`${API_URL}/invoices/${id}`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getAnalytics = async () => {
  const response = await axios.get(`${API_URL}/invoices/analytics`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const updateERPStatus = async (id, erpSystem) => {
  const response = await axios.put(`${API_URL}/invoices/${id}/erp`, 
    { erpSystem },
    { headers: getAuthHeader() }
  );
  return response.data;
};
