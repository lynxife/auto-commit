import {
  getStagedChanges,
  getStagedFileDiff,
  simplifyGitDiff,
} from "./git-utils";

async function getFormattedGitInfo() {
  const stagedFiles = await getStagedChanges();
  const stagedFileDiffs = await Promise.all(stagedFiles.map(getStagedFileDiff));
  const simpleDiff = stagedFileDiffs
    .map((diff, i) => simplifyGitDiff(stagedFiles[i], diff))
    .join("\n");
  return { simpleDiff };
}
export async function generateCommitMsg() {
  const { simpleDiff } = await getFormattedGitInfo();
  console.log(simpleDiff);
}
