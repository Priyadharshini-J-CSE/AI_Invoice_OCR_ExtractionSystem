const vision = require('@google-cloud/vision');

let client;

try {
  client = new vision.ImageAnnotatorClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
  });
  console.log('Google Vision API client initialized');
} catch (error) {
  console.error('Failed to initialize Google Vision API client:', error.message);
}

const extractTextFromImage = async (imagePath) => {
  try {
    if (!client) {
      throw new Error('Google Vision API client not initialized. Check GOOGLE_APPLICATION_CREDENTIALS in .env');
    }

    console.log('Calling Google Vision API for:', imagePath);
    const [result] = await client.textDetection(imagePath);
    const detections = result.textAnnotations;
    
    if (!detections || detections.length === 0) {
      console.warn('No text detected in image');
      throw new Error('No text detected in image');
    }

    const fullText = detections[0].description;
    console.log('Google Vision API extracted', fullText.length, 'characters');
    return fullText;
  } catch (error) {
    console.error('Google Vision OCR Error:', error.message);
    if (error.code === 'ENOENT') {
      throw new Error('Google Vision credentials file not found. Check GOOGLE_APPLICATION_CREDENTIALS path.');
    }
    throw new Error(`Failed to extract text from image: ${error.message}`);
  }
};

module.exports = { extractTextFromImage };
