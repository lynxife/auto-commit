import * as vscode from "vscode";

export async function wait(timeMs = 300) {
  return new Promise((resolve) => setTimeout(() => resolve(1), timeMs));
}

export async function infoMsg(message: string) {
  vscode.window.showInformationMessage(`[auto-commit] ${message}`);
}

export async function errMsg(msg: string, err: any) {
  vscode.window.showErrorMessage(`[auto-commit] ${msg}, Error: ${err.message}`);
}
