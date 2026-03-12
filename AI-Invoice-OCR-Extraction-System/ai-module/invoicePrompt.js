const createInvoicePrompt = (ocrText) => {
  return `Extract invoice information from the following text and return ONLY a valid JSON object with these exact fields:

{
  "supplier_name": "string",
  "invoice_number": "string",
  "invoice_date": "string (YYYY-MM-DD format)",
  "items": [
    {
      "description": "string",
      "quantity": number,
      "unit_price": number,
      "amount": number
    }
  ],
  "currency": "string (USD, EUR, INR, etc.)",
  "tax_percentage": number,
  "tax_amount": number,
  "subtotal": number,
  "total_amount": number
}

OCR Text:
${ocrText}

Return ONLY the JSON object, no additional text or explanation.`;
};

module.exports = { createInvoicePrompt };
