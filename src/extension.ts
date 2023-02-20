import * as vscode from "vscode";
import * as MarkdownIt from "markdown-it";
import {callMailer, getMailServer} from "./mailer";

// ex: https://github.com/microsoft/vscode-extension-samples/blob/main/github-authentication-sample/src/extension.ts
export async function activate(context: vscode.ExtensionContext) {
    console.log("activate");

    const md: MarkdownIt = new MarkdownIt();
    const mailServer: string = await getMailServer();
    const mailHostPort = mailServer.split(":");

    let send = vscode.commands.registerCommand("mdm.send", async () => {
        if (!vscode.window.activeTextEditor) {
            return; // no editor
        }

        const {document} = vscode.window.activeTextEditor;

        const scheme = document.uri.scheme;
        if (!scheme || scheme !== "file") {
            return; // not a file
        }
        console.log(document.uri);

        const activeFilePath = document.uri.path;
        const message = `# current file ${activeFilePath}`;

        const html = md.render(message);
        console.log(html);

        console.log(`mailServer: ${mailServer}`);
        await callMailer(html, mailHostPort[0], parseInt(mailHostPort[1]));

        vscode.window.showInformationMessage(`Send to ${mailServer}`);
    });

    context.subscriptions.push(send);
}

export function deactivate() {
    console.log("deactivate");
}
