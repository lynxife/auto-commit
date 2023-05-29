import * as vscode from "vscode";

export const ConfigKeys = {
  OPENAI_API_KEY: "OPENAI_API_KEY",
  COMMIT_MESSAGE_LANGUAGE: "COMMIT_MESSAGE_LANGUAGE",
  COMMIT_MESSAGE_MAX_CHARS: "COMMIT_MESSAGE_MAX_CHARS",
  MAX_FILE_CHANGES_CHARS: "MAX_FILE_CHANGES_CHARS",
  EMOJI_ENABLED: "EMOJI_ENABLED",
};

export function getConfig<T>(key: string): T {
  const config = vscode.workspace.getConfiguration("auto-commit");
  return config.get<T>(key, null as unknown as T);
}
