import * as assert from "assert";
import { UserOption } from "../../extension";

import { readMailOptions } from "../../reader";

suite("Reader Test Suite", () => {
  test("Read front matter", async () => {
    const option: UserOption = await readMailOptions(`---
host: mail.example.com
port: 25
from: from@example.com
to: to@example.com
subject: "[This] is email subject"
---

# This is email body
`);
    assert.strictEqual(option.host, "mail.example.com");
    assert.strictEqual(option.port, 25);
    assert.strictEqual(option.from, "from@example.com");
    assert.strictEqual(option.to, "to@example.com");
    assert.strictEqual(option.subject, "[This] is email subject");
  });
});
