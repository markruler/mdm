import { promises as fs } from "fs";

export async function read(markdown: string) {
  try {
    return await fs.readFile(markdown, { encoding: "utf8" });
  } catch (err) {
    console.error(err);
  }
}
