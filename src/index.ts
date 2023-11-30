import type {
  CamelCase,
  KebabCase,
  PascalCase,
  SnakeCase,
  SplitByCase,
  CaseOptions,
} from "./types";

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."] as const;

export function isUppercase(char = ""): boolean | undefined {
  if (NUMBER_CHAR_RE.test(char)) {
    return undefined;
  }
  return char.toUpperCase() === char;
}

export function splitByCase<T extends string>(str: T): SplitByCase<T>;
export function splitByCase<
  T extends string,
  Separator extends readonly string[],
>(str: T, separators: Separator): SplitByCase<T, Separator[number]>;
export function splitByCase<
  T extends string,
  Separator extends readonly string[],
>(str: T, separators?: Separator) {
  const splitters = separators ?? STR_SPLITTERS;
  const parts: string[] = [];

  if (!str || typeof str !== "string") {
    return parts as SplitByCase<T, Separator[number]>;
  }

  let buff = "";

  let previousUpper: boolean | undefined;
  let previousSplitter: boolean | undefined;

  for (const char of str) {
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
        const lastChar = buff.at(-1);
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

export function upperFirst<S extends string>(str: S): Capitalize<S> {
  return (str ? str[0].toUpperCase() + str.slice(1) : "") as Capitalize<S>;
}

export function lowerFirst<S extends string>(str: S): Uncapitalize<S> {
  return (str ? str[0].toLowerCase() + str.slice(1) : "") as Uncapitalize<S>;
}

export function pascalCase(): "";
export function pascalCase<T extends string | readonly string[]>(
  str: T,
  opts?: CaseOptions,
): PascalCase<T>;
export function pascalCase<T extends string | readonly string[]>(
  str?: T,
  opts?: CaseOptions,
) {
  return str
    ? ((Array.isArray(str) ? str : splitByCase(str as string))
        .map((p) => upperFirst(opts?.normalize ? p.toLowerCase() : p))
        .join("") as PascalCase<T>)
    : "";
}

export function camelCase(): "";
export function camelCase<T extends string | readonly string[]>(
  str: T,
  opts?: CaseOptions,
): CamelCase<T>;
export function camelCase<T extends string | readonly string[]>(
  str?: T,
  opts?: CaseOptions,
) {
  return lowerFirst(pascalCase(str || "", opts)) as CamelCase<T>;
}

export function kebabCase(): "";
export function kebabCase<T extends string | readonly string[]>(
  str: T,
): KebabCase<T>;
export function kebabCase<
  T extends string | readonly string[],
  Joiner extends string,
>(str: T, joiner: Joiner): KebabCase<T, Joiner>;
export function kebabCase<
  T extends string | readonly string[],
  Joiner extends string,
>(str?: T, joiner?: Joiner) {
  return str
    ? ((Array.isArray(str) ? str : splitByCase(str as string))
        .map((p) => p.toLowerCase())
        .join(joiner ?? "-") as KebabCase<T, Joiner>)
    : "";
}

export function snakeCase(): "";
export function snakeCase<T extends string | readonly string[]>(
  str: T,
): SnakeCase<T>;
export function snakeCase<T extends string | readonly string[]>(str?: T) {
  return kebabCase(str || "", "_") as SnakeCase<T>;
}

export * from "./types";
