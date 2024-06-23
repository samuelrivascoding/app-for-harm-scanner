import vision from '@google-cloud/vision';
import { GoogleAuth } from 'google-auth-library';

// Initialize Google Vision API client
const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const auth = new GoogleAuth({ credentials });
const client = new vision.ImageAnnotatorClient({ auth });

const analyze = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { imageBase64 } = req.body;

  if (!imageBase64) {
    return res.status(400).json({ error: 'Image data not provided' });
  }

  try {
    const [result] = await client.textDetection({
      image: { content: Buffer.from(imageBase64, 'base64') },
    });
    console.log(" it worked!!!!")
    const detections = result.textAnnotations.map((text) => text.description);
    res.status(200).json({ detections });
  } catch (error) {
    console.error('Error during text detection:', error);
    res.status(500).json({ error: error.message });
  }
};

export default analyze;
