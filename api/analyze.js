import vision from '@google-cloud/vision';
import { GoogleAuth } from 'google-auth-library';


// Initialize Google Vision API client
const credentials = {
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY
};

const auth = new GoogleAuth({ credentials });
const client = new vision.ImageAnnotatorClient({ auth });


async function analyzeImage(base64Data) {
  try {
    const buffer = Buffer.from(base64Data, 'base64');
    const [result] = await client.textDetection({
      image: { content: buffer }
    });

    return result.textAnnotations;
  } catch (error) {
    console.error('Error during image processing:', error);
    throw error; // re-throw for handling in the main function
  }
}


const analyze = async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!req.body || !req.body.image) {
    return res.status(400).json({ error: 'Image data not provided' });

  }
  const image = req.body.image;

  if (!image.startsWith('data:image/')) {
    return res.status(400).json({ error: 'Invalid image data format. Expected base64 data URI' });
  }


  try {

    const base64Data = image.split(',')[1];
    const detections = await analyzeImage(base64Data);
    console.log(detections.length); // check if detections array is empty
    console.log(detections);
    
    console.log(" it worked!!!!")
    console.log('Text:')
    const firstDescription = detections[0]?.description;
    detections.forEach(text => console.log(text.description));
    const allDescriptions = detections.map(text => text.description).join(' ');

    res.status(200).json({ allDescriptions});
  } catch (error) {
    console.error('Error during text detection:', error);
    res.status(500).json({ error: 'Failed to process image: '+ error.message });
  }
};

export default analyze;