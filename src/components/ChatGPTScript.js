import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function sortItems(inputText) {
    const prompt = `Sort the following items: ${inputText}`;
    const gptResponse = await openai.complete({
        model: "text-davinci-003",
        prompt: prompt,
        maxTokens: 75,
    });

    const sortedList = gptResponse.choices[0].text.trim();
    const separatedList = sortedList.replace(/([^,])\s([^,])/g, "$1, $2");

    return separatedList;
}

export async function lookupHealthInfo(sortedItem) {
    const prompt = `What is ${sortedItem}? Is it harmful to health?`;
    const gptResponse = await openai.complete({
        engine: "text-davinci-003",
        prompt: prompt,
        maxTokens: 30,
    });
    const healthInfo = gptResponse.choices[0].text.trim();
    return healthInfo;
}
