# AI Invoice OCR System

A full-stack SaaS application that automatically extracts data from invoices using OCR and AI, converts the data into structured JSON, and integrates with ERP systems.

## Features

- 🤖 AI-powered invoice data extraction
- 📸 Camera scanner with real-time clarity detection
- 📊 Analytics dashboard with charts
- ✅ Duplicate invoice detection
- 🎯 AI confidence scoring
- 📝 Validation panel with status indicators
- 💾 JSON/CSV export functionality
- 🔗 ERP integration (SAP, Zoho, QuickBooks, Tally)
- 🔐 JWT authentication
- 📱 Modern SaaS UI design

## Tech Stack

**Frontend:**
- React.js
- React Router
- Axios
- Vite

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose

**AI/ML:**
- Google Vision API (OCR)
- OpenAI GPT-4o-mini (Data Extraction)

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- Google Cloud account with Vision API enabled
- OpenAI API account

## Installation

### 1. Clone the repository

```bash
cd ai-invoice-ocr-system
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

### 4. Configure Environment Variables

Edit the `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/ai-invoice-ocr
JWT_SECRET=your_secure_jwt_secret
PORT=5000
GOOGLE_APPLICATION_CREDENTIALS=./path/to/google-credentials.json
OPENAI_API_KEY=your_openai_api_key
```

### 5. Google Vision API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Vision API
4. Create a Service Account
5. Download JSON credentials
6. Place the JSON file in your project and update the path in `.env`

### 6. OpenAI API Setup

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Create an account
3. Generate an API key
4. Add the key to `.env`

## Running the Application

### Start MongoDB

```bash
# If using local MongoDB
mongod
```

### Start Backend Server

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

## Usage

1. **Register/Login**: Create an account or login
2. **Upload Invoice**: Drag & drop or browse to upload invoice (PDF/PNG/JPG)
3. **Camera Capture**: Use the camera scanner with auto-capture when clarity > 75%
4. **View Results**: See extracted data, validation status, and confidence scores
5. **Export Data**: Download JSON or CSV
6. **Send to ERP**: Integrate with your ERP system
7. **Analytics**: View processing statistics and supplier spending

## Project Structure

```
ai-invoice-ocr-system/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── utils/           # Helper functions
├── frontend/
│   └── src/
│       ├── components/  # React components
│       ├── pages/       # Page components
│       └── services/    # API services
├── ai-module/           # AI prompt and extraction
├── ocr-module/          # OCR processing
└── uploads/             # Uploaded invoices
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Invoices
- `POST /api/invoices/upload` - Upload and process invoice
- `GET /api/invoices` - Get all invoices
- `GET /api/invoices/:id` - Get invoice by ID
- `GET /api/invoices/analytics` - Get analytics data
- `PUT /api/invoices/:id/erp` - Update ERP status

## Features in Detail

### Clarity Detection
- Real-time image sharpness calculation
- Auto-capture when clarity >= 75%
- Visual feedback with percentage indicator

### Duplicate Detection
- Checks invoice number + supplier combination
- Warns users before saving duplicates
- Displayed in validation panel

### AI Confidence Scores
- Per-field confidence percentage
- Visual progress bars
- Color-coded indicators (green/orange/red)

### Validation Panel
- Missing field detection
- Tax calculation verification
- Currency detection
- Total amount validation
- Status icons (✅ ⚠️ ❌)

## Color Theme

- Deep Navy Blue: `#0F1E3A`
- Soft Gray: `#F5F7FB`
- Accent Blue: `#2D6CDF`
- White: `#FFFFFF`

## License

MIT

## Support

For issues and questions, please create an issue in the repository.
