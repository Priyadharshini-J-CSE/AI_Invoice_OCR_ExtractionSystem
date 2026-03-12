# Deployment Checklist for Render

## Pre-Deployment Checklist

### Local Testing
- [ ] Backend runs successfully (`npm start`)
- [ ] Frontend runs successfully (`cd frontend && npm run dev`)
- [ ] Can register new user
- [ ] Can login
- [ ] Can upload invoice
- [ ] Data extraction works (TEST_MODE)
- [ ] All pages load without errors

### Code Preparation
- [ ] All dependencies listed in `package.json`
- [ ] `.env.example` file created
- [ ] `.gitignore` includes `.env` and sensitive files
- [ ] Frontend API URL uses environment variable
- [ ] CORS configured in backend
- [ ] No hardcoded secrets in code

### Git Repository
- [ ] Code pushed to GitHub
- [ ] Repository is public or Render has access
- [ ] All necessary files committed
- [ ] `.env` file NOT committed (check .gitignore)

---

## MongoDB Atlas Setup

- [ ] Account created at mongodb.com/cloud/atlas
- [ ] Free M0 cluster created
- [ ] Database user created with password
- [ ] Network access set to 0.0.0.0/0 (allow all)
- [ ] Connection string copied
- [ ] Connection string tested locally

---

## Render Backend Deployment

### Service Configuration
- [ ] New Web Service created
- [ ] GitHub repository connected
- [ ] Branch selected (main/master)
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Instance type: Free

### Environment Variables Set
- [ ] `NODE_ENV` = production
- [ ] `PORT` = 5000
- [ ] `TEST_MODE` = true
- [ ] `MONGODB_URI` = (your MongoDB Atlas connection string)
- [ ] `JWT_SECRET` = (32+ character random string)
- [ ] `FRONTEND_URL` = (will add after frontend deployment)

### Deployment Status
- [ ] Build completed successfully
- [ ] Service is running (green status)
- [ ] Backend URL copied: `https://______.onrender.com`
- [ ] Health check works: `https://______.onrender.com/health`

---

## Render Frontend Deployment

### Option A: Render Static Site
- [ ] New Static Site created
- [ ] Same GitHub repository connected
- [ ] Build command: `cd frontend && npm install && npm run build`
- [ ] Publish directory: `frontend/dist`
- [ ] Environment variable `VITE_API_URL` set to backend URL + `/api`
- [ ] Deployment successful
- [ ] Frontend URL copied

### Option B: Netlify (Alternative)
- [ ] Account created at netlify.com
- [ ] New site from Git
- [ ] Base directory: `frontend`
- [ ] Build command: `npm run build`
- [ ] Publish directory: `frontend/dist`
- [ ] Environment variable `VITE_API_URL` set
- [ ] Deployment successful
- [ ] Frontend URL copied

---

## Post-Deployment Configuration

### Update Backend CORS
- [ ] Go to Render backend service
- [ ] Update `FRONTEND_URL` environment variable with actual frontend URL
- [ ] Redeploy backend (or it auto-deploys)

### Verify Integration
- [ ] Frontend loads without errors
- [ ] Can access backend API from frontend
- [ ] No CORS errors in browser console

---

## Testing Production Deployment

### User Authentication
- [ ] Can access registration page
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] JWT token stored in localStorage
- [ ] Can logout

### Invoice Processing
- [ ] Can access upload page
- [ ] Can upload image file
- [ ] Can upload PDF file
- [ ] Processing completes successfully
- [ ] Extracted data displays correctly
- [ ] Mock data appears (TEST_MODE)

### Dashboard & Analytics
- [ ] Dashboard loads
- [ ] Invoice list displays
- [ ] Analytics page works
- [ ] Charts render correctly
- [ ] Export functions work

### Performance
- [ ] Initial load time acceptable
- [ ] No console errors
- [ ] Images load properly
- [ ] API responses are reasonable

---

## Optional: Enable Real APIs

### OpenAI Setup
- [ ] Account created at platform.openai.com
- [ ] API key generated
- [ ] Billing configured (if needed)
- [ ] Added to Render environment variables
- [ ] `TEST_MODE` set to false
- [ ] Tested with real invoice

### Google Vision Setup
- [ ] Google Cloud project created
- [ ] Vision API enabled
- [ ] Service account created
- [ ] JSON credentials downloaded
- [ ] Credentials added to Render (as base64 or secret file)
- [ ] Tested OCR functionality

---

## Monitoring & Maintenance

### Setup Monitoring
- [ ] Render dashboard bookmarked
- [ ] MongoDB Atlas dashboard bookmarked
- [ ] Health check endpoint tested
- [ ] Error logging reviewed

### Documentation
- [ ] Deployment URLs documented
- [ ] Environment variables documented
- [ ] Access credentials stored securely
- [ ] Team members have access

### Backup Plan
- [ ] Database backup strategy defined
- [ ] Code repository backed up
- [ ] Environment variables backed up
- [ ] Rollback plan documented

---

## Common Issues & Solutions

### Backend won't start
- Check Render logs for errors
- Verify MongoDB connection string
- Ensure all environment variables are set
- Check Node.js version compatibility

### Frontend can't connect to backend
- Verify VITE_API_URL is correct
- Check CORS configuration
- Ensure backend is running
- Check browser console for errors

### Database connection failed
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has correct permissions
- Test connection string locally first

### Slow initial load (Free tier)
- Expected behavior - free tier spins down after 15 min
- First request takes 30-60 seconds
- Consider upgrading to paid tier for production

---

## Success Criteria

✅ Backend deployed and accessible
✅ Frontend deployed and accessible
✅ Database connected and working
✅ User can register and login
✅ Invoice upload and processing works
✅ All pages load without errors
✅ No console errors
✅ Mobile responsive
✅ HTTPS enabled (automatic on Render)

---

## Next Steps After Deployment

1. Share URLs with team/users
2. Monitor usage and performance
3. Set up custom domain (optional)
4. Enable real APIs when ready
5. Plan for scaling if needed
6. Regular maintenance and updates

---

## Support Resources

- Render Docs: https://render.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Project Documentation: See `docs/` folder
- Troubleshooting: See `docs/TROUBLESHOOTING.md`

---

**Deployment Complete! 🎉**

Your AI Invoice OCR System is now live and accessible to users worldwide!
