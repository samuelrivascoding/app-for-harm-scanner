const { ImageAnnotatorClient } = require('@google-cloud/vision');

function initializeVisionClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'); // Replace escaped newlines with actual newlines

  if (clientEmail && privateKey) {
    return new ImageAnnotatorClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
    });
  } else {
    throw new Error('Google Cloud credentials are not set in environment variables');
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { imageBase64 } = req.body;

  if (!imageBase64) {
    return res.status(400).json({ error: 'Image data not provided' });
  }

  try {
    const visionClient = await initializeVisionClient();
    const [result] = await visionClient.textDetection({
      image: { content: Buffer.from(imageBase64, 'base64') },
    });

    const detections = result.textAnnotations.map((text) => text.description);
    res.status(200).json({ detections });
  } catch (error) {
    console.error('Error during text detection:', error);
    res.status(500).json({ error: error.message });
  }
};
