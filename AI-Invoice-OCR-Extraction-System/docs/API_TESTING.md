# API Testing Guide

## Postman Collection

### 1. Register User

**Endpoint:** `POST http://localhost:5000/api/auth/register`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Corp"
  }
}
```

---

### 2. Login User

**Endpoint:** `POST http://localhost:5000/api/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Corp"
  }
}
```

---

### 3. Upload Invoice

**Endpoint:** `POST http://localhost:5000/api/invoices/upload`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Body (form-data):**
```
invoice: [Select File - PDF/PNG/JPG]
```

**Response:**
```json
{
  "message": "Invoice processed successfully",
  "invoice": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "userId": "65a1b2c3d4e5f6g7h8i9j0k1",
    "fileName": "invoice.pdf",
    "supplierName": "ABC Suppliers",
    "invoiceNumber": "INV-2024-001",
    "invoiceDate": "2024-01-15",
    "items": [
      {
        "description": "Product A",
        "quantity": 10,
        "unit_price": 50,
        "amount": 500
      }
    ],
    "tax": 18,
    "currency": "USD",
    "total": 590,
    "jsonData": {...},
    "confidenceScores": {
      "supplier_name": 97,
      "invoice_number": 95,
      "items": 92
    },
    "validationStatus": "valid",
    "validationMessages": [],
    "isDuplicate": false,
    "createdAt": "2024-01-20T10:30:00.000Z"
  },
  "clarity": 85
}
```

---

### 4. Get All Invoices

**Endpoint:** `GET http://localhost:5000/api/invoices`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response:**
```json
[
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "fileName": "invoice.pdf",
    "supplierName": "ABC Suppliers",
    "invoiceNumber": "INV-2024-001",
    "total": 590,
    "validationStatus": "valid",
    "createdAt": "2024-01-20T10:30:00.000Z"
  }
]
```

---

### 5. Get Invoice by ID

**Endpoint:** `GET http://localhost:5000/api/invoices/:id`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Example:** `GET http://localhost:5000/api/invoices/65a1b2c3d4e5f6g7h8i9j0k2`

**Response:**
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
  "userId": "65a1b2c3d4e5f6g7h8i9j0k1",
  "fileName": "invoice.pdf",
  "filePath": "uploads/invoices/1234567890-invoice.pdf",
  "supplierName": "ABC Suppliers",
  "invoiceNumber": "INV-2024-001",
  "invoiceDate": "2024-01-15",
  "items": [...],
  "tax": 18,
  "currency": "USD",
  "total": 590,
  "jsonData": {...},
  "confidenceScores": {...},
  "validationStatus": "valid",
  "validationMessages": [],
  "erpStatus": "pending",
  "isDuplicate": false,
  "createdAt": "2024-01-20T10:30:00.000Z"
}
```

---

### 6. Get Analytics

**Endpoint:** `GET http://localhost:5000/api/invoices/analytics`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response:**
```json
{
  "totalInvoices": 25,
  "invoicesToday": 3,
  "avgConfidence": 94,
  "erpConnections": 0,
  "monthlyData": {
    "Jan": 10,
    "Feb": 15
  },
  "supplierSpending": {
    "ABC Suppliers": 5000,
    "XYZ Corp": 3500
  }
}
```

---

### 7. Update ERP Status

**Endpoint:** `PUT http://localhost:5000/api/invoices/:id/erp`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "erpSystem": "SAP"
}
```

**Response:**
```json
{
  "message": "Invoice sent to SAP",
  "invoice": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "erpStatus": "sent",
    ...
  }
}
```

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"company\":\"Acme Corp\",\"password\":\"password123\"}"
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"john@example.com\",\"password\":\"password123\"}"
```

### Upload Invoice
```bash
curl -X POST http://localhost:5000/api/invoices/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "invoice=@/path/to/invoice.pdf"
```

### Get Invoices
```bash
curl -X GET http://localhost:5000/api/invoices \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "No file uploaded"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid token"
}
```

### 404 Not Found
```json
{
  "message": "Invoice not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Invoice processing failed",
  "error": "Error details here"
}
```

---

## Sample Invoice JSON Output

```json
{
  "supplier_name": "ABC Suppliers Ltd.",
  "invoice_number": "INV-2024-001",
  "invoice_date": "2024-01-15",
  "items": [
    {
      "description": "Product A - Premium Quality",
      "quantity": 10,
      "unit_price": 50.00,
      "amount": 500.00
    },
    {
      "description": "Product B - Standard",
      "quantity": 5,
      "unit_price": 30.00,
      "amount": 150.00
    }
  ],
  "currency": "USD",
  "tax_percentage": 18,
  "tax_amount": 117.00,
  "subtotal": 650.00,
  "total_amount": 767.00
}
```
