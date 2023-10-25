type Splitter = "-" | "_" | "/" | ".";
type FirstOfString<S extends string> = S extends `${infer F}${string}`
  ? F
  : never;
type RemoveFirstOfString<S extends string> = S extends `${string}${infer R}`
  ? R
  : never;
type IsUpper<S extends string> = S extends Uppercase<S> ? true : false;
type IsLower<S extends string> = S extends Lowercase<S> ? true : false;
type SameLetterCase<
  X extends string,
  Y extends string
> = IsUpper<X> extends IsUpper<Y>
  ? true
  : IsLower<X> extends IsLower<Y>
  ? true
  : false;
type CapitalizedWords<
  T extends readonly string[],
  Accumulator extends string = ""
> = T extends readonly [infer F extends string, ...infer R extends string[]]
  ? CapitalizedWords<R, `${Accumulator}${Capitalize<F>}`>
  : Accumulator;
type JoinLowercaseWords<
  T extends readonly string[],
  Joiner extends string,
  Accumulator extends string = ""
> = T extends readonly [infer F extends string, ...infer R extends string[]]
  ? Accumulator extends ""
    ? JoinLowercaseWords<R, Joiner, `${Accumulator}${Lowercase<F>}`>
    : JoinLowercaseWords<R, Joiner, `${Accumulator}${Joiner}${Lowercase<F>}`>
  : Accumulator;

type LastOfArray<T extends any[]> = T extends [...any, infer R] ? R : never;
type RemoveLastOfArray<T extends any[]> = T extends [...infer F, any]
  ? F
  : never;

export type SplitByCase<
  T,
  Separator extends string = Splitter,
  Accumulator extends unknown[] = []
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
          [...RemoveLastOfArray<Accumulator>, `${LastOfArray<Accumulator>}${F}`]
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
              `${LastOfArray<Accumulator>}${F}`
            ]
          >
      : IsLower<F> extends true
      ? SplitByCase<
          RemoveFirstOfString<R>,
          Separator,
          [
            ...RemoveLastOfArray<Accumulator>,
            `${LastOfArray<Accumulator>}${F}`,
            FirstOfString<R>
          ]
        >
      : SplitByCase<R, Separator, [...Accumulator, F]>
    : never
  : Accumulator extends []
  ? T extends ""
    ? []
    : string[]
  : Accumulator;

export type PascalCase<T> = string extends T
  ? string
  : string[] extends T
  ? string
  : T extends string
  ? SplitByCase<T> extends readonly string[]
    ? CapitalizedWords<SplitByCase<T>>
    : never
  : T extends readonly string[]
  ? CapitalizedWords<T>
  : never;

export type CamelCase<T> = string extends T
  ? string
  : string[] extends T
  ? string
  : Uncapitalize<PascalCase<T>>;

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
