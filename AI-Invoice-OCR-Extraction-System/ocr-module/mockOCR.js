// Mock OCR service for testing without Google Vision API
// This returns sample invoice text for testing

const extractTextFromImage = async (imagePath) => {
  console.log('Using MOCK OCR (Google Vision API not configured)');
  console.log('Processing image:', imagePath);
  
  // Return sample invoice text
  const mockInvoiceText = `
INVOICE

ABC Suppliers Ltd.
123 Business Street
New York, NY 10001

Invoice Number: INV-2024-001
Invoice Date: 2024-01-15

Bill To:
Customer Name
456 Customer Ave
Los Angeles, CA 90001

ITEMS:
Description                 Qty    Unit Price    Amount
Laptop Computer Dell XPS    2      $1,200.00     $2,400.00
Wireless Mouse Logitech     5      $80.00        $400.00
USB-C Hub Anker            3      $50.00        $150.00

                           Subtotal:    $2,950.00
                           Tax (18%):   $531.00
                           TOTAL:       $3,481.00

Payment Terms: Net 30
Due Date: 2024-02-15

Thank you for your business!
  `;
  
  return mockInvoiceText.trim();
};

module.exports = { extractTextFromImage };
