const multer = require('multer');
const sharp = require('sharp');
const { send, createError } = require('micro');

// Configure multer for file upload
const upload = multer({ storage: multer.memoryStorage() });

// Handler function for the serverless function
module.exports = upload.single('file', async (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      throw createError(400, 'No file uploaded');
    }

    // Process image with Sharp (example: resize to 300x300)
    const processedImage = await sharp(file.buffer)
      .resize({ width: 300, height: 300 })
      .toBuffer();

    // Convert processed image to base64
    const base64Image = processedImage.toString('base64');

    // Return the base64 encoded image as response
    send(res, 200, { imageUrl: `data:image/jpeg;base64,${base64Image}` });
  } catch (error) {
    console.error('Error processing image:', error);
    send(res, 500, { error: 'Failed to process image' });
  }
});
