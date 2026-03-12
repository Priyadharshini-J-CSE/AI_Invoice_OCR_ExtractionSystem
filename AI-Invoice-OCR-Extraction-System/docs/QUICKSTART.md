# Quick Start Guide - AI Invoice OCR System

## Step-by-Step Setup

### 1. Install Dependencies

**Backend:**
```bash
npm install
```

**Frontend:**
```bash
cd frontend
npm install
cd ..
```

### 2. Setup MongoDB

**Option A: Local MongoDB**
- Install MongoDB from https://www.mongodb.com/try/download/community
- Start MongoDB service:
  ```bash
  mongod
  ```

**Option B: MongoDB Atlas (Cloud)**
- Create account at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string
- Update MONGODB_URI in .env

### 3. Setup Google Vision API

1. Go to https://console.cloud.google.com
2. Create new project: "AI-Invoice-OCR"
3. Enable Vision API:
   - Search "Vision API" in search bar
   - Click "Enable"
4. Create Service Account:
   - Go to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Name: "invoice-ocr-service"
   - Grant role: "Cloud Vision API User"
5. Create Key:
   - Click on service account
   - Go to "Keys" tab
   - "Add Key" > "Create new key" > JSON
   - Download JSON file
6. Place JSON file in project root
7. Update .env:
   ```
   GOOGLE_APPLICATION_CREDENTIALS=./your-credentials-file.json
   ```

### 4. Setup OpenAI API

1. Go to https://platform.openai.com
2. Sign up / Login
3. Go to API Keys section
4. Click "Create new secret key"
5. Copy the key
6. Update .env:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```

### 5. Configure Environment Variables

Edit `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/ai-invoice-ocr
JWT_SECRET=your_secure_random_string_here
PORT=5000
GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json
OPENAI_API_KEY=sk-your-openai-key
FRONTEND_URL=http://localhost:5173
```

### 6. Run the Application

**Terminal 1 - Backend:**
```bash
npm run dev
```
Server runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
App runs on: http://localhost:5173

### 7. Test the Application

1. Open browser: http://localhost:5173
2. Click "Register"
3. Fill in details:
   - Name: Test User
   - Email: test@example.com
   - Company: Test Company
   - Password: password123
4. Click "Register"
5. You'll be redirected to Dashboard
6. Click "Upload Invoice" in sidebar
7. Upload a test invoice or use camera

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Try: `mongodb://127.0.0.1:27017/ai-invoice-ocr`

### Google Vision API Error
- Verify credentials file path
- Check if Vision API is enabled
- Ensure service account has correct permissions

### OpenAI API Error
- Verify API key is correct
- Check if you have credits
- Ensure no extra spaces in .env

### Port Already in Use
- Backend: Change PORT in .env
- Frontend: Change port in vite.config.js

### CORS Error
- Ensure backend is running
- Check FRONTEND_URL in .env matches frontend URL

## Default Test Credentials

After registration, you can use:
- Email: Your registered email
- Password: Your registered password

## API Testing with Postman

**Register:**
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "Test User",
  "email": "test@example.com",
  "company": "Test Co",
  "password": "password123"
}
```

**Login:**
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Upload Invoice:**
```
POST http://localhost:5000/api/invoices/upload
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE
Body (form-data):
  invoice: [select file]
```

## Next Steps

1. Upload sample invoices
2. Test camera scanner
3. View analytics dashboard
4. Export JSON/CSV
5. Configure ERP integration

## Support

For issues, check:
- Console logs in browser (F12)
- Backend terminal output
- MongoDB connection
- API credentials

Enjoy using AI Invoice OCR System! 🚀
