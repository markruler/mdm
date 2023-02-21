import * as vscode from "vscode";
import * as MarkdownIt from "markdown-it";
import { getMailServer, sendMail } from "./mailer";
import { read, readMailOptions } from "./reader";

export interface UserOption {
  host: string; // mail.example.com
  port: number; // 25, 465, 587
  from: string; // from@example.com
  to: string; // to@example.com
  subject: string; // Title
}

/**
 * Send markdown to mail server
 */
async function sendMarkdown() {
  const markdown: MarkdownIt = new MarkdownIt().use(
    // Remove front matter
    require("markdown-it-front-matter"),
    function (frontMatter: string) {
      console.log(frontMatter);
    }
  );

  if (!vscode.window.activeTextEditor) {
    return; // no editor
  }

  const { document } = vscode.window.activeTextEditor;

  const scheme = document.uri.scheme;
  if (!scheme || scheme !== "file") {
    return; // not a file
  }
  console.log(`current file ${document.uri}`);

  const originalText: string = (await read(document.uri)) || "";
  const userOption: UserOption = await readMailOptions(originalText);
  console.log("User Option", userOption);

  if (!userOption.host || !userOption.port) {
    const mailServer: string = await getMailServer();
    console.log(`mailServer: ${mailServer}`);

    const mailHostPort = mailServer.split(":");
    userOption.host = mailHostPort[0];
    userOption.port = parseInt(mailHostPort[1]);
  }

  const html = markdown.render(originalText);

  await sendMail(html, userOption);

  vscode.window.showInformationMessage(
    `Send to ${userOption.host}:${userOption.port}`
  );
}

/**
 * Activate extension
 * @param context Extension context
 */
export async function activate(context: vscode.ExtensionContext) {
  console.log("Activate MDM");

  let send = vscode.commands.registerCommand("mdm.send", () => sendMarkdown());
  context.subscriptions.push(send);
}

/**
 * Deactivate extension
 */
export function deactivate() {
  console.log("Deactivate MDM");
}
