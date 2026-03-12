const Invoice = require('../models/Invoice');
const { processOCR } = require('../services/ocrService');
const { extractInvoiceData } = require('../services/aiService');
const { validateInvoiceData } = require('../services/validationService');
const { calculateClarity } = require('../utils/clarityDetection');

const uploadInvoice = async (req, res) => {
  console.log('=== Upload Invoice Started ===');
  
  try {
    // Step 1: Check file upload
    if (!req.file) {
      console.error('Error: No file uploaded');
      return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log('✓ File uploaded:', req.file.originalname);
    console.log('✓ File path:', req.file.path);

    // Step 2: Calculate clarity
    console.log('Step 2: Calculating clarity...');
    let clarity = 50;
    try {
      clarity = await calculateClarity(req.file.path);
      console.log('✓ Clarity calculated:', clarity);
    } catch (clarityError) {
      console.warn('Warning: Clarity calculation failed, using default:', clarityError.message);
    }

    // Step 3: Process OCR
    console.log('Step 3: Processing OCR...');
    let ocrText = '';
    try {
      ocrText = await processOCR(req.file.path);
      console.log('✓ OCR completed, text length:', ocrText.length);
      console.log('OCR Text preview:', ocrText.substring(0, 200));
    } catch (ocrError) {
      console.error('Error: OCR processing failed:', ocrError.message);
      return res.status(500).json({ 
        message: 'OCR processing failed', 
        error: ocrError.message,
        step: 'OCR'
      });
    }

    // Step 4: Extract invoice data with AI
    console.log('Step 4: Extracting invoice data with AI...');
    let extractedData = {};
    let confidenceScores = {};
    try {
      const result = await extractInvoiceData(ocrText);
      extractedData = result.extractedData;
      confidenceScores = result.confidenceScores;
      console.log('✓ AI extraction completed');
      console.log('Extracted data:', JSON.stringify(extractedData, null, 2));
    } catch (aiError) {
      console.error('Error: AI extraction failed:', aiError.message);
      return res.status(500).json({ 
        message: 'AI extraction failed', 
        error: aiError.message,
        step: 'AI_EXTRACTION'
      });
    }

    // Step 5: Validate invoice data
    console.log('Step 5: Validating invoice data...');
    let validationStatus = 'valid';
    let validationMessages = [];
    let isDuplicate = false;
    try {
      const validation = await validateInvoiceData(extractedData, req.userId);
      validationStatus = validation.validationStatus;
      validationMessages = validation.validationMessages;
      isDuplicate = validation.isDuplicate;
      console.log('✓ Validation completed:', validationStatus);
    } catch (validationError) {
      console.warn('Warning: Validation failed, using defaults:', validationError.message);
    }

    // Step 6: Create invoice document
    console.log('Step 6: Creating invoice document...');
    const invoice = new Invoice({
      userId: req.userId,
      fileName: req.file.originalname,
      filePath: req.file.path,
      supplierName: extractedData.supplier_name || 'Unknown',
      invoiceNumber: extractedData.invoice_number || 'N/A',
      invoiceDate: extractedData.invoice_date || new Date().toISOString().split('T')[0],
      items: extractedData.items || [],
      tax: extractedData.tax_percentage || 0,
      currency: extractedData.currency || 'USD',
      total: extractedData.total_amount || 0,
      jsonData: extractedData,
      confidenceScores,
      validationStatus,
      validationMessages,
      isDuplicate
    });

    // Step 7: Save to database
    console.log('Step 7: Saving to database...');
    try {
      await invoice.save();
      console.log('✓ Invoice saved successfully, ID:', invoice._id);
    } catch (dbError) {
      console.error('Error: Database save failed:', dbError.message);
      return res.status(500).json({ 
        message: 'Database save failed', 
        error: dbError.message,
        step: 'DATABASE'
      });
    }

    console.log('=== Upload Invoice Completed Successfully ===');
    res.status(201).json({
      message: 'Invoice processed successfully',
      invoice,
      clarity
    });
  } catch (error) {
    console.error('=== FATAL ERROR in uploadInvoice ===');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: 'Invoice processing failed', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch invoices', error: error.message });
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ _id: req.params.id, userId: req.userId });
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch invoice', error: error.message });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const totalInvoices = await Invoice.countDocuments({ userId: req.userId });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const invoicesToday = await Invoice.countDocuments({
      userId: req.userId,
      createdAt: { $gte: today }
    });

    const invoices = await Invoice.find({ userId: req.userId });
    
    const avgConfidence = invoices.reduce((sum, inv) => {
      const scores = Object.values(inv.confidenceScores || {});
      const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
      return sum + avg;
    }, 0) / (invoices.length || 1);

    const monthlyData = {};
    invoices.forEach(inv => {
      const month = new Date(inv.createdAt).toLocaleString('default', { month: 'short' });
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    });

    const supplierSpending = {};
    invoices.forEach(inv => {
      if (inv.supplierName && inv.total) {
        supplierSpending[inv.supplierName] = (supplierSpending[inv.supplierName] || 0) + inv.total;
      }
    });

    res.json({
      totalInvoices,
      invoicesToday,
      avgConfidence: Math.round(avgConfidence),
      erpConnections: 0,
      monthlyData,
      supplierSpending
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch analytics', error: error.message });
  }
};

const updateERPStatus = async (req, res) => {
  try {
    const { erpSystem } = req.body;
    const invoice = await Invoice.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { erpStatus: 'sent' },
      { new: true }
    );

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.json({ message: `Invoice sent to ${erpSystem}`, invoice });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update ERP status', error: error.message });
  }
};

module.exports = { uploadInvoice, getInvoices, getInvoiceById, getAnalytics, updateERPStatus };
