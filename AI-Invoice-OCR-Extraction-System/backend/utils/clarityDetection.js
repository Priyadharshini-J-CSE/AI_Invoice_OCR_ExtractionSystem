const sharp = require('sharp');

const calculateClarity = async (imagePath) => {
  try {
    const image = sharp(imagePath);
    const { data, info } = await image
      .greyscale()
      .raw()
      .toBuffer({ resolveWithObject: true });

    let sum = 0;
    for (let i = 1; i < data.length - 1; i++) {
      const diff = Math.abs(data[i] - data[i - 1]);
      sum += diff;
    }

    const variance = sum / data.length;
    const clarity = Math.min(100, (variance / 50) * 100);
    
    return Math.round(clarity);
  } catch (error) {
    console.error('Clarity detection error:', error);
    return 50;
  }
};

module.exports = { calculateClarity };
