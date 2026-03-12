# Deployment Guide - AI Invoice OCR System

## Production Deployment

### Prerequisites
- Node.js v18+ installed
- MongoDB (Atlas or self-hosted)
- Domain name (optional)
- SSL certificate (for HTTPS)
- Cloud hosting account (AWS, Azure, GCP, Heroku, etc.)

---

## Option 1: Deploy to Heroku

### Backend Deployment

1. **Install Heroku CLI**
```bash
# Download from: https://devcenter.heroku.com/articles/heroku-cli
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku App**
```bash
heroku create ai-invoice-ocr-backend
```

4. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI="your_mongodb_atlas_uri"
heroku config:set JWT_SECRET="your_jwt_secret"
heroku config:set OPENAI_API_KEY="your_openai_key"
heroku config:set GOOGLE_APPLICATION_CREDENTIALS="./google-credentials.json"
```

5. **Add Google Credentials**
```bash
# Create config var with JSON content
heroku config:set GOOGLE_CREDENTIALS="$(cat google-credentials.json)"

# Update code to use env variable instead of file
```

6. **Create Procfile**
```bash
echo "web: node backend/server.js" > Procfile
```

7. **Deploy**
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

8. **Open App**
```bash
heroku open
```

### Frontend Deployment

1. **Build Frontend**
```bash
cd frontend
npm run build
```

2. **Deploy to Netlify/Vercel**

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd frontend
netlify deploy --prod --dir=dist
```

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod
```

3. **Update API URL**
```javascript
// In frontend/src/services/api.js
const API_URL = 'https://your-backend-url.herokuapp.com/api';
```

---

## Option 2: Deploy to AWS

### Backend on AWS EC2

1. **Launch EC2 Instance**
- Ubuntu Server 22.04 LTS
- t2.micro (free tier)
- Configure security group (ports 22, 80, 443, 5000)

2. **Connect to Instance**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

3. **Install Dependencies**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Install PM2
sudo npm install -g pm2
```

4. **Clone and Setup Project**
```bash
git clone your-repo-url
cd ai-invoice-ocr-system
npm install
```

5. **Configure Environment**
```bash
nano .env
# Add all environment variables
```

6. **Start with PM2**
```bash
pm2 start backend/server.js --name "invoice-ocr"
pm2 startup
pm2 save
```

7. **Setup Nginx Reverse Proxy**
```bash
sudo apt install nginx

sudo nano /etc/nginx/sites-available/invoice-ocr
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/invoice-ocr /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

8. **Setup SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Frontend on AWS S3 + CloudFront

1. **Build Frontend**
```bash
cd frontend
npm run build
```

2. **Create S3 Bucket**
```bash
aws s3 mb s3://your-bucket-name
```

3. **Upload Build**
```bash
aws s3 sync dist/ s3://your-bucket-name
```

4. **Configure S3 for Static Hosting**
- Enable static website hosting
- Set index.html as index document
- Make bucket public

5. **Create CloudFront Distribution**
- Origin: S3 bucket
- Enable HTTPS
- Set custom domain (optional)

---

## Option 3: Deploy to DigitalOcean

### Using App Platform

1. **Create Account**
- Sign up at digitalocean.com

2. **Create App**
- Connect GitHub repository
- Select branch
- Configure build settings

3. **Backend Configuration**
```yaml
name: invoice-ocr-backend
services:
  - name: api
    github:
      repo: your-username/ai-invoice-ocr-system
      branch: main
    build_command: npm install
    run_command: npm start
    envs:
      - key: MONGODB_URI
        value: ${MONGODB_URI}
      - key: JWT_SECRET
        value: ${JWT_SECRET}
      - key: OPENAI_API_KEY
        value: ${OPENAI_API_KEY}
```

4. **Frontend Configuration**
```yaml
name: invoice-ocr-frontend
static_sites:
  - name: web
    github:
      repo: your-username/ai-invoice-ocr-system
      branch: main
    build_command: cd frontend && npm install && npm run build
    output_dir: frontend/dist
```

---

## Option 4: Docker Deployment

### Create Dockerfiles

**Backend Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "backend/server.js"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build: .
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/ai-invoice-ocr
      - JWT_SECRET=${JWT_SECRET}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - GOOGLE_APPLICATION_CREDENTIALS=/app/google-credentials.json
    volumes:
      - ./uploads:/app/uploads
      - ./google-credentials.json:/app/google-credentials.json
    depends_on:
      - mongodb

  frontend:
    build:
      context: .
      dockerfile: frontend/Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

### Deploy with Docker

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## MongoDB Atlas Setup (Recommended for Production)

1. **Create Account**
- Go to mongodb.com/cloud/atlas
- Sign up for free

2. **Create Cluster**
- Choose cloud provider (AWS/GCP/Azure)
- Select region
- Choose free tier (M0)

3. **Configure Access**
- Database Access: Create user
- Network Access: Add IP (0.0.0.0/0 for all)

4. **Get Connection String**
```
mongodb+srv://username:password@cluster.mongodb.net/ai-invoice-ocr?retryWrites=true&w=majority
```

5. **Update Environment Variable**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-invoice-ocr
```

---

## Environment Variables for Production

```env
# Database
MONGODB_URI=your_production_mongodb_uri

# Authentication
JWT_SECRET=generate_strong_random_secret_here

# Server
PORT=5000
NODE_ENV=production

# APIs
GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json
OPENAI_API_KEY=your_production_openai_key

# Frontend
FRONTEND_URL=https://your-frontend-domain.com

# Optional
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads/invoices
```

---

## Security Checklist

- [ ] Use HTTPS (SSL certificate)
- [ ] Strong JWT secret (32+ characters)
- [ ] MongoDB authentication enabled
- [ ] Environment variables secured
- [ ] CORS configured properly
- [ ] Rate limiting implemented
- [ ] File upload validation
- [ ] Input sanitization
- [ ] Error messages don't expose sensitive info
- [ ] API keys not in code
- [ ] Regular security updates

---

## Performance Optimization

### Backend
```javascript
// Enable compression
const compression = require('compression');
app.use(compression());

// Set cache headers
app.use('/uploads', express.static('uploads', {
  maxAge: '1d'
}));

// Connection pooling
mongoose.connect(uri, {
  maxPoolSize: 10
});
```

### Frontend
```javascript
// Code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Image optimization
// Use WebP format
// Lazy load images
```

---

## Monitoring

### Setup PM2 Monitoring
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### Health Check Endpoint
```javascript
// Add to server.js
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});
```

### Logging
```javascript
// Use Winston or Morgan
const morgan = require('morgan');
app.use(morgan('combined'));
```

---

## Backup Strategy

### Database Backup
```bash
# MongoDB backup
mongodump --uri="your_mongodb_uri" --out=/backup/$(date +%Y%m%d)

# Automated daily backup
crontab -e
0 2 * * * mongodump --uri="your_uri" --out=/backup/$(date +\%Y\%m\%d)
```

### File Backup
```bash
# Backup uploads directory
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz uploads/
```

---

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (Nginx, AWS ELB)
- Stateless backend (JWT tokens)
- Shared file storage (S3, Azure Blob)
- Database replication

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Use caching (Redis)
- CDN for static assets

---

## Post-Deployment

1. **Test All Features**
   - User registration/login
   - Invoice upload
   - Camera scanner
   - Data extraction
   - Export functionality
   - ERP integration

2. **Monitor Performance**
   - Response times
   - Error rates
   - Resource usage
   - API quotas

3. **Setup Alerts**
   - Server downtime
   - High error rates
   - API quota warnings
   - Database issues

4. **Documentation**
   - Update API documentation
   - User guide
   - Admin guide
   - Troubleshooting

---

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review logs weekly
- Backup database daily
- Monitor API usage
- Check security advisories
- Optimize database indexes
- Clean old uploads

### Updates
```bash
# Update dependencies
npm update
npm audit fix

# Restart services
pm2 restart all
```

---

## Cost Estimation

### Free Tier Options
- MongoDB Atlas: 512MB free
- Heroku: 1 dyno free (with limitations)
- Netlify: 100GB bandwidth free
- Vercel: Unlimited deployments

### Paid Options (Monthly)
- AWS EC2 t2.micro: ~$10
- MongoDB Atlas M10: ~$57
- Domain: ~$12/year
- SSL: Free (Let's Encrypt)
- Total: ~$70-100/month

---

## Support

For deployment issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints
4. Review security groups/firewall
5. Check DNS configuration

---

**Your app is now production-ready! 🚀**
