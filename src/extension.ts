import * as vscode from "vscode";

import autoCommitController from "./auto-commit-controller";

export async function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.auto-commit", async () => {
      await autoCommitController();
    })
  );
}

export function deactivate() {}
