const OpenAI = require('openai');
const { createInvoicePrompt } = require('../../ai-module/invoicePrompt');
const { extractJSON, calculateConfidenceScores } = require('../../ai-module/jsonExtractor');

let client;

try {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not found in environment variables');
  }
  client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  console.log('OpenAI client initialized');
} catch (error) {
  console.error('Failed to initialize OpenAI client:', error.message);
}

const extractInvoiceData = async (ocrText) => {
  try {
    if (!client) {
      throw new Error('OpenAI client not initialized. Check OPENAI_API_KEY in .env');
    }

    if (!ocrText || ocrText.trim().length === 0) {
      throw new Error('OCR text is empty. Cannot extract invoice data.');
    }

    console.log('Creating prompt for OpenAI...');
    const prompt = createInvoicePrompt(ocrText);
    
    console.log('Calling OpenAI API...');
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.1
    });

    const aiResponse = response.choices[0].message.content;
    console.log('OpenAI response received, length:', aiResponse.length);
    
    const extractedData = extractJSON(aiResponse);
    const confidenceScores = calculateConfidenceScores(extractedData);

    return { extractedData, confidenceScores };
  } catch (error) {
    console.error('AI Service Error:', error.message);
    if (error.code === 'insufficient_quota') {
      throw new Error('OpenAI API quota exceeded. Please check your billing.');
    }
    if (error.code === 'invalid_api_key') {
      throw new Error('Invalid OpenAI API key. Please check your .env file.');
    }
    throw new Error(`Failed to extract invoice data using AI: ${error.message}`);
  }
};

module.exports = { extractInvoiceData };
