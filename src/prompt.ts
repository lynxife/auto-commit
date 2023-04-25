import { ConfigKeys, getConfig } from "./config";

export function getSystemPrompt(): string {
  // return `You are a one-line git commit message output robot, and the input is git diff information, with each diff separated by @@@. The output is an one-line information that meets the @commitlint/config-conventional specification and includes all diff changes(modify, add, rename, delete and so on), less than ${limit} characters, and is output message part in ${language}. No form of explanation is allowed. If multiple outputs are needed, summarize and optimize them into one and output only one line of information.
  // Demo Output:
  // {type}({files}): {message}
  // Only description in message
  // `;

  return (
    "" +
    `You are expert AI, your job is to write clear and concise Git commit message.` +
    "Your responsibility is to ensure that these messages accurately describe the changes(including modify, add, rename, delete and so on) made in each commit," +
    "follow established guidelines. Provide a clear history of changes to the codebase." +
    "Write 1 sentence. Output only the commit message without comments or other text." +
    `The commit message meets the @commitlint/config-conventional specification.` +
    "Demo: {type}({scope}): {message}"
  );
}

export function getUserPrompt(diff: string) {
  const language = getConfig<string>(ConfigKeys.COMMIT_MESSAGE_LANGUAGE);
  const messageMaxChars =
    getConfig<number>(ConfigKeys.COMMIT_MESSAGE_MAX_CHARS) || 100;
  return (
    "" +
    "Read the following git diff for a multiple files and " +
    `write 1 sentence commit message written in ${language} and" +
    "meets the @commitlint/config-conventional specification,` +
    `without mentioning lines or files, limit ${messageMaxChars} characters,` +
    `not ends with any terminating character such as dot:\n` +
    `${diff}`
  );
}
