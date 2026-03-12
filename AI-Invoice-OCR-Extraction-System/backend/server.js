require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const fs = require('fs');
const path = require('path');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads', 'invoices');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory:', uploadsDir);
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/invoices', invoiceRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'AI Invoice OCR System API' });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date(),
    env: {
      mongodbConfigured: !!process.env.MONGODB_URI,
      jwtConfigured: !!process.env.JWT_SECRET,
      openaiConfigured: !!process.env.OPENAI_API_KEY,
      googleVisionConfigured: !!process.env.GOOGLE_APPLICATION_CREDENTIALS
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('=== Global Error Handler ===');
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ 
      message: 'File upload error', 
      error: err.message 
    });
  }
  
  res.status(500).json({ 
    message: 'Internal server error', 
    error: err.message 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('\n========================================');
  console.log('Environment Configuration:');
  console.log('========================================');
  console.log('- TEST_MODE:', process.env.TEST_MODE === 'true' ? '✓ ENABLED (No external APIs needed)' : 'Disabled');
  console.log('- MongoDB URI:', process.env.MONGODB_URI ? '✓ Configured' : '✗ Missing');
  console.log('- JWT Secret:', process.env.JWT_SECRET ? '✓ Configured' : '✗ Missing');
  console.log('- OpenAI API Key:', process.env.OPENAI_API_KEY ? '✓ Configured' : '✗ Missing');
  console.log('- Google Vision Credentials:', process.env.GOOGLE_APPLICATION_CREDENTIALS ? '✓ Configured' : '✗ Missing');
  console.log('========================================\n');
  
  if (process.env.TEST_MODE === 'true') {
    console.log('⚠️  TEST MODE ACTIVE');
    console.log('   All uploads will use mock data');
    console.log('   No external APIs will be called');
    console.log('   Perfect for testing without API keys!\n');
  }
});
