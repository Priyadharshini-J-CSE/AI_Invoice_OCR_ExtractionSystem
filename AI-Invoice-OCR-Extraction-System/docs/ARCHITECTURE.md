# AI Invoice OCR System - Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Pages   │  │Components│  │ Services │  │  Router  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼ HTTP/REST API
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Express.js)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Routes  │→ │Controller│→ │ Services │→ │  Models  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┼───────────┐
                ▼           ▼           ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ MongoDB  │ │ Google   │ │ OpenAI   │
        │ Database │ │ Vision   │ │   API    │
        └──────────┘ └──────────┘ └──────────┘
```

## Data Flow

### Invoice Upload & Processing

```
1. User uploads invoice (PDF/Image)
   ↓
2. Multer saves file to /uploads/invoices/
   ↓
3. Image preprocessing (Sharp)
   - Convert to grayscale
   - Normalize
   - Sharpen
   ↓
4. OCR Processing (Google Vision API)
   - Extract raw text from image
   ↓
5. AI Processing (OpenAI GPT-4o-mini)
   - Send OCR text with structured prompt
   - Extract invoice fields
   - Return JSON
   ↓
6. Validation Service
   - Check for missing fields
   - Verify calculations
   - Detect duplicates
   - Calculate confidence scores
   ↓
7. Save to MongoDB
   - Store invoice data
   - Store validation results
   ↓
8. Return results to frontend
   - Display invoice preview
   - Show extracted data
   - Display validation status
```

## Component Architecture

### Frontend Components

```
App.jsx
├── Home.jsx (Landing page)
├── Login.jsx (Authentication)
├── Register.jsx (User registration)
└── Dashboard Layout
    ├── Navbar.jsx
    ├── Sidebar.jsx
    └── Pages
        ├── Dashboard.jsx
        │   └── Analytics cards
        ├── UploadPage.jsx
        │   ├── UploadInvoice.jsx
        │   └── CameraScanner.jsx
        ├── ResultsPage.jsx
        │   ├── InvoicePreview.jsx
        │   ├── JsonOutput.jsx
        │   └── ValidationPanel.jsx
        ├── Analytics.jsx
        └── Settings.jsx
```

### Backend Structure

```
server.js (Entry point)
├── config/
│   └── db.js (MongoDB connection)
├── routes/
│   ├── authRoutes.js
│   └── invoiceRoutes.js
├── controllers/
│   ├── authController.js
│   └── invoiceController.js
├── services/
│   ├── ocrService.js
│   ├── aiService.js
│   └── validationService.js
├── models/
│   ├── User.js
│   └── Invoice.js
└── utils/
    ├── fileUpload.js
    └── clarityDetection.js
```

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  company: String,
  password: String (hashed),
  createdAt: Date
}
```

### Invoice Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  fileName: String,
  filePath: String,
  supplierName: String,
  invoiceNumber: String,
  invoiceDate: String,
  items: [{
    description: String,
    quantity: Number,
    unitPrice: Number,
    amount: Number
  }],
  tax: Number,
  currency: String,
  total: Number,
  jsonData: Object,
  confidenceScores: Object,
  validationStatus: String (enum: valid/warning/error),
  validationMessages: [String],
  erpStatus: String (enum: pending/sent/failed),
  isDuplicate: Boolean,
  createdAt: Date
}
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Invoices
- `POST /api/invoices/upload` - Upload & process invoice
- `GET /api/invoices` - Get all user invoices
- `GET /api/invoices/:id` - Get specific invoice
- `GET /api/invoices/analytics` - Get analytics data
- `PUT /api/invoices/:id/erp` - Update ERP status

## Security Features

1. **JWT Authentication**
   - Token-based authentication
   - 7-day expiration
   - Stored in localStorage

2. **Password Security**
   - Bcrypt hashing (10 rounds)
   - Pre-save middleware

3. **File Upload Security**
   - File type validation
   - Size limit (10MB)
   - Unique filename generation

4. **API Security**
   - CORS enabled
   - Environment variables for secrets
   - Authorization middleware

## AI/ML Pipeline

### OCR Module
```
Image → Preprocessing → Google Vision API → Raw Text
```

### AI Extraction Module
```
Raw Text → Prompt Engineering → OpenAI API → Structured JSON
```

### Confidence Scoring
```javascript
{
  supplier_name: 97%,
  invoice_number: 95%,
  invoice_date: 94%,
  items: 92%,
  tax: 93%,
  total_amount: 96%,
  currency: 98%
}
```

## Performance Optimizations

1. **Image Processing**
   - Sharp library for fast processing
   - Grayscale conversion reduces data

2. **Database**
   - Indexed fields (invoiceNumber, supplierName)
   - Lean queries for analytics

3. **Frontend**
   - React lazy loading
   - Vite for fast builds
   - Component memoization

## Scalability Considerations

1. **Horizontal Scaling**
   - Stateless backend
   - JWT tokens (no sessions)
   - MongoDB sharding support

2. **File Storage**
   - Current: Local filesystem
   - Future: AWS S3 / Cloud Storage

3. **Queue System**
   - Current: Synchronous processing
   - Future: Bull/Redis for async jobs

## Monitoring & Logging

- Console logging for development
- Error tracking in controllers
- Request/response logging
- Database connection monitoring

## Future Enhancements

1. Multi-language OCR support
2. Batch invoice processing
3. Real-time ERP integration
4. Email invoice forwarding
5. Mobile app (React Native)
6. Advanced analytics with ML
7. Custom field extraction
8. Invoice approval workflow
