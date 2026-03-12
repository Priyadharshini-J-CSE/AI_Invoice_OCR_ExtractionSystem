const Invoice = require('../models/Invoice');

const validateInvoiceData = async (extractedData, userId) => {
  const validationMessages = [];
  let validationStatus = 'valid';

  if (!extractedData.supplier_name) {
    validationMessages.push('Missing supplier name');
    validationStatus = 'error';
  }

  if (!extractedData.invoice_number) {
    validationMessages.push('Missing invoice number');
    validationStatus = 'error';
  }

  if (!extractedData.total_amount) {
    validationMessages.push('Missing total amount');
    validationStatus = 'error';
  }

  if (extractedData.items && extractedData.items.length > 0) {
    const itemsTotal = extractedData.items.reduce((sum, item) => sum + (item.amount || 0), 0);
    const calculatedTotal = itemsTotal + (extractedData.tax_amount || 0);
    
    if (Math.abs(calculatedTotal - extractedData.total_amount) > 0.01) {
      validationMessages.push('Total amount mismatch detected');
      validationStatus = validationStatus === 'error' ? 'error' : 'warning';
    }
  }

  if (!extractedData.currency) {
    validationMessages.push('Currency not detected');
    validationStatus = validationStatus === 'error' ? 'error' : 'warning';
  }

  let isDuplicate = false;
  if (extractedData.invoice_number && extractedData.supplier_name) {
    const existingInvoice = await Invoice.findOne({
      userId,
      invoiceNumber: extractedData.invoice_number,
      supplierName: extractedData.supplier_name
    });

    if (existingInvoice) {
      isDuplicate = true;
      validationMessages.push('Duplicate invoice detected - Invoice number already exists for this supplier');
      validationStatus = 'warning';
    }
  }

  return { validationStatus, validationMessages, isDuplicate };
};

module.exports = { validateInvoiceData };
