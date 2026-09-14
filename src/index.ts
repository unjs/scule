import type {
  CamelCase,
  CapitalCase,
  KebabCase,
  PascalCase,
  SnakeCase,
  SplitByCase,
  CaseOptions,
  TrainCase,
  FlatCase,
} from "./types";

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."] as const;

function _getCaseOptions(
  opts?: CaseOptions | string | string[],
  locale?: string | string[],
): CaseOptions {
  if (typeof opts === "string" || Array.isArray(opts)) {
    return { locale: opts };
  }
  return {
    ...opts,
    locale: locale ?? opts?.locale,
  };
}

function _getLocale(
  locale?: string | string[] | CaseOptions,
): string | string[] | undefined {
  if (!locale) {
    return undefined;
  }
  if (typeof locale === "string" || Array.isArray(locale)) {
    return locale;
  }
  return locale.locale;
}

export function isUppercase(
  char = "",
  locale?: string | string[],
): boolean | undefined {
  if (NUMBER_CHAR_RE.test(char)) {
    return undefined;
  }
  return char !== char.toLocaleLowerCase(locale);
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

export function upperFirst<S extends string>(
  str: S,
  locale?: string | string[] | CaseOptions,
): Capitalize<S> {
  const loc = _getLocale(locale);
  return (
    str ? str[0].toLocaleUpperCase(loc) + str.slice(1) : ""
  ) as Capitalize<S>;
}

export function lowerFirst<S extends string>(
  str: S,
  locale?: string | string[] | CaseOptions,
): Uncapitalize<S> {
  const loc = _getLocale(locale);
  return (
    str ? str[0].toLocaleLowerCase(loc) + str.slice(1) : ""
  ) as Uncapitalize<S>;
}

export function pascalCase(): "";
export function pascalCase<
  T extends string | readonly string[],
  UserCaseOptions extends CaseOptions = CaseOptions,
>(str: T, opts?: UserCaseOptions): PascalCase<T, UserCaseOptions["normalize"]>;
export function pascalCase<T extends string | readonly string[]>(
  str: T,
  locale?: string | string[],
): PascalCase<T>;
export function pascalCase<
  T extends string | readonly string[],
  UserCaseOptions extends CaseOptions = CaseOptions,
>(
  str: T,
  opts?: UserCaseOptions,
  locale?: string | string[],
): PascalCase<T, UserCaseOptions["normalize"]>;
export function pascalCase<
  T extends string | readonly string[],
  UserCaseOptions extends CaseOptions = CaseOptions,
>(
  str?: T,
  opts?: UserCaseOptions | string | string[],
  locale?: string | string[],
) {
  if (!str) {
    return "";
  }
  const options = _getCaseOptions(opts, locale);
  return (Array.isArray(str) ? str : splitByCase(str as string))
    .map((p) =>
      upperFirst(
        options.normalize ? p.toLocaleLowerCase(options.locale) : p,
        options.locale,
      ),
    )
    .join("") as PascalCase<T, UserCaseOptions["normalize"]>;
}

export function camelCase(): "";
export function camelCase<
  T extends string | readonly string[],
  UserCaseOptions extends CaseOptions = CaseOptions,
>(str: T, opts?: UserCaseOptions): CamelCase<T, UserCaseOptions["normalize"]>;
export function camelCase<T extends string | readonly string[]>(
  str: T,
  locale?: string | string[],
): CamelCase<T>;
export function camelCase<
  T extends string | readonly string[],
  UserCaseOptions extends CaseOptions = CaseOptions,
>(
  str: T,
  opts?: UserCaseOptions,
  locale?: string | string[],
): CamelCase<T, UserCaseOptions["normalize"]>;
export function camelCase<
  T extends string | readonly string[],
  UserCaseOptions extends CaseOptions = CaseOptions,
>(
  str?: T,
  opts?: UserCaseOptions | string | string[],
  locale?: string | string[],
) {
  if (!str) {
    return "";
  }
  const options = _getCaseOptions(opts, locale);
  return lowerFirst(pascalCase(str, options), options.locale) as CamelCase<
    T,
    UserCaseOptions["normalize"]
  >;
}

export function capitalCase(): "";
export function capitalCase<
  T extends string | readonly string[],
  UserCaseOptions extends CaseOptions = CaseOptions,
>(str: T, opts?: UserCaseOptions): CapitalCase<T, UserCaseOptions["normalize"]>;
export function capitalCase<T extends string | readonly string[]>(
  str: T,
  locale?: string | string[],
): CapitalCase<T>;
export function capitalCase<
  T extends string | readonly string[],
  UserCaseOptions extends CaseOptions = CaseOptions,
>(
  str: T,
  opts?: UserCaseOptions,
  locale?: string | string[],
): CapitalCase<T, UserCaseOptions["normalize"]>;
export function capitalCase<
  T extends string | readonly string[],
  UserCaseOptions extends CaseOptions = CaseOptions,
>(
  str?: T,
  opts?: UserCaseOptions | string | string[],
  locale?: string | string[],
) {
  if (!str) {
    return "";
  }
  const options = _getCaseOptions(opts, locale);
  return (Array.isArray(str) ? str : splitByCase(str as string))
    .filter(Boolean)
    .map((p) =>
      upperFirst(
        options.normalize ? p.toLocaleLowerCase(options.locale) : p,
        options.locale,
      ),
    )
    .join(" ") as CapitalCase<T, UserCaseOptions["normalize"]>;
}

export function kebabCase(): "";
export function kebabCase<T extends string | readonly string[]>(
  str: T,
  opts?: CaseOptions | string[],
  locale?: string | string[],
): KebabCase<T>;
export function kebabCase<
  T extends string | readonly string[],
  Joiner extends string,
>(str: T, joiner: Joiner, locale?: string | string[]): KebabCase<T, Joiner>;
export function kebabCase<
  T extends string | readonly string[],
  Joiner extends string,
>(
  str?: T,
  joiner?: Joiner | CaseOptions | string[],
  locale?: string | string[],
) {
  if (!str) {
    return "";
  }
  let resolvedJoiner = "-";
  let resolvedLocale: string | string[] | undefined;

  if (Array.isArray(joiner)) {
    resolvedLocale = joiner;
  } else if (typeof joiner === "object" && joiner !== null) {
    resolvedLocale = joiner.locale;
  } else if (typeof joiner === "string") {
    resolvedJoiner = joiner;
    resolvedLocale = locale;
  } else {
    resolvedLocale = locale;
  }

  return (Array.isArray(str) ? str : splitByCase(str as string))
    .map((p) => p.toLocaleLowerCase(resolvedLocale))
    .join(resolvedJoiner) as KebabCase<T, Joiner>;
}

export function snakeCase(): "";
export function snakeCase<T extends string | readonly string[]>(
  str: T,
  opts?: CaseOptions | string | string[],
  locale?: string | string[],
): SnakeCase<T>;
export function snakeCase<T extends string | readonly string[]>(
  str?: T,
  opts?: CaseOptions | string | string[],
  locale?: string | string[],
) {
  if (!str) {
    return "";
  }
  const options = _getCaseOptions(opts, locale);
  return kebabCase(str, "_", options.locale) as SnakeCase<T>;
}

export function flatCase(): "";
export function flatCase<T extends string | readonly string[]>(
  str: T,
  opts?: CaseOptions | string | string[],
  locale?: string | string[],
): FlatCase<T>;
export function flatCase<T extends string | readonly string[]>(
  str?: T,
  opts?: CaseOptions | string | string[],
  locale?: string | string[],
) {
  if (!str) {
    return "";
  }
  const options = _getCaseOptions(opts, locale);
  return kebabCase(str, "", options.locale) as FlatCase<T>;
}

export function trainCase(): "";
export function trainCase<
  T extends string | readonly string[],
  UserCaseOptions extends CaseOptions = CaseOptions,
>(str: T, opts?: UserCaseOptions): TrainCase<T, UserCaseOptions["normalize"]>;
export function trainCase<T extends string | readonly string[]>(
  str: T,
  locale?: string | string[],
): TrainCase<T>;
export function trainCase<
  T extends string | readonly string[],
  UserCaseOptions extends CaseOptions = CaseOptions,
>(
  str: T,
  opts?: UserCaseOptions,
  locale?: string | string[],
): TrainCase<T, UserCaseOptions["normalize"]>;
export function trainCase<
  T extends string | readonly string[],
  UserCaseOptions extends CaseOptions = CaseOptions,
>(
  str?: T,
  opts?: UserCaseOptions | string | string[],
  locale?: string | string[],
) {
  if (!str) {
    return "";
  }
  const options = _getCaseOptions(opts, locale);
  return (Array.isArray(str) ? str : splitByCase(str as string))
    .filter(Boolean)
    .map((p) =>
      upperFirst(
        options.normalize ? p.toLocaleLowerCase(options.locale) : p,
        options.locale,
      ),
    )
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
export function titleCase<T extends string | readonly string[]>(
  str: T,
  locale?: string | string[],
): TrainCase<T, false, " ">;
export function titleCase<
  T extends string | readonly string[],
  UserCaseOptions extends CaseOptions = CaseOptions,
>(
  str: T,
  opts?: UserCaseOptions,
  locale?: string | string[],
): TrainCase<T, UserCaseOptions["normalize"], " ">;
export function titleCase<
  T extends string | readonly string[],
  UserCaseOptions extends CaseOptions = CaseOptions,
>(
  str?: T,
  opts?: UserCaseOptions | string | string[],
  locale?: string | string[],
) {
  if (!str) {
    return "";
  }
  const options = _getCaseOptions(opts, locale);
  return (Array.isArray(str) ? str : splitByCase(str as string))
    .filter(Boolean)
    .map((p) =>
      titleCaseExceptions.test(p)
        ? p.toLocaleLowerCase(options.locale)
        : upperFirst(
            options.normalize ? p.toLocaleLowerCase(options.locale) : p,
            options.locale,
          ),
    )
    .join(" ") as TrainCase<T, UserCaseOptions["normalize"], " ">;
}

export * from "./types";
