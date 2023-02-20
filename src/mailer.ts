import * as vscode from "vscode";
import * as nodemailer from "nodemailer";

let mailOptions = {
  from: "imcxsu@gmail.com",
  to: "imcxsu@gmail.com",
  subject: "Hello ✔",
  html: "",
};

export async function callMailer(html: string, host: string, port: number) {
  let transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: false, // true for 465, false for other ports
    auth: {
      // user: "imcxsu@gmail.com",
      // pass: account.pass
    },
  });

  mailOptions.html = html;

  await transporter.sendMail(mailOptions).then((info) => {
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
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
