import vscode from "vscode";
import autoCommitController from "./auto-commit-controller";

export async function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.autoCommit", async () => {
      await autoCommitController();
    })
  );
}

export function deactivate() {}
