import type {
  CamelCase,
  KebabCase,
  PascalCase,
  SnakeCase,
  SplitByCase,
  CaseOptions,
  TrainCase,
  FlatCase,
} from "./types";

const NUMBER_CHAR_RE = /\d/;
const UPPERCASE_RE = /\p{Lu}/u;
const LOWERCASE_RE = /\p{Ll}/u;
const CASE_FALLING_RE = /^([\s\S]+)([\s\S])$/u;
const STR_SPLITTERS = ["-", "_", "/", "."] as const;

export function isUppercase(char = ""): boolean | undefined {
  if (NUMBER_CHAR_RE.test(char)) {
    return undefined;
  }
  if (UPPERCASE_RE.test(char)) {
    return true;
  }
  if (LOWERCASE_RE.test(char)) {
    return false;
  }
  return char !== char.toLowerCase();
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
      if (previousUpper === true && isUpper === false) {
        const match = buff.match(CASE_FALLING_RE);
        if (match) {
          parts.push(match[1]);
          buff = match[2] + char;
          previousUpper = isUpper;
          continue;
        }
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
export function pascalCase<
  T extends string | readonly string[],
  UserCaseOptions extends CaseOptions = CaseOptions,
>(str: T, opts?: CaseOptions): PascalCase<T, UserCaseOptions["normalize"]>;
export function pascalCase<
  T extends string | readonly string[],
  UserCaseOptions extends CaseOptions = CaseOptions,
>(str?: T, opts?: UserCaseOptions) {
  return str
    ? ((Array.isArray(str) ? str : splitByCase(str as string))
        .map((p) => upperFirst(opts?.normalize ? p.toLowerCase() : p))
        .join("") as PascalCase<T, UserCaseOptions["normalize"]>)
    : "";
}

export function camelCase(): "";
export function camelCase<
  T extends string | readonly string[],
  UserCaseOptions extends CaseOptions = CaseOptions,
>(str: T, opts?: UserCaseOptions): CamelCase<T, UserCaseOptions["normalize"]>;
export function camelCase<
  T extends string | readonly string[],
  UserCaseOptions extends CaseOptions = CaseOptions,
>(str?: T, opts?: UserCaseOptions) {
  return lowerFirst(pascalCase(str || "", opts)) as CamelCase<
    T,
    UserCaseOptions["normalize"]
  >;
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

export function flatCase(): "";
export function flatCase<T extends string | readonly string[]>(
  str: T,
): FlatCase<T>;
export function flatCase<T extends string | readonly string[]>(str?: T) {
  return kebabCase(str || "", "") as FlatCase<T>;
}

export function trainCase(): "";
export function trainCase<
  T extends string | readonly string[],
  UserCaseOptions extends CaseOptions = CaseOptions,
>(str: T, opts?: UserCaseOptions): TrainCase<T, UserCaseOptions["normalize"]>;
export function trainCase<
  T extends string | readonly string[],
  UserCaseOptions extends CaseOptions = CaseOptions,
>(str?: T, opts?: UserCaseOptions) {
  return (Array.isArray(str) ? str : splitByCase(str as string))
    .filter(Boolean)
    .map((p) => upperFirst(opts?.normalize ? p.toLowerCase() : p))
    .join("-") as TrainCase<T, UserCaseOptions["normalize"]>;
}

const titleCaseExceptions =
  /^(a|an|and|as|at|but|by|for|if|in|is|nor|of|on|or|the|to|with)$/i;

export function titleCase(): "";
export function titleCase<
  T extends string | readonly string[],
  UserCaseOptions extends CaseOptions = CaseOptions,
>(
  str: T,
  opts?: UserCaseOptions,
): TrainCase<T, UserCaseOptions["normalize"], " ">;
export function titleCase<
  T extends string | readonly string[],
  UserCaseOptions extends CaseOptions = CaseOptions,
>(str?: T, opts?: UserCaseOptions) {
  return (Array.isArray(str) ? str : splitByCase(str as string))
    .filter(Boolean)
    .map((p) =>
      titleCaseExceptions.test(p)
        ? p.toLowerCase()
        : upperFirst(opts?.normalize ? p.toLowerCase() : p),
    )
    .join(" ") as TrainCase<T, UserCaseOptions["normalize"]>;
}

export * from "./types";
