# How to Run This Project Locally

## Quick Start (Windows)

### 1. Install Prerequisites

**Node.js** (v18 or higher):
- Download from: https://nodejs.org
- Install and verify:
  ```bash
  node --version
  npm --version
  ```

**MongoDB** (Optional - can use MongoDB Atlas instead):
- Download from: https://www.mongodb.com/try/download/community
- Install and start MongoDB service

### 2. Install Dependencies

Open Command Prompt or PowerShell in the project folder:

```bash
cd "d:\Semester 4\kalam_hackathon\rukshana_full_code\AI-Invoice-OCR-Extraction-System"

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Configure Environment

The `.env` file is already created with TEST_MODE enabled (no API keys needed).

If you want to use MongoDB Atlas instead of local MongoDB:
1. Create free account at https://mongodb.com/cloud/atlas
2. Get connection string
3. Update `MONGODB_URI` in `.env` file

### 4. Start the Application

**Option A: Using the provided batch files (Easiest)**

Double-click `start.bat` or run:
```bash
start.bat
```

This will start both backend and frontend automatically.

**Option B: Manual start**

Open TWO separate terminal windows:

**Terminal 1 - Backend:**
```bash
npm start
```
Backend runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:5173

### 5. Access the Application

Open your browser and go to: **http://localhost:5173**

### 6. Test the Application

1. Click "Register" to create an account
2. Login with your credentials
3. Upload a test invoice (any image/PDF)
4. See the extracted data (mock data in TEST_MODE)

---

## Project Structure

```
AI-Invoice-OCR-Extraction-System/
├── backend/              # Node.js/Express backend
│   ├── server.js        # Main server file
│   ├── routes/          # API routes
│   ├── controllers/     # Business logic
│   └── models/          # Database models
├── frontend/            # React frontend
│   └── src/
│       ├── components/  # React components
│       ├── pages/       # Page components
│       └── services/    # API calls
├── .env                 # Environment variables
└── package.json         # Backend dependencies
```

---

## Available Scripts

### Backend
- `npm start` - Start backend server
- `npm run dev` - Start with nodemon (auto-restart)

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

## Troubleshooting

### Port already in use
If port 5000 or 5173 is already in use:
- Change `PORT` in `.env` file
- Or kill the process using the port

### MongoDB connection error
- Make sure MongoDB is running (if using local)
- Or use MongoDB Atlas connection string
- Verify `MONGODB_URI` in `.env`

### Module not found errors
```bash
# Reinstall dependencies
npm install
cd frontend && npm install
```

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check browser console for errors
- Verify CORS is enabled in backend

---

## Using Real APIs (Optional)

By default, TEST_MODE is enabled (uses mock data). To use real APIs:

1. Get OpenAI API key from https://platform.openai.com
2. Get Google Vision credentials from https://console.cloud.google.com
3. Update `.env`:
   ```
   TEST_MODE=false
   OPENAI_API_KEY=your_actual_key
   GOOGLE_APPLICATION_CREDENTIALS=./path/to/credentials.json
   ```

---

## Next Steps

- See `RENDER_DEPLOYMENT.md` for deploying to production
- See `docs/` folder for detailed documentation
- See `README.md` for feature overview

---

## Support

If you encounter issues:
1. Check the console/terminal for error messages
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check `.env` configuration
5. Review `docs/TROUBLESHOOTING.md`
