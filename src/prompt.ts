export function getSystemPrompt(language: string = "English"): string {
  // return `
  // Please summarize the following updates and generate a commit message according to the @commitlint/config-conventional format:\n
  // {{ diff }}\n
  // Please summarize and output a commit information in the format of @commitlint/config-conventional according to the {{ diff }} I entered later. There is no need for details, but the file scope needs to be modified. Just describe it in one sentence (note that the (deleted) tag in {{diff}} means that the file has been deleted and needs to be summarized), output in ${language}\n.
  // `;

  return `
  Input(Simplified git diff info):
  {{diff}}
  Output(Git commit message):
  {{output}}
  Requirement:
  1. Meet the @commitlint/config-conventional specification
  2. Very Important!!! Just describe it in one sentence, one sentence!! (note that the (deleted) tag in {{diff}} means that the file has been deleted and needs to be summarized)
  3. There is no need for details, but should include the file scope needs to be modified
  4. output in ${language}.
  `;
}
