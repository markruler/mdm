import * as vscode from "vscode";

export async function read(fileUri: vscode.Uri) {
  try {
    console.log("markdown path:", fileUri);
		const readData = await vscode.workspace.fs.readFile(fileUri);
		return Buffer.from(readData).toString('utf8');
  } catch (err) {
    console.error("[MDM]", "cannot read the file!", err);
  }
}
