const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  async function sortItems(inputText) {
    const prompt = `Sort the following items: ${inputText}`;
    const gptResponse = await openai.complete({
        engine: "text-davinci-003",
        prompt: prompt,
        maxTokens: 75,
    });

    const sortedList = gptResponse.choices[0].text.trim();
    const separatedList = sortedList.replace(/([^,])\s([^,])/g, "$1, $2");

    return separatedList;
}

async function lookupHealthInfo(sortedItem) {
    const prompt = `What is ${sortedItem}? Is it harmful to health?`;
    const gptResponse = await openai.complete({
        engine: "text-davinci-003",
        prompt: prompt,
        maxTokens: 30,
    });
    const healthInfo = gptResponse.choices[0].text.trim();
    return healthInfo;
}

// Example usage
async function main() {
    const inputText = "apple, banana, orange";
    const sortedList = await sortItems(inputText);
    console.log(sortedList);

    const itemToLookup = "banana"; // Replace with the item you want to lookup
    const healthInfo = await lookupHealthInfo(itemToLookup);
    console.log(`Health info for ${itemToLookup}: ${healthInfo}`);
}

main()

