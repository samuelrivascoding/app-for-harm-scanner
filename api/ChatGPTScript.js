import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function lookupHealthInfo(sortedItem) {
  try {
    const prompt = `What is ${sortedItem}? Is it harmful to health?`;
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-instruct",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 30,
      temperature: 0.2,
    });

    if (!gptResponse || !gptResponse.choices || gptResponse.choices.length === 0) {
      throw new Error('Empty or invalid response from OpenAI');
    }

    const healthInfo = gptResponse.choices[0].message.content.trim();

    console.log('OpenAI API Status:', gptResponse.status); // Log the API status

    return healthInfo;
  } catch (error) {
    console.error('Error fetching health info:', error);
    throw new Error('Failed to fetch health info');
  }
}
