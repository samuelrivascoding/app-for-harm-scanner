// api/upload.js
const { createServer, getRequestHandler } = require('@vercel/node');
const vision = require('@google-cloud/vision');
const sharp = require('sharp'); // Import sharp for image processing
const fs = require('fs'); // Node.js file system module

// Initialize Google Cloud Vision client
const client = new vision.ImageAnnotatorClient({
  keyFilename: './apt-cycling-425621-r6-42a2db08dff7.json', // Adjust the path to your service account key file
});

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const fileBuffer = Buffer.from(req.body.photo, 'base64'); // Assuming your request body contains a base64-encoded photo

      // Resize the image using sharp
      const processedImageBuffer = await sharp(fileBuffer)
        .resize({ width: 1024, height: 768, fit: 'inside' })
        .toBuffer();
        
      const [result] = await client.textDetection(fileBuffer); // Use textDetection instead of labelDetection

      const textAnnotations = result.textAnnotations;
      const extractedText = textAnnotations[0].description; // Extracting only the first annotation, adjust as per your needs

      res.status(200).json({ extractedText });
    } catch (error) {
      console.error('Error processing file:', error);
      res.status(500).json({ error: 'Error processing file' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

module.exports = createServer(getRequestHandler(handler));