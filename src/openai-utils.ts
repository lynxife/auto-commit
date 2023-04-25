import { getSystemPrompt } from "./prompt.js";
import { ConfigKeys, getConfig } from "./config.js";

const importDynamic = new Function("modulePath", "return import(modulePath)");

export async function getChatgpt() {
  const { ChatGPTAPI } = await importDynamic("chatgpt");

  const apiKey = getConfig<string>(ConfigKeys.OPENAI_API_KEY);

  return new ChatGPTAPI({
    apiKey,
    completionParams: {
      model: "gpt-3.5-turbo",
      temperature: 0.1,
      top_p: 1,
    },
    systemMessage: getSystemPrompt(),
  });
}
