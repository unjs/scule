import { CamelCase, JoinByCase, PascalCase, SplitByCase } from "./types";

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."] as const;

/**
 * If the character is a number, return undefined, otherwise return whether the character is uppercase.
 *
 * @param [input] - The character to check.
 * @returns A boolean or undefined.
 */
export function isUppercase(input = ""): boolean | undefined {
  if (NUMBER_CHAR_RE.test(input)) {
    return undefined;
  }
  return input.toUpperCase() === input;
}

export function splitByCase<T extends string>(input: T): SplitByCase<T>;
export function splitByCase<
  T extends string,
  Separator extends readonly string[]
>(input: T, separators: Separator): SplitByCase<T, Separator[number]>;
/**
 * A function that takes a string and returns an array of strings.
 * - Splits string by the splitters provided (default: ['-', '_', '/', '.'])
 * - Splits when case changes from lower to upper or upper to lower
 * - Ignores numbers for case changes
 * - Case is preserved in returned value
 * - Is an irreversible function since splitters are omitted
 */
export function splitByCase<
  T extends string,
  Separator extends readonly string[]
>(input: T, separators?: Separator) {
  const splitters = separators ?? STR_SPLITTERS;
  const parts: string[] = [];

  if (!input || typeof input !== "string") {
    return parts as SplitByCase<T, Separator[number]>;
  }

  let buff = "";

  let previousUpper: boolean | undefined;
  let previousSplitter: boolean | undefined;

  for (const char of input) {
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

/**
 * Converts first character to upper case
 *
 * @param {string} input - Input string
 * @returns A string with the first letter capitalized.
 */
export function upperFirst<S extends string>(input: S): Capitalize<S> {
  return (
    !input ? "" : input[0].toUpperCase() + input.slice(1)
  ) as Capitalize<S>;
}

/**
 * Converts first character to lower case
 *
 * @param {S} input - S
 * @returns A string with the first letter lowercased.
 */
export function lowerFirst<S extends string>(input: S): Uncapitalize<S> {
  return (
    !input ? "" : input[0].toLowerCase() + input.slice(1)
  ) as Uncapitalize<S>;
}

export function pascalCase(): "";
export function pascalCase<T extends string | readonly string[]>(
  input: T
): PascalCase<T>;
/**
 * Splits string and joins by PascalCase convention (`foo-bar` => `FooBar`)
 *
 * @remark If an uppercase letter is followed by other uppercase letters (like `FooBAR`), they are preserved
 *
 * @param {string} [input] - The string to convert to PascalCase.
 * @returns A string
 */
export function pascalCase<T extends string | readonly string[]>(input?: T) {
  return !input
    ? ""
    : ((Array.isArray(input) ? input : splitByCase(input as string))
        .map((p) => upperFirst(p))
        .join("") as PascalCase<T>);
}

export function camelCase(): "";
export function camelCase<T extends string | readonly string[]>(
  input: T
): CamelCase<T>;
/**
 * Splits string and joins by camelCase convention (`foo-bar` => `fooBar`)
 *
 * @param {string} [input] - The string to convert to camel case.
 * @returns A string or an array of strings.
 */
export function camelCase<T extends string | readonly string[]>(input?: T) {
  return lowerFirst(pascalCase(input || "")) as CamelCase<T>;
}

export function kebabCase(): "";
export function kebabCase<T extends string | readonly string[]>(
  input: T
): JoinByCase<T, "-">;
export function kebabCase<
  T extends string | readonly string[],
  Joiner extends string
>(input: T, joiner: Joiner): JoinByCase<T, Joiner>;
/**
 * Splits string and joins by kebab-case convention (`fooBar` => `foo-bar`)
 *
 * @remark It does **not** preserve case
 *
 * @param {string} [input] - The string to convert to kebab case.
 * @param {Joiner} [joiner] - The string to join the parts of the string with.
 * @returns A string
 */
export function kebabCase<
  T extends string | readonly string[],
  Joiner extends string
>(input?: T, joiner?: Joiner) {
  return !input
    ? ""
    : ((Array.isArray(input) ? input : splitByCase(input as string))
        .map((p) => p.toLowerCase())
        .join(joiner ?? "-") as JoinByCase<T, Joiner>);
}

export function snakeCase(): "";
export function snakeCase<T extends string | readonly string[]>(
  input: T
): JoinByCase<T, "_">;
/**
 * Splits string and joins by snake_case convention (`foo-bar` => `foo_bar`)
 *
 * @param {string} [input] - The string to convert to snake case.
 * @returns A string or an array of strings.
 */
export function snakeCase<T extends string | readonly string[]>(input?: T) {
  return kebabCase(input || "", "_") as JoinByCase<T, "_">;
}
