import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function lookupHealthInfo(sortedItems) {
  if (!Array.isArray(sortedItems) || sortedItems.length === 0) {
    throw new Error('Invalid input: sortedItems must be a non-empty array');
  }

  const healthInfoList = [];
  
  try {
    for (const item of sortedItems) {
      const prompt = `Is ${item} harmful to health, carcinogenic, or associated with birth defects.`;
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt,
        max_tokens: 100, // Adjust as needed
        temperature: 0.2,
      });

      if (!response || !response.choices || response.choices.length === 0) {
        throw new Error('Empty or invalid response from OpenAI');
      }

      const responseSnippet = response.choices[0].text.trim(); // Trim whitespace
      if (responseSnippet) { // Check if snippet is not empty
        healthInfoList.push(responseSnippet);
      }     console.log('1')
      console.log(responseSnippet)

    }

  // Process the response to extract individual health information

  console.log('returnedhealthinfolist' + healthInfoList)
  return healthInfoList;
} catch (error) {
  console.error('Error during ChatGPT lookup:', error);
  // Optionally, dispatch an action to set an error state
}
}