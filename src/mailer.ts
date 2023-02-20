import * as vscode from "vscode";
import { SendMailOptions, createTransport } from "nodemailer";
import { MdmOptions } from "./extension";

export async function callMailer(html: string, mdmOptions: MdmOptions) {
  if (mdmOptions.host === undefined || mdmOptions.port === undefined) {
    const mailServer: string = await getMailServer();
    console.log(`mailServer: ${mailServer}`);

    const mailHostPort = mailServer.split(":");
    mdmOptions.host = mailHostPort[0];
    mdmOptions.port = parseInt(mailHostPort[1]);
  }

  let transporter = createTransport({
    host: mdmOptions.host,
    port: mdmOptions.port,
    secure: false, // true for 465, false for other ports
  });

  let options: SendMailOptions = mdmOptions;
  options.html = html;

  await transporter.sendMail(options).then((info) => {
    console.log("Message sent: %s", info.response);
  });
}

export async function getMailServer() {
  let mailServer = await vscode.window.showInputBox({
    placeHolder: "host:port",
    prompt: "Set mail server (host:port)",
  });

  mailServer =
    mailServer || vscode.workspace.getConfiguration("mdm").get("mailServer");

  if (mailServer === undefined) {
    console.log("mailServer is undefined");
    return "";
  }
  return mailServer;
}
