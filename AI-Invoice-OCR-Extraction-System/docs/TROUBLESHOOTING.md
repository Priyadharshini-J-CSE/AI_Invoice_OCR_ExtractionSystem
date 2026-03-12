# Troubleshooting Guide - AI Invoice OCR System

## Common Issues and Solutions

### 1. Installation Issues

#### Problem: npm install fails
**Error:** `npm ERR! code ENOENT`

**Solution:**
```bash
# Ensure Node.js is installed
node --version
npm --version

# Clear npm cache
npm cache clean --force

# Try installing again
npm install
```

#### Problem: Frontend dependencies fail
**Error:** `Cannot find module 'vite'`

**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
cd ..
```

---

### 2. MongoDB Connection Issues

#### Problem: Cannot connect to MongoDB
**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution 1 - Local MongoDB:**
```bash
# Start MongoDB service
mongod

# Or on Windows (as Administrator):
net start MongoDB
```

**Solution 2 - Check Connection String:**
```env
# In .env file, try:
MONGODB_URI=mongodb://127.0.0.1:27017/ai-invoice-ocr
# Instead of:
MONGODB_URI=mongodb://localhost:27017/ai-invoice-ocr
```

**Solution 3 - MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-invoice-ocr?retryWrites=true&w=majority
```

#### Problem: Database authentication failed
**Error:** `Authentication failed`

**Solution:**
```bash
# Create MongoDB user
mongo
use ai-invoice-ocr
db.createUser({
  user: "admin",
  pwd: "password",
  roles: ["readWrite"]
})

# Update .env
MONGODB_URI=mongodb://admin:password@localhost:27017/ai-invoice-ocr
```

---

### 3. Google Vision API Issues

#### Problem: Vision API not working
**Error:** `Could not load the default credentials`

**Solution 1 - Check Credentials Path:**
```env
# Use absolute path in .env
GOOGLE_APPLICATION_CREDENTIALS=C:/Users/YourName/project/google-credentials.json

# Or relative path
GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json
```

**Solution 2 - Verify JSON File:**
- Ensure the JSON file is valid
- Check file permissions
- Verify service account has Vision API access

**Solution 3 - Enable API:**
1. Go to Google Cloud Console
2. Select your project
3. Navigate to "APIs & Services" > "Library"
4. Search "Cloud Vision API"
5. Click "Enable"

#### Problem: API quota exceeded
**Error:** `Quota exceeded for quota metric`

**Solution:**
- Check your Google Cloud billing
- Request quota increase
- Use a different project
- Wait for quota reset (daily)

---

### 4. OpenAI API Issues

#### Problem: OpenAI API key invalid
**Error:** `Incorrect API key provided`

**Solution:**
```env
# Verify API key in .env (no quotes, no spaces)
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx

# Get new key from:
# https://platform.openai.com/api-keys
```

#### Problem: Rate limit exceeded
**Error:** `Rate limit reached`

**Solution:**
- Wait a few minutes
- Upgrade OpenAI plan
- Implement request queuing
- Add retry logic with exponential backoff

#### Problem: Insufficient credits
**Error:** `You exceeded your current quota`

**Solution:**
- Add payment method to OpenAI account
- Purchase credits
- Check billing settings

---

### 5. File Upload Issues

#### Problem: File upload fails
**Error:** `No file uploaded`

**Solution 1 - Check File Size:**
```javascript
// Max size is 10MB
// Compress large files before uploading
```

**Solution 2 - Check File Type:**
```javascript
// Supported: PDF, PNG, JPG, JPEG
// Convert other formats
```

**Solution 3 - Check Uploads Directory:**
```bash
# Ensure directory exists
mkdir uploads
mkdir uploads\invoices
```

#### Problem: Multer error
**Error:** `Unexpected field`

**Solution:**
```javascript
// Ensure form field name is 'invoice'
formData.append('invoice', file);
```

---

### 6. CORS Issues

#### Problem: CORS error in browser
**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution 1 - Check Backend CORS:**
```javascript
// In server.js
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

**Solution 2 - Check Frontend URL:**
```javascript
// In api.js
const API_URL = 'http://localhost:5000/api';
// Ensure port matches backend
```

**Solution 3 - Disable Browser Security (Development Only):**
```bash
# Chrome
chrome.exe --disable-web-security --user-data-dir="C:/temp/chrome"
```

---

### 7. Authentication Issues

#### Problem: Token not working
**Error:** `Invalid token`

**Solution 1 - Check Token Storage:**
```javascript
// Verify token is saved
console.log(localStorage.getItem('token'));
```

**Solution 2 - Check JWT Secret:**
```env
# Ensure JWT_SECRET is set in .env
JWT_SECRET=your_secret_key_here
```

**Solution 3 - Clear and Re-login:**
```javascript
localStorage.clear();
// Login again
```

#### Problem: Token expired
**Error:** `jwt expired`

**Solution:**
```javascript
// Logout and login again
// Or implement token refresh logic
```

---

### 8. Camera Scanner Issues

#### Problem: Camera not accessible
**Error:** `Permission denied`

**Solution:**
- Allow camera permissions in browser
- Check browser settings
- Use HTTPS (required for camera on some browsers)
- Try different browser

#### Problem: Clarity detection not working
**Solution:**
```javascript
// Ensure good lighting
// Hold camera steady
// Focus on document
// Clean camera lens
```

---

### 9. Image Processing Issues

#### Problem: Sharp module error
**Error:** `Cannot find module 'sharp'`

**Solution:**
```bash
# Reinstall sharp
npm uninstall sharp
npm install sharp

# Or install with specific version
npm install sharp@0.33.1
```

#### Problem: Image preprocessing fails
**Solution:**
- Check image format
- Verify file is not corrupted
- Ensure sufficient memory
- Try smaller image size

---

### 10. Port Already in Use

#### Problem: Backend port 5000 in use
**Error:** `EADDRINUSE: address already in use :::5000`

**Solution 1 - Kill Process:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in .env
PORT=5001
```

#### Problem: Frontend port 5173 in use
**Solution:**
```javascript
// In vite.config.js
export default defineConfig({
  server: {
    port: 5174
  }
})
```

---

### 11. React/Vite Issues

#### Problem: Vite not starting
**Error:** `Failed to resolve entry`

**Solution:**
```bash
cd frontend
rm -rf node_modules .vite
npm install
npm run dev
```

#### Problem: Module not found
**Error:** `Cannot find module './components/Navbar'`

**Solution:**
- Check file path and case sensitivity
- Verify file exists
- Check import statement
- Restart dev server

---

### 12. Data Extraction Issues

#### Problem: No data extracted
**Solution:**
- Check OCR text output
- Verify OpenAI API is working
- Check prompt engineering
- Ensure invoice has clear text

#### Problem: Incorrect data extracted
**Solution:**
- Improve image quality
- Use better lighting
- Ensure invoice is not skewed
- Try different invoice format

#### Problem: JSON parsing error
**Error:** `Unexpected token in JSON`

**Solution:**
```javascript
// Check AI response format
// Ensure OpenAI returns valid JSON
// Add error handling in jsonExtractor.js
```

---

### 13. Validation Issues

#### Problem: False duplicate detection
**Solution:**
- Check invoice number format
- Verify supplier name matching
- Clear test data from database

#### Problem: Validation always fails
**Solution:**
- Check validation logic
- Verify field names match
- Test with known good invoice

---

### 14. Performance Issues

#### Problem: Slow processing
**Solution:**
- Optimize image size before upload
- Check internet connection
- Verify API response times
- Use image compression

#### Problem: High memory usage
**Solution:**
- Limit concurrent uploads
- Clear processed images
- Restart server periodically

---

### 15. Database Issues

#### Problem: Data not saving
**Solution:**
```javascript
// Check MongoDB connection
// Verify schema matches data
// Check for validation errors
// Look at server logs
```

#### Problem: Cannot query data
**Solution:**
```javascript
// Verify user authentication
// Check userId in queries
// Ensure indexes are created
```

---

## Debugging Tips

### Enable Debug Logging

**Backend:**
```javascript
// Add to server.js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

**Frontend:**
```javascript
// Add to api.js
axios.interceptors.request.use(request => {
  console.log('Request:', request);
  return request;
});
```

### Check Server Logs
```bash
# Backend terminal shows:
# - API requests
# - Database queries
# - Error messages
# - Processing status
```

### Check Browser Console
```javascript
// Press F12 in browser
// Check Console tab for errors
// Check Network tab for API calls
```

### Test API with Postman
```bash
# Import collection from docs/API_TESTING.md
# Test each endpoint individually
# Verify responses
```

---

## Environment Variables Checklist

```env
✅ MONGODB_URI - Valid connection string
✅ JWT_SECRET - Random secure string
✅ PORT - Available port (default 5000)
✅ GOOGLE_APPLICATION_CREDENTIALS - Valid path to JSON
✅ OPENAI_API_KEY - Valid API key starting with sk-
✅ FRONTEND_URL - Correct frontend URL
```

---

## Quick Fixes

### Reset Everything
```bash
# Stop all servers
# Clear node_modules
rm -rf node_modules frontend/node_modules

# Clear database
mongo
use ai-invoice-ocr
db.dropDatabase()

# Reinstall
npm install
cd frontend && npm install && cd ..

# Restart
npm run dev
cd frontend && npm run dev
```

### Clear Browser Data
```javascript
// Open browser console
localStorage.clear();
sessionStorage.clear();
// Refresh page
```

### Restart Services
```bash
# Restart MongoDB
net stop MongoDB
net start MongoDB

# Restart backend
# Ctrl+C in terminal
npm run dev

# Restart frontend
# Ctrl+C in terminal
cd frontend && npm run dev
```

---

## Getting Help

### Check Logs
1. Backend terminal output
2. Frontend terminal output
3. Browser console (F12)
4. MongoDB logs

### Verify Setup
1. Node.js version: `node --version` (v18+)
2. MongoDB running: `mongo --version`
3. API keys valid
4. All dependencies installed

### Common Commands
```bash
# Check running processes
netstat -ano | findstr :5000
netstat -ano | findstr :5173

# Check MongoDB
mongo
show dbs
use ai-invoice-ocr
db.users.find()
db.invoices.find()

# Check Node modules
npm list
cd frontend && npm list
```

---

## Still Having Issues?

1. Check all environment variables
2. Verify API credentials
3. Review error messages carefully
4. Check documentation in docs/
5. Test with sample invoice
6. Try different browser
7. Restart computer
8. Reinstall dependencies

---

**Remember:** Most issues are related to:
- Missing environment variables
- Invalid API credentials
- MongoDB not running
- Port conflicts
- File permissions

Check these first! 🔍
