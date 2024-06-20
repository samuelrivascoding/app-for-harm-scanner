const http = require('http');
const vision = require('@google-cloud/vision');
const sharp = require('sharp'); // Import sharp for image processing
const fs = require('fs'); // Node.js file system module

// Initialize Google Cloud Vision client
const client = new vision.ImageAnnotatorClient({
  keyFilename: 'path/to/your/service-account-file.json', // Adjust the path to your service account key file
});

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString(); // Convert Buffer to string
      });

      req.on('end', async () => {
        const { photo } = JSON.parse(body); // Assuming your request body contains a base64-encoded photo
        const fileBuffer = Buffer.from(photo, 'base64');

        // Resize the image using sharp
        const processedImageBuffer = await sharp(fileBuffer)
          .resize({ width: 1024, height: 768, fit: 'inside' })
          .toBuffer();
        
        const [result] = await client.textDetection(processedImageBuffer); // Use textDetection instead of labelDetection

        const textAnnotations = result.textAnnotations;
        const extractedText = textAnnotations[0]?.description || ''; // Extracting only the first annotation, adjust as per your needs

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ extractedText }));
      });
    } catch (error) {
      console.error('Error processing file:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Error processing file' }));
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
  }
}

http.createServer(handler).listen(3000, () => {
  console.log('Server is listening on port 3000');
});
