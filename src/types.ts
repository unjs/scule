type Whitespace =
  | "\u{9}" // '\t'
  | "\u{A}" // '\n'
  | "\u{B}" // '\v'
  | "\u{C}" // '\f'
  | "\u{D}" // '\r'
  | "\u{20}" // ' '
  | "\u{85}"
  | "\u{A0}"
  | "\u{1680}"
  | "\u{2000}"
  | "\u{2001}"
  | "\u{2002}"
  | "\u{2003}"
  | "\u{2004}"
  | "\u{2005}"
  | "\u{2006}"
  | "\u{2007}"
  | "\u{2008}"
  | "\u{2009}"
  | "\u{200A}"
  | "\u{2028}"
  | "\u{2029}"
  | "\u{202F}"
  | "\u{205F}"
  | "\u{3000}"
  | "\u{FEFF}";

type Splitter = "-" | "_" | "/" | "." | Whitespace;
type FirstOfString<S extends string> = S extends `${infer F}${string}`
  ? F
  : never;
type RemoveFirstOfString<S extends string> = S extends `${string}${infer R}`
  ? R
  : never;
type IsUpper<S extends string> = S extends Uppercase<S> ? true : false;
type IsLower<S extends string> = S extends Lowercase<S> ? true : false;
type SameLetterCase<X extends string, Y extends string> =
  IsUpper<X> extends IsUpper<Y>
    ? true
    : IsLower<X> extends IsLower<Y>
      ? true
      : false;
type CapitalizedWords<
  T extends readonly string[],
  Accumulator extends string = "",
  Normalize extends boolean | undefined = false,
> = T extends readonly [infer F extends string, ...infer R extends string[]]
  ? CapitalizedWords<
      R,
      `${Accumulator}${Capitalize<Normalize extends true ? Lowercase<F> : F>}`,
      Normalize
    >
  : Accumulator;
type JoinLowercaseWords<
  T extends readonly string[],
  Joiner extends string,
  Accumulator extends string = "",
> = T extends readonly [infer F extends string, ...infer R extends string[]]
  ? Accumulator extends ""
    ? JoinLowercaseWords<R, Joiner, `${Accumulator}${Lowercase<F>}`>
    : JoinLowercaseWords<R, Joiner, `${Accumulator}${Joiner}${Lowercase<F>}`>
  : Accumulator;

type LastOfArray<T extends any[]> = T extends [...any, infer R] ? R : never;
type RemoveLastOfArray<T extends any[]> = T extends [...infer F, any]
  ? F
  : never;

export type CaseOptions = {
  normalize?: boolean;
};

export type SplitByCase<
  T,
  Separator extends string = Splitter,
  Accumulator extends unknown[] = [],
> = string extends Separator
  ? string[]
  : T extends `${infer F}${infer R}`
    ? [LastOfArray<Accumulator>] extends [never]
      ? SplitByCase<R, Separator, [F]>
      : LastOfArray<Accumulator> extends string
        ? R extends ""
          ? SplitByCase<
              R,
              Separator,
              [
                ...RemoveLastOfArray<Accumulator>,
                `${LastOfArray<Accumulator>}${F}`,
              ]
            >
          : SameLetterCase<F, FirstOfString<R>> extends true
            ? F extends Separator
              ? FirstOfString<R> extends Separator
                ? SplitByCase<R, Separator, [...Accumulator, ""]>
                : IsUpper<FirstOfString<R>> extends true
                  ? SplitByCase<
                      RemoveFirstOfString<R>,
                      Separator,
                      [...Accumulator, FirstOfString<R>]
                    >
                  : SplitByCase<R, Separator, [...Accumulator, ""]>
              : SplitByCase<
                  R,
                  Separator,
                  [
                    ...RemoveLastOfArray<Accumulator>,
                    `${LastOfArray<Accumulator>}${F}`,
                  ]
                >
            : IsLower<F> extends true
              ? SplitByCase<
                  RemoveFirstOfString<R>,
                  Separator,
                  [
                    ...RemoveLastOfArray<Accumulator>,
                    `${LastOfArray<Accumulator>}${F}`,
                    FirstOfString<R>,
                  ]
                >
              : SplitByCase<R, Separator, [...Accumulator, F]>
        : never
    : Accumulator extends []
      ? T extends ""
        ? []
        : string[]
      : Accumulator;

export type JoinByCase<T, Joiner extends string> = string extends T
  ? string
  : string[] extends T
    ? string
    : T extends string
      ? SplitByCase<T> extends readonly string[]
        ? JoinLowercaseWords<SplitByCase<T>, Joiner>
        : never
      : T extends readonly string[]
        ? JoinLowercaseWords<T, Joiner>
        : never;

export type PascalCase<
  T,
  Normalize extends boolean | undefined = false,
> = string extends T
  ? string
  : string[] extends T
    ? string
    : T extends string
      ? SplitByCase<T> extends readonly string[]
        ? CapitalizedWords<SplitByCase<T>, "", Normalize>
        : never
      : T extends readonly string[]
        ? CapitalizedWords<T, "", Normalize>
        : never;

export type CamelCase<
  T,
  Normalize extends boolean | undefined = false,
> = string extends T
  ? string
  : string[] extends T
    ? string
    : Uncapitalize<PascalCase<T, Normalize>>;

export type KebabCase<
  T extends string | readonly string[],
  Joiner extends string = "-",
> = JoinByCase<T, Joiner>;

export type SnakeCase<T extends string | readonly string[]> = JoinByCase<
  T,
  "_"
>;

export type TrainCase<
  T,
  Normalize extends boolean | undefined = false,
  Joiner extends string = "-",
> = string extends T
  ? string
  : string[] extends T
    ? string
    : T extends string
      ? SplitByCase<T> extends readonly string[]
        ? CapitalizedWords<SplitByCase<T>, Joiner>
        : never
      : T extends readonly string[]
        ? CapitalizedWords<T, Joiner, Normalize>
        : never;

export type FlatCase<
  T extends string | readonly string[],
  Joiner extends string = "",
> = JoinByCase<T, Joiner>;