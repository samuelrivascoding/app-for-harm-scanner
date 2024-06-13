// api/upload.js
const vision = require('@google-cloud/vision');

// set environmental variable for service account file to make it secures
const client = new vision.ImageAnnotatorClient({
  keyFilename: "C:\Users\cool cat\Documents\coding\cloud vision key\apt-cycling-425621-r6-42a2db08dff7.json", // Update with your service account file path
});

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const fileBuffer = Buffer.from(req.body, 'base64');
      const [result] = await client.labelDetection(fileBuffer);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error processing file:', error);
      res.status(500).json({ error: 'Error processing file' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};