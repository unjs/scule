import { readFile, writeFile } from "node:fs/promises";
import { loadSchema } from "untyped/loader";
import type { Schema } from "untyped";
import { genFunctionType } from "untyped";

const MKDOCS_RE = /<!-- MKDOCS_START-->.*<!-- MKDOCS_END -->/s;
const MKDOCS_TAGS = ["<!-- MKDOCS_START-->", "<!-- MKDOCS_END -->"];

async function main() {
  const schema = await loadSchema("./src", {});
  const generatedDocs = await generateMarkdown(schema, {
    initialLevel: 3,
  });
  const readme = await readFile("./README.md", "utf8");
  const autogenSection = readme.match(MKDOCS_RE)?.[0];
  if (!autogenSection) {
    throw new Error(
      "Could not find section in README.md for auto generated docs"
    );
  }
  const newReadme = readme.replace(
    autogenSection,
    MKDOCS_TAGS[0] + "\n" + generatedDocs + "\n" + MKDOCS_TAGS[1]
  );
  await writeFile("./README.md", newReadme, "utf8");
}

export interface GenerateMarkdownOptions {
  initialLevel?: number;
}

export function generateMarkdown(
  schema: Schema,
  opts: GenerateMarkdownOptions = {}
) {
  return _generateMarkdown(schema, "", "#".repeat(opts.initialLevel || 0)).join(
    "\n"
  );
}

export function _generateMarkdown(schema: Schema, head: string, level: string) {
  const lines: string[] = [];

  if (head) {
    lines.push(`${level} ${head}`, "");
  }

  if (schema.type === "object") {
    for (const key in schema.properties) {
      const val = schema.properties[key] as Schema;
      lines.push(
        "",
        ..._generateMarkdown(val, `\`${key}\``, level + (head ? "#" : ""))
      );
    }
    return lines;
  }

  if (schema.title) {
    lines.push(schema.title, "");
  }
  if (schema.description) {
    lines.push("", schema.description, "");
  }

  // Signuture (function)
  if (schema.type === "function") {
    const name = head.replace(/`/g, "").trim();
    lines.push(
      "```ts",
      `import { ${name} } from "scule"`,
      "",
      `${name} (${schema.args?.map((arg) => arg.name).join(", ")})`,
      "```"
    );
  }

  return lines;
}

main().catch(console.error);
