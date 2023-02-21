import * as vscode from "vscode";
import { SendMailOptions, createTransport } from "nodemailer";
import { UserOption } from "./extension";

/**
 * Send mail
 * @param body Mail body
 * @param userOption User options
 */
export async function sendMail(body: string, userOption: UserOption) {
  let password;
  if (userOption.host === "smtp.gmail.com") {
    password = await vscode.window.showInputBox({
      placeHolder: "********",
      prompt: "Gmail password",
      password: true,
    });
  }

  const transporter = createTransport({
    host: userOption.host,
    port: userOption.port,
    secure: userOption.port === 465 ? true : false,
    auth: {
      user: userOption.from,
      pass: password,
    }
  });

  const options: SendMailOptions = { ...userOption, html: body };

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
