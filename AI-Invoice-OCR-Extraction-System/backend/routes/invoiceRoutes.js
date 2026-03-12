const express = require('express');
const { uploadInvoice, getInvoices, getInvoiceById, getAnalytics, updateERPStatus } = require('../controllers/invoiceController');
const { uploadInvoiceTestMode } = require('../controllers/testController');
const upload = require('../utils/fileUpload');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Use TEST_MODE if set in environment
const uploadHandler = process.env.TEST_MODE === 'true' ? uploadInvoiceTestMode : uploadInvoice;

router.post('/upload', authMiddleware, upload.single('invoice'), uploadHandler);
router.get('/', authMiddleware, getInvoices);
router.get('/analytics', authMiddleware, getAnalytics);
router.get('/:id', authMiddleware, getInvoiceById);
router.put('/:id/erp', authMiddleware, updateERPStatus);

module.exports = router;
