import { Uri, workspace } from "vscode";
const frontMatter = require("front-matter");

/**
 * Read mail options from front matter
 * @param originalText Original text
 * @returns Mail options
 */
export async function readMailOptions(originalText: string) {
  return (await frontMatter(originalText).attributes) || {};
}

/**
 * Read file content from current active editor
 * @param fileUri file uri
 * @returns file content
 */
export async function read(fileUri: Uri) {
  try {
    console.log("markdown path:", fileUri);
    const readData = await workspace.fs.readFile(fileUri);
    return Buffer.from(readData).toString("utf8");
  } catch (err) {
    console.error("[MDM]", "cannot read the file!", err);
  }
}
