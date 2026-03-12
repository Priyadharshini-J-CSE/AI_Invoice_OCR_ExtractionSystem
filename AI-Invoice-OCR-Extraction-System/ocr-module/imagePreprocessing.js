const sharp = require('sharp');
const path = require('path');

const preprocessImage = async (inputPath) => {
  try {
    const outputPath = inputPath.replace(path.extname(inputPath), '_processed.jpg');
    
    await sharp(inputPath)
      .greyscale()
      .normalize()
      .sharpen()
      .toFile(outputPath);

    return outputPath;
  } catch (error) {
    console.error('Image preprocessing error:', error);
    return inputPath;
  }
};

module.exports = { preprocessImage };
