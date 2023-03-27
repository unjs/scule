import { readFile, writeFile } from "node:fs/promises";
import { loadSchema } from "untyped/loader";
import { generateMarkdown } from "untyped";

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

main().catch(console.error);
