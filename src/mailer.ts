import * as vscode from "vscode";
import { SendMailOptions, createTransport } from "nodemailer";
import { UserOption } from "./extension";

/**
 * Send mail
 * @param body Mail body
 * @param mdmOptions User options
 */
export async function sendMail(body: string, mdmOptions: UserOption) {
  const transporter = createTransport({
    host: mdmOptions.host,
    port: mdmOptions.port,
    secure: mdmOptions.port === 465 ? true : false,
  });

  const options: SendMailOptions = { ...mdmOptions, html: body };

  await transporter.sendMail(options).then((info) => {
    console.log("Message sent: %s", info.response);
  });
}

/**
 * Return mail server from user input or configuration.
 * @returns mailServer (host:port)
 */
export async function getMailServer() {
  let mailServer = await vscode.window.showInputBox({
    placeHolder: "host:port",
    prompt: "Set mail server (host:port)",
  });

  if (!mailServer) {
    mailServer = vscode.workspace.getConfiguration("mdm").get("mailServer");
  }

  if (!mailServer) {
    throw new Error("mailServer is undefined");
  }

  return mailServer;
}
