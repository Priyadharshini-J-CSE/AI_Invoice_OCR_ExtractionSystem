const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  supplierName: { type: String },
  invoiceNumber: { type: String },
  invoiceDate: { type: String },
  items: [{ 
    description: String, 
    quantity: Number, 
    unitPrice: Number, 
    amount: Number 
  }],
  tax: { type: Number },
  currency: { type: String },
  total: { type: Number },
  jsonData: { type: Object },
  confidenceScores: { type: Object },
  validationStatus: { type: String, enum: ['valid', 'warning', 'error'], default: 'valid' },
  validationMessages: [String],
  erpStatus: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
  isDuplicate: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

invoiceSchema.index({ invoiceNumber: 1, supplierName: 1 });

module.exports = mongoose.model('Invoice', invoiceSchema);
