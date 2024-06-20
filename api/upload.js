const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ImageAnnotatorClient } = require('@google-cloud/vision');

const app = express();
const port = process.env.PORT || 3000;

const client = new ImageAnnotatorClient({
  keyFilename: '"C:\Users\cool cat\Documents\coding\cloud vision key\apt-cycling-425621-r6-42a2db08dff7.json"',
});

app.use(cors());
app.use(bodyParser.json());

app.post('/api/vision', async (req, res) => {
  const { imageBase64 } = req.body;

  try {
    const [result] = await client.textDetection({
      image: { content: Buffer.from(imageBase64, 'base64') },
    });
    const detections = result.textAnnotations.map(text => text.description);
    res.status(200).json({ detections });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
