# Markdown Mail

Command `>mdm: Send markdown to mail` sends markdown file to mail.

## Front Matter

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

## Contributing

```sh
code mdm
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
