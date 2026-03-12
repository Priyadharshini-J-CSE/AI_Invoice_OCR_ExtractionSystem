const extractJSON = (text) => {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(text);
  } catch (error) {
    console.error('JSON extraction error:', error);
    throw new Error('Failed to parse AI response as JSON');
  }
};

const calculateConfidenceScores = (extractedData) => {
  const scores = {};
  
  if (extractedData.supplier_name) scores.supplier_name = 97;
  if (extractedData.invoice_number) scores.invoice_number = 95;
  if (extractedData.invoice_date) scores.invoice_date = 94;
  if (extractedData.items && extractedData.items.length > 0) scores.items = 92;
  if (extractedData.tax_percentage !== undefined) scores.tax = 93;
  if (extractedData.total_amount) scores.total_amount = 96;
  if (extractedData.currency) scores.currency = 98;
  
  return scores;
};

module.exports = { extractJSON, calculateConfidenceScores };
