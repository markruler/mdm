# Markdown Mail

Command `>mdm: Send markdown to mail` sends markdown file to mail.

## Front Matter

### Own mail server

This follows YAML front matter.
For example, use double quotes to force a string.

```markdown
---
host: mail.example.com
port: 25
from: from@example.com
to: to@example.com
subject: "[This] is email subject"
---

# Markdown Mail
```

### Gmail

[Turn on "Less secure app access"](https://myaccount.google.com/lesssecureapps).
This setting is not available for accounts with 2-Step Verification enabled.

> [Less secure apps & your Google Account](https://support.google.com/accounts/answer/6010255?hl=en#zippy=%2Cif-less-secure-app-access-is-on-for-your-account) - Google Account Help

```markdown
---
host: smtp.gmail.com
port: 587
from: from@gmail.com
to: to@example.com
subject: "[This] is email subject"
---

# Markdown Mail
```

## Contributing

```sh
code mdm
```

```sh
rm -rf node_modules out
```

```sh
npm install
```

```sh
npm run pretest
```

## Testing

```sh
npm test
```

In VS Code, press `F5` to open a new window with your extension loaded.

## References

- [Extension API](https://code.visualstudio.com/api)
- [Your First Extention](https://code.visualstudio.com/api/get-started/your-first-extension)
- [Extension Anatomy](https://code.visualstudio.com/api/get-started/extension-anatomy)
- [Extension Guides](https://code.visualstudio.com/api/extension-guides/overview)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [What is the Simple Mail Transfer Protocol (SMTP)?](https://www.cloudflare.com/learning/email-security/what-is-smtp/)
  - [ko-kr](https://www.cloudflare.com/ko-kr/learning/email-security/what-is-smtp/)
