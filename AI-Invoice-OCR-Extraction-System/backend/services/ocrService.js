const { extractTextFromImage: googleVisionOCR } = require('../../ocr-module/googleVisionOCR');
const { extractTextFromImage: mockOCR } = require('../../ocr-module/mockOCR');
const { preprocessImage } = require('../../ocr-module/imagePreprocessing');
const fs = require('fs');

const processOCR = async (imagePath) => {
  try {
    // Check if Google Vision credentials exist
    const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const useGoogleVision = credentialsPath && fs.existsSync(credentialsPath);
    
    if (!useGoogleVision) {
      console.warn('⚠️  Google Vision API not configured - Using MOCK OCR for testing');
      console.warn('⚠️  To use real OCR, configure GOOGLE_APPLICATION_CREDENTIALS in .env');
      const extractedText = await mockOCR(imagePath);
      return extractedText;
    }
    
    console.log('Using Google Vision API for OCR');
    const processedPath = await preprocessImage(imagePath);
    const extractedText = await googleVisionOCR(processedPath);
    return extractedText;
  } catch (error) {
    console.error('OCR Service Error:', error);
    console.warn('⚠️  Falling back to MOCK OCR due to error');
    // Fallback to mock OCR if Google Vision fails
    const extractedText = await mockOCR(imagePath);
    return extractedText;
  }
};

module.exports = { processOCR };
