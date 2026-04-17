import { readFileSync } from "node:fs";

const filePath = process.argv[2];

if (!filePath) {
  process.exit(1);
}

const content = readFileSync(filePath, "utf8");

content.split(/\r?\n/).forEach((line, index) => {
  process.stdout.write(`${index + 1}:${line}\n`);
});
