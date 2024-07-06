import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function lookupHealthInfo(sortedItems) {
  console.log(sortedItems.length)

  if (!Array.isArray(sortedItems) || sortedItems.length === 0) {
    throw new Error('Invalid input: sortedItems must be a non-empty array');
  }
  
  try {

  const prompts = sortedItems.map(item => `Is ${item} harmful to health, carcinogenic, or associated with birth defects.`); // Create prompts
  const maxTokensPerItem = 100; // Adjust based on prompt length and desired response length

  const gptResponse = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: prompts.join('\n'), // Combine prompts with newline separator
    max_tokens: sortedItems.length * maxTokensPerItem, // Adjust max_tokens for total prompts
    temperature: 0.2,
  });
  (console.log(`gptResponse: ${JSON.stringify(gptResponse)}`))
  console.log(gptResponse.choices[0].text)

  if (!gptResponse || !gptResponse.choices || gptResponse.choices.length === 0) {
    throw new Error('Empty or invalid response from OpenAI');
  }

  // Process the response to extract individual health information
  const healthInfoList = [];
  if (gptResponse && gptResponse.choices && gptResponse.choices.length > 0) {
    for (let i = 0; i < sortedItems.length; i++) {
      const responseSnippet = gptResponse.choices[0].text.trim(); // Trim whitespace
      if (responseSnippet) { // Check if snippet is not empty
        healthInfoList.push(responseSnippet);
      }      console.log('1')
    }
  } else {
    throw new Error('Empty or invalid response from OpenAI');
  }

  console.log('returnedhealthinfolist' + healthInfoList)
  return healthInfoList;
} catch (error) {
  console.error('Error during ChatGPT lookup:', error);
  // Optionally, dispatch an action to set an error state
}
}