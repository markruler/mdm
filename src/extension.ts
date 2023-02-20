import * as vscode from "vscode";
import * as MarkdownIt from "markdown-it";
import { getMailServer, callMailer } from "./mailer";
import { read } from "./reader";
const frontMatter = require("front-matter");

export interface MdmOptions {
  host: string; // mail.example.com
  port: number; // 25, 465, 587
  from: string; // from@example.com
  to: string; // to@example.com
  subject: string; // Title
}

// ex: https://github.com/microsoft/vscode-extension-samples/blob/main/github-authentication-sample/src/extension.ts
export async function activate(context: vscode.ExtensionContext) {
  console.log("activate");

  const md: MarkdownIt = new MarkdownIt().use(
    // Remove front matter
    require("markdown-it-front-matter"),
    function (frontMatter: string) {
      console.log(frontMatter);
    }
  );

  let send = vscode.commands.registerCommand("mdm.send", async () => {
    if (!vscode.window.activeTextEditor) {
      return; // no editor
    }

    const { document } = vscode.window.activeTextEditor;

    const scheme = document.uri.scheme;
    if (!scheme || scheme !== "file") {
      return; // not a file
    }
    console.log(document.uri);

    const activeFilePath = document.uri.path;
    const message = `current file ${activeFilePath}`;
    console.log(message);

    const origin = (await read(activeFilePath)) || "";
    const mailOptions: MdmOptions = frontMatter(origin).attributes;
    console.log("mailOptions", mailOptions);

    const html = md.render(origin);

    await callMailer(html, mailOptions);

    vscode.window.showInformationMessage(
      `Send to ${mailOptions.host}:${mailOptions.port}`
    );
  });

  context.subscriptions.push(send);
}

export function deactivate() {
  console.log("deactivate");
}
