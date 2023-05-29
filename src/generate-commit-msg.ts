import {
  getStagedChanges,
  getStagedFileDiff,
  simplifyGitDiff,
} from "./git-utils";
import { ConfigKeys, getConfig } from "./config";
import * as vscode from "vscode";
import { getChatgpt } from "./openai-utils";
import { infoMsg } from "./utils";
import { getUserPrompt } from "./prompt";

async function getDiffStr() {
  const { stagedFiles, renameFiles } = await getStagedChanges();
  const stagedFileDiffs = await Promise.all(stagedFiles.map(getStagedFileDiff));
  const stagedDiff = stagedFileDiffs
    .map((diff, i) => simplifyGitDiff(stagedFiles[i], diff))
    .join("\n@@@\n");
  const renameDiff = renameFiles
    .map(({ from, to }) => `= ${from} (renamed to ${to})`)
    .join("\n@@@\n");
  return stagedDiff + (renameDiff || "\n@@@\n" + renameDiff);
}
export async function generateCommitMsg() {
  const diffStr = await getDiffStr();
  const apiKey = getConfig<string>(ConfigKeys.OPENAI_API_KEY);
  const changedFileMaxChars =
    getConfig<number>(ConfigKeys.MAX_FILE_CHANGES_CHARS) || 4000;
  if (!apiKey) {
    infoMsg("OpenAI API Key Not Set");
    return;
  }

  if (changedFileMaxChars < diffStr.length) {
    infoMsg(
      `Too many file changes. Please reduce the number of file changes to less than ${changedFileMaxChars} characters.`
    );
    return;
  }

  const chatgpt = await getChatgpt();

  // Get the source control view
  const sourceControlView = vscode.extensions
    .getExtension("vscode.git")
    .exports.getAPI(1).repositories[0];

  // Get the commit input box
  const scmInputBox =
    sourceControlView.inputBox as vscode.SourceControlInputBox;

  if (scmInputBox) {
    const edit = new vscode.WorkspaceEdit();

    scmInputBox.value = "";

    chatgpt.sendMessage(getUserPrompt(diffStr), {
      onProgress: ({ delta }) => {
        if (delta === undefined) {
          return;
        }
        scmInputBox.value += delta;

        if (scmInputBox.value.endsWith(".")) {
          scmInputBox.value = scmInputBox.value.slice(0, -1);
        }
      },
    });

    await vscode.workspace.applyEdit(edit);
  } else {
    vscode.window.showErrorMessage("Unable to find the SCM input box.");
  }
}
