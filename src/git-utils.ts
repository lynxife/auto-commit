import simpleGit, { DiffResult, SimpleGit, StatusResult } from "simple-git";
import vscode from "vscode";

const rootPath = vscode.workspace.workspaceFolders
  ? vscode.workspace.workspaceFolders[0].uri.fsPath
  : null;

const git: SimpleGit = simpleGit(rootPath);

export async function getStagedChanges(): Promise<string[]> {
  try {
    const status = await git.status();
    const stagedFiles = status.staged;
    return stagedFiles;
  } catch (error) {
    console.error("Error reading Git staged changes:", error);
    return [];
  }
}

export async function getStagedFileDiff(filename: string): Promise<string> {
  try {
    const diff = await git.diff(["--cached", "--", filename]);
    return diff;
  } catch (error) {
    console.error(`Error reading Git diff for staged file ${filename}:`, error);
    throw error;
  }
}

export function simplifyGitDiff(filename: string, diffOutput: string): string {
  const [_, __, originalVersion, updatedVersion, ___, ...diffArr] =
    diffOutput.split("\n");

  const [__1, _originalFilename] = originalVersion.split(" a/");
  const [__2, updatedFilename] = updatedVersion.split(" b/");
  const originalFilename = _originalFilename || filename;

  const unchanged = [];
  const added = [];
  const removed = [];
  const diff = diffArr.join("\n");

  diff.split("\n").forEach((line) => {
    if (line.startsWith("@@")) return;

    if (line.startsWith("+")) added.push(line.substring(1));
    else if (line.startsWith("-")) removed.push(line.substring(1));
    else if (line.startsWith(" ")) unchanged.push(line.substring(1));
  });

  const result = [];

  if (added.length > 0) {
    result.push(`+ ${updatedFilename}`);
    result.push(...added);
  }

  if (removed.length > 0) {
    if (added.length === 0) {
      result.push(`- ${originalFilename} (deleted)`);
    } else {
      result.push(`- ${originalFilename}`);
      result.push(...removed);
    }
  }

  // console.log("arrs", unchanged, added, removed);

  return result.join("\n");
}
