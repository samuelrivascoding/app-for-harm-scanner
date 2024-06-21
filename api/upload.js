const { ImageAnnotatorClient } = require('@google-cloud/vision');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const secretManagerClient = new SecretManagerServiceClient();

async function getSecret(secretName) {
  try {
    const [version] = await secretManagerClient.accessSecretVersion({
      name: `projects/YOUR_PROJECT_ID/secrets/${secretName}/versions/latest`,
    });
    return version.payload.data.toString('utf8');
  } catch (error) {
    console.warn('Secret not found, falling back to default API key.');
    return null;
  }
}

async function initializeVisionClient() {
  const serviceAccountKey = await getSecret('SERVICE_ACCOUNT_KEY');
  if (serviceAccountKey) {
    return new ImageAnnotatorClient({
      credentials: JSON.parse(serviceAccountKey),
    });
  } else {
    // Use default API key
    return new ImageAnnotatorClient({
      key: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
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
