# Deploy to Render - Step by Step Guide

## Prerequisites
- GitHub account
- Render account (free tier available at render.com)
- MongoDB Atlas account (free tier at mongodb.com/cloud/atlas)

---

## Step 1: Setup MongoDB Atlas (Free Database)

1. Go to https://mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new cluster (M0 Free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/ai-invoice-ocr?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password
7. Under "Network Access", add IP: `0.0.0.0/0` (allow from anywhere)

---

## Step 2: Push Code to GitHub

```bash
cd "d:\Semester 4\kalam_hackathon\rukshana_full_code\AI-Invoice-OCR-Extraction-System"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit for Render deployment"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy Backend to Render

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `ai-invoice-ocr-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. Add Environment Variables (click "Advanced" → "Add Environment Variable"):
   ```
   NODE_ENV = production
   PORT = 5000
   TEST_MODE = true
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/ai-invoice-ocr
   JWT_SECRET = generate_random_32_character_string_here
   FRONTEND_URL = https://your-frontend-url.onrender.com
   ```

   To generate JWT_SECRET, use:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL: `https://ai-invoice-ocr-backend.onrender.com`

---

## Step 4: Deploy Frontend to Render

### Option A: Static Site on Render

1. Click "New +" → "Static Site"
2. Connect same GitHub repository
3. Configure:
   - **Name**: `ai-invoice-ocr-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`

4. Add Environment Variable:
   ```
   VITE_API_URL = https://ai-invoice-ocr-backend.onrender.com/api
   ```

5. Click "Create Static Site"

### Option B: Deploy Frontend to Netlify (Recommended)

1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. Add Environment Variable:
   ```
   VITE_API_URL = https://ai-invoice-ocr-backend.onrender.com/api
   ```
6. Deploy

---

## Step 5: Update Frontend API URL

Update `frontend/src/services/api.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

Then commit and push:
```bash
git add .
git commit -m "Update API URL for production"
git push
```

Render will auto-deploy the changes.

---

## Step 6: Update Backend CORS

The backend already has CORS enabled, but verify in `backend/server.js`:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
```

---

## Step 7: Test Your Deployment

1. Visit your frontend URL
2. Register a new account
3. Login
4. Upload a test invoice
5. Check if data extraction works (TEST_MODE should use mock data)

---

## Important Notes

### Free Tier Limitations
- Render free tier spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free (enough for 1 service running 24/7)

### Using Real APIs (Optional)

If you want to use real OpenAI and Google Vision APIs:

1. Get OpenAI API key from https://platform.openai.com
2. Get Google Vision credentials from https://console.cloud.google.com
3. Update environment variables in Render:
   ```
   TEST_MODE = false
   OPENAI_API_KEY = your_actual_openai_key
   ```
4. For Google credentials, convert JSON to base64 and store as env var

---

## Troubleshooting

### Backend not starting
- Check Render logs: Dashboard → Your Service → Logs
- Verify all environment variables are set
- Check MongoDB connection string

### Frontend can't connect to backend
- Verify CORS settings
- Check API_URL in frontend
- Ensure backend is running (check Render dashboard)

### Database connection failed
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check connection string format
- Ensure password doesn't contain special characters (or URL encode them)

---

## Monitoring

- **Render Dashboard**: View logs, metrics, and deployment status
- **MongoDB Atlas**: Monitor database usage and performance
- **Health Check**: Visit `https://your-backend-url.onrender.com/health`

---

## Costs

- **Render Free Tier**: $0/month (with limitations)
- **MongoDB Atlas Free**: $0/month (512MB storage)
- **Total**: $0/month for testing/development

For production with better performance:
- Render Starter: $7/month
- MongoDB Atlas M10: $57/month

---

## Next Steps

1. ✅ Backend deployed on Render
2. ✅ Frontend deployed on Render/Netlify
3. ✅ MongoDB Atlas configured
4. ✅ Environment variables set
5. ✅ Test all features

Your app is now live! 🚀
