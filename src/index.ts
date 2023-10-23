import { CamelCase, JoinByCase, PascalCase, SplitByCase } from "./types";

export type { CamelCase, JoinByCase, PascalCase, SplitByCase };

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."] as const;

export function isUppercase(char = ""): boolean | undefined {
  if (NUMBER_CHAR_RE.test(char)) {
    return undefined;
  }
  return char.toUpperCase() === char;
}

export function splitByCase<T extends string>(string_: T): SplitByCase<T>;
export function splitByCase<
  T extends string,
  Separator extends readonly string[]
>(string_: T, separators: Separator): SplitByCase<T, Separator[number]>;
export function splitByCase<
  T extends string,
  Separator extends readonly string[]
>(string_: T, separators?: Separator) {
  const splitters = separators ?? STR_SPLITTERS;
  const parts: string[] = [];

  if (!string_ || typeof string_ !== "string") {
    return parts as SplitByCase<T, Separator[number]>;
  }

  let buff = "";

  let previousUpper: boolean | undefined;
  let previousSplitter: boolean | undefined;

  for (const char of string_) {
    // Splitter
    const isSplitter = (splitters as unknown as string).includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = undefined;
      continue;
    }

    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      // Case rising edge
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      // Case falling edge
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff[buff.length - 1];
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }

    // Normal char
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }

  parts.push(buff);

  return parts as SplitByCase<T, Separator[number]>;
}

export function upperFirst<S extends string>(string_: S): Capitalize<S> {
  return (
    !string_ ? "" : string_[0].toUpperCase() + string_.slice(1)
  ) as Capitalize<S>;
}

export function lowerFirst<S extends string>(string_: S): Uncapitalize<S> {
  return (
    !string_ ? "" : string_[0].toLowerCase() + string_.slice(1)
  ) as Uncapitalize<S>;
}

export function pascalCase(): "";
export function pascalCase<T extends string | readonly string[]>(
  string_: T
): PascalCase<T>;
export function pascalCase<T extends string | readonly string[]>(string_?: T) {
  return !string_
    ? ""
    : ((Array.isArray(string_) ? string_ : splitByCase(string_ as string))
        .map((p) => upperFirst(p))
        .join("") as PascalCase<T>);
}

export function camelCase(): "";
export function camelCase<T extends string | readonly string[]>(
  string_: T
): CamelCase<T>;
export function camelCase<T extends string | readonly string[]>(string_?: T) {
  return lowerFirst(pascalCase(string_ || "")) as CamelCase<T>;
}

export type KebabCase<T extends string | readonly string[]> = JoinByCase<T, "-">

export function kebabCase(): "";
export function kebabCase<T extends string | readonly string[]>(
  string_: T
): KebabCase<T>;
export function kebabCase<
  T extends string | readonly string[],
  Joiner extends string
>(string_: T, joiner: Joiner): JoinByCase<T, Joiner>;
export function kebabCase<
  T extends string | readonly string[],
  Joiner extends string
>(string_?: T, joiner?: Joiner) {
  return !string_
    ? ""
    : ((Array.isArray(string_) ? string_ : splitByCase(string_ as string))
        .map((p) => p.toLowerCase())
        .join(joiner ?? "-") as JoinByCase<T, Joiner>);
}

export type SnakeCase<T extends string | readonly string[]> = JoinByCase<T, "_">

export function snakeCase(): "";
export function snakeCase<T extends string | readonly string[]>(
  string_: T
): SnakeCase<T>;
export function snakeCase<T extends string | readonly string[]>(string_?: T) {
  return kebabCase(string_ || "", "_") as SnakeCase<T>;
}
