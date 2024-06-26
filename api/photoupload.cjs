const express = require('express');
const multer = require('multer');
const sharp = require('sharp');


const app = express();

// Configure multer for file upload
const upload = multer({
  storage: multer.memoryStorage(),     
  limits: {
  fileSize: 10 * 1024 * 1024, // No larger than 10mb
  fieldSize: 10 * 1024 * 1024, // No larger than 10mb
  }, 
});

// Define CORS headers middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
  
});

// Handle file upload route
app.post('/api/photoupload', upload.single('image'), async (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      throw createError(400, 'No file uploaded');
    }

    // Determine the image MIME type (e.g., image/jpeg, image/png, etc.)
    const imageType = file.mimetype;

    // Process image with Sharp (example: resize to 300x300)
    const processedImage = await sharp(file.buffer)
      .resize({ width: 300, height: 300 })
      .toBuffer();

    // Convert processed image to base64 (if needed)
    const base64Image = processedImage.toString('base64');

    const imageUrl = `data:${imageType};base64,${base64Image}`;

    // Return the base64 encoded image as response
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(error.statusCode || 500).json({ error: error.message || 'Failed to process image' });
  }
});

// Export the Express app for serverless deployment
module.exports = app;
