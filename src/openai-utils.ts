import { getSystemPrompt } from "./prompt";
import { ConfigKeys, getConfig } from "./config";
import { ChatGPTAPI } from "chatgpt-api-cjs";

export async function getChatgpt() {
  const apiKey = getConfig<string>(ConfigKeys.OPENAI_API_KEY);

  return new ChatGPTAPI({
    apiKey,
    completionParams: {
      model: "gpt-3.5-turbo",
      temperature: 0.1,
      top_p: 0.7,
    },
    systemMessage: getSystemPrompt(),
  });
}
