import { errMsg, infoMsg } from "./utils.js";
import { generateCommitMsg } from "./generate-commit-msg.js";
export default async function autoCommitController() {
  try {
    infoMsg("Generating commit message...");
    await generateCommitMsg();
  } catch (error) {
    errMsg("Generate commit message failed", error);
  }
}
