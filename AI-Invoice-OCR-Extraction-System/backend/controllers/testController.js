// Simple test mode - bypasses all external APIs
// Returns mock data immediately for testing

const Invoice = require('../models/Invoice');

const uploadInvoiceTestMode = async (req, res) => {
  console.log('=== TEST MODE: Upload Invoice ===');
  
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log('✓ File uploaded:', req.file.originalname);
    console.log('✓ File path:', req.file.path);

    // Mock extracted data
    const extractedData = {
      supplier_name: 'ABC Suppliers Ltd.',
      invoice_number: 'INV-2024-001',
      invoice_date: '2024-01-15',
      items: [
        {
          description: 'Laptop Computer Dell XPS',
          quantity: 2,
          unit_price: 1200.00,
          amount: 2400.00
        },
        {
          description: 'Wireless Mouse Logitech',
          quantity: 5,
          unit_price: 80.00,
          amount: 400.00
        }
      ],
      currency: 'USD',
      tax_percentage: 18,
      tax_amount: 504.00,
      subtotal: 2800.00,
      total_amount: 3304.00
    };

    // Mock confidence scores
    const confidenceScores = {
      supplier_name: 97,
      invoice_number: 95,
      invoice_date: 94,
      items: 92,
      tax: 93,
      total_amount: 96,
      currency: 98
    };

    // Create invoice
    const invoice = new Invoice({
      userId: req.userId,
      fileName: req.file.originalname,
      filePath: req.file.path,
      supplierName: extractedData.supplier_name,
      invoiceNumber: extractedData.invoice_number,
      invoiceDate: extractedData.invoice_date,
      items: extractedData.items,
      tax: extractedData.tax_percentage,
      currency: extractedData.currency,
      total: extractedData.total_amount,
      jsonData: extractedData,
      confidenceScores,
      validationStatus: 'valid',
      validationMessages: [],
      isDuplicate: false
    });

    await invoice.save();
    console.log('✓ Invoice saved successfully');

    res.status(201).json({
      message: 'Invoice processed successfully (TEST MODE)',
      invoice,
      clarity: 85,
      testMode: true
    });

  } catch (error) {
    console.error('Error in test mode:', error);
    res.status(500).json({ 
      message: 'Test mode failed', 
      error: error.message 
    });
  }
};

module.exports = { uploadInvoiceTestMode };
