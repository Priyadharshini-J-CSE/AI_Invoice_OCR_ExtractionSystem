# 🚀 Quick Start Guide - AI Invoice OCR System

## Running Locally (5 Minutes)

### Step 1: Install Node.js
Download from: https://nodejs.org (v18 or higher)

### Step 2: Install Dependencies
```bash
cd "d:\Semester 4\kalam_hackathon\rukshana_full_code\AI-Invoice-OCR-Extraction-System"
npm install
cd frontend
npm install
cd ..
```

### Step 3: Start Application
**Easy way:** Double-click `start.bat`

**Manual way:**
```bash
# Terminal 1 - Backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Step 4: Access
Open browser: **http://localhost:5173**

---

## Deploying to Render (15 Minutes)

### Prerequisites
- GitHub account
- Render account (render.com - free)
- MongoDB Atlas account (mongodb.com/cloud/atlas - free)

### Quick Steps

1. **Setup MongoDB Atlas**
   - Create free cluster
   - Get connection string
   - Add IP: 0.0.0.0/0

2. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **Deploy Backend on Render**
   - New Web Service
   - Connect GitHub repo
   - Build: `npm install`
   - Start: `npm start`
   - Add environment variables:
     - `MONGODB_URI` = your MongoDB connection string
     - `JWT_SECRET` = random 32 character string
     - `TEST_MODE` = true
     - `NODE_ENV` = production

4. **Deploy Frontend on Render**
   - New Static Site
   - Build: `cd frontend && npm install && npm run build`
   - Publish: `frontend/dist`
   - Add env var:
     - `VITE_API_URL` = your backend URL + /api

5. **Update Backend**
   - Add `FRONTEND_URL` = your frontend URL
   - Redeploy

### Done! 🎉

---

## Important Files Created

✅ `.env` - Environment configuration (already configured for local dev)
✅ `HOW_TO_RUN.md` - Detailed local setup instructions
✅ `RENDER_DEPLOYMENT.md` - Complete Render deployment guide
✅ `DEPLOYMENT_CHECKLIST.md` - Step-by-step deployment checklist
✅ `.gitignore` - Protects sensitive files
✅ `render.yaml` - Render configuration file

---

## Default Configuration

The project is configured with:
- ✅ TEST_MODE enabled (no API keys needed)
- ✅ Mock data for testing
- ✅ Local MongoDB (or use Atlas)
- ✅ CORS enabled
- ✅ JWT authentication

---

## Need Help?

1. **Local Setup**: Read `HOW_TO_RUN.md`
2. **Deployment**: Read `RENDER_DEPLOYMENT.md`
3. **Checklist**: Follow `DEPLOYMENT_CHECKLIST.md`
4. **Troubleshooting**: Check `docs/TROUBLESHOOTING.md`

---

## Project Features

- 🤖 AI-powered invoice extraction
- 📸 Camera scanner with clarity detection
- 📊 Analytics dashboard
- ✅ Duplicate detection
- 🎯 Confidence scoring
- 💾 JSON/CSV export
- 🔗 ERP integration
- 🔐 JWT authentication

---

## Tech Stack

**Frontend:** React + Vite
**Backend:** Node.js + Express
**Database:** MongoDB
**AI:** OpenAI + Google Vision (optional)

---

## URLs After Deployment

- **Frontend**: https://your-app.onrender.com
- **Backend**: https://your-api.onrender.com
- **Health Check**: https://your-api.onrender.com/health

---

**Everything is ready! Start with local development, then deploy when ready.** 🚀
