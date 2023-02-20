import * as vscode from 'vscode';
import * as MarkdownIt from "markdown-it";

export function activate(context: vscode.ExtensionContext) {
    console.log("activate");

    const md: MarkdownIt = new MarkdownIt();

    let send = vscode.commands.registerCommand('mdm.send', async () => {

        if (!vscode.window.activeTextEditor) {
            return; // no editor
        }

        const {document} = vscode.window.activeTextEditor;

        const scheme = document.uri.scheme;
        if (!scheme || scheme !== "file") {
            return; // not a file
        }
        console.log(document.uri);

        const message = `# current file ${document.uri.path}`;
        console.log(message);

        const html = md.render(message);
        console.log(html);

        vscode.window.showInformationMessage('mdm Done!');
    });

    context.subscriptions.push(send);
}

export function deactivate() {
    console.log("deactivate");
}
