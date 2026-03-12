# Sample Test Data - AI Invoice OCR System

## Test User Credentials

### User 1
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corporation",
  "password": "password123"
}
```

### User 2
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "company": "Tech Solutions Inc",
  "password": "password123"
}
```

---

## Sample Invoice Data (Expected Output)

### Invoice 1 - Standard Invoice
```json
{
  "supplier_name": "ABC Suppliers Ltd.",
  "invoice_number": "INV-2024-001",
  "invoice_date": "2024-01-15",
  "items": [
    {
      "description": "Laptop Computer - Dell XPS 15",
      "quantity": 2,
      "unit_price": 1200.00,
      "amount": 2400.00
    },
    {
      "description": "Wireless Mouse - Logitech MX Master",
      "quantity": 5,
      "unit_price": 80.00,
      "amount": 400.00
    },
    {
      "description": "USB-C Hub - Anker 7-in-1",
      "quantity": 3,
      "unit_price": 50.00,
      "amount": 150.00
    }
  ],
  "currency": "USD",
  "tax_percentage": 18,
  "tax_amount": 531.00,
  "subtotal": 2950.00,
  "total_amount": 3481.00
}
```

### Invoice 2 - Service Invoice
```json
{
  "supplier_name": "CloudTech Services",
  "invoice_number": "SRV-2024-045",
  "invoice_date": "2024-01-20",
  "items": [
    {
      "description": "Cloud Hosting - Monthly Subscription",
      "quantity": 1,
      "unit_price": 299.00,
      "amount": 299.00
    },
    {
      "description": "SSL Certificate - Annual",
      "quantity": 1,
      "unit_price": 89.00,
      "amount": 89.00
    },
    {
      "description": "Technical Support - 10 hours",
      "quantity": 10,
      "unit_price": 75.00,
      "amount": 750.00
    }
  ],
  "currency": "USD",
  "tax_percentage": 10,
  "tax_amount": 113.80,
  "subtotal": 1138.00,
  "total_amount": 1251.80
}
```

### Invoice 3 - International Invoice
```json
{
  "supplier_name": "Global Trading Co.",
  "invoice_number": "GT-2024-789",
  "invoice_date": "2024-01-18",
  "items": [
    {
      "description": "Office Furniture Set",
      "quantity": 1,
      "unit_price": 2500.00,
      "amount": 2500.00
    },
    {
      "description": "Ergonomic Chairs",
      "quantity": 10,
      "unit_price": 350.00,
      "amount": 3500.00
    }
  ],
  "currency": "EUR",
  "tax_percentage": 20,
  "tax_amount": 1200.00,
  "subtotal": 6000.00,
  "total_amount": 7200.00
}
```

### Invoice 4 - Simple Invoice
```json
{
  "supplier_name": "Office Supplies Plus",
  "invoice_number": "OSP-2024-123",
  "invoice_date": "2024-01-22",
  "items": [
    {
      "description": "A4 Paper - 10 Reams",
      "quantity": 10,
      "unit_price": 25.00,
      "amount": 250.00
    },
    {
      "description": "Printer Ink Cartridges",
      "quantity": 4,
      "unit_price": 45.00,
      "amount": 180.00
    },
    {
      "description": "Stapler and Staples Set",
      "quantity": 5,
      "unit_price": 15.00,
      "amount": 75.00
    }
  ],
  "currency": "USD",
  "tax_percentage": 8,
  "tax_amount": 40.40,
  "subtotal": 505.00,
  "total_amount": 545.40
}
```

---

## Test Scenarios

### Scenario 1: Valid Invoice
- Upload a clear invoice image
- Expected: All fields extracted correctly
- Validation Status: Valid ✅
- Confidence Scores: 90%+

### Scenario 2: Duplicate Invoice
1. Upload invoice with number "INV-2024-001" from "ABC Suppliers"
2. Upload same invoice again
- Expected: Duplicate warning ⚠️
- Validation Message: "Duplicate invoice detected"

### Scenario 3: Missing Fields
- Upload invoice with missing supplier name
- Expected: Validation error ❌
- Validation Message: "Missing supplier name"

### Scenario 4: Tax Mismatch
- Upload invoice where items + tax ≠ total
- Expected: Validation warning ⚠️
- Validation Message: "Total amount mismatch detected"

### Scenario 5: Camera Capture
1. Click "Capture Invoice"
2. Point camera at invoice
3. Wait for clarity > 75%
- Expected: Auto-capture
- Image quality: Good

### Scenario 6: Low Quality Image
- Upload blurry/low-resolution image
- Expected: Lower confidence scores (60-80%)
- Possible validation warnings

---

## API Testing Data

### Register Request
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "password": "password123"
  }'
```

### Login Request
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Upload Invoice Request
```bash
curl -X POST http://localhost:5000/api/invoices/upload \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "invoice=@/path/to/invoice.pdf"
```

---

## Expected Confidence Scores

| Field | Expected Score | Status |
|-------|---------------|--------|
| Supplier Name | 95-98% | Excellent |
| Invoice Number | 93-96% | Excellent |
| Invoice Date | 92-95% | Excellent |
| Items | 90-93% | Good |
| Tax | 91-94% | Excellent |
| Total Amount | 94-97% | Excellent |
| Currency | 96-99% | Excellent |

---

## Test Checklist

### Authentication
- [ ] Register new user
- [ ] Login with credentials
- [ ] Access protected routes
- [ ] Logout successfully

### Upload
- [ ] Drag and drop file
- [ ] Browse and select file
- [ ] Upload PDF
- [ ] Upload PNG/JPG
- [ ] Reject invalid file types
- [ ] Reject oversized files

### Camera
- [ ] Open camera scanner
- [ ] See clarity percentage
- [ ] Auto-capture at 75%+
- [ ] Retake photo
- [ ] Use captured photo

### Processing
- [ ] OCR extracts text
- [ ] AI extracts fields
- [ ] Validation runs
- [ ] Confidence scores calculated
- [ ] Data saved to database

### Results
- [ ] View invoice preview
- [ ] See extracted fields
- [ ] Check validation status
- [ ] View confidence scores
- [ ] Copy JSON
- [ ] Download JSON
- [ ] Export CSV

### ERP
- [ ] Select ERP system
- [ ] Send to ERP
- [ ] Status updates

### Dashboard
- [ ] View analytics cards
- [ ] See recent invoices
- [ ] Navigate to pages

### Analytics
- [ ] View monthly chart
- [ ] See supplier spending
- [ ] Data updates

---

## Performance Benchmarks

| Operation | Expected Time |
|-----------|--------------|
| User Registration | < 1 second |
| User Login | < 1 second |
| File Upload | < 2 seconds |
| OCR Processing | 3-5 seconds |
| AI Extraction | 5-8 seconds |
| Total Processing | 8-15 seconds |
| Dashboard Load | < 1 second |
| Analytics Load | < 2 seconds |

---

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+
- ⚠️ IE 11 (Not supported)

---

## Mobile Testing

### Responsive Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

### Features on Mobile
- ✅ Authentication
- ✅ File upload
- ✅ Camera scanner (native)
- ✅ View results
- ✅ Dashboard
- ⚠️ Analytics (limited)

---

## Error Messages to Test

1. "No file uploaded"
2. "Invalid credentials"
3. "User already exists"
4. "Invalid token"
5. "Invoice not found"
6. "Failed to extract text from image"
7. "Failed to extract invoice data using AI"
8. "Duplicate invoice detected"
9. "Missing supplier name"
10. "Total amount mismatch detected"

---

## Success Messages to Test

1. "Invoice processed successfully"
2. "Registration successful"
3. "Login successful"
4. "JSON copied to clipboard!"
5. "Invoice sent to [ERP] successfully!"

---

Use this test data to thoroughly test all features of the application!
