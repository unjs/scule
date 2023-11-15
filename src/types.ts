type Assert<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

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
  Y extends string,
> = IsUpper<X> extends IsUpper<Y>
  ? true
  : IsLower<X> extends IsLower<Y>
    ? true
    : false;
type CapitalizedWords<
  T extends readonly string[],
  Accumulator extends string = "",
> = T extends readonly [infer F extends string, ...infer R extends string[]]
  ? CapitalizedWords<R, `${Accumulator}${Capitalize<F>}`>
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type __tests = [
  // SplitByCase
  Assert<Equal<SplitByCase<string>, string[]>>,
  // default splitters
  Assert<Equal<SplitByCase<"">, []>>,
  Assert<Equal<SplitByCase<"foo">, ["foo"]>>,
  Assert<Equal<SplitByCase<"foo_bar-baz/qux">, ["foo", "bar", "baz", "qux"]>>,
  Assert<Equal<SplitByCase<"foo--bar-Baz">, ["foo", "", "bar", "Baz"]>>,
  Assert<Equal<SplitByCase<"foo123-bar">, ["foo123", "bar"]>>,
  Assert<Equal<SplitByCase<"fooBar">, ["foo", "Bar"]>>,
  Assert<Equal<SplitByCase<"fooBARBaz">, ["foo", "BAR", "Baz"]>>,
  Assert<Equal<SplitByCase<"FOOBar">, ["FOO", "Bar"]>>,
  Assert<Equal<SplitByCase<"ALink">, ["A", "Link"]>>,
  // custom splitters
  Assert<
    Equal<
      SplitByCase<"foo\\Bar.fuzz-FIZz", "\\" | "." | "-">,
      ["foo", "Bar", "fuzz", "FI", "Zz"]
    >
  >,

  // PascalCase
  Assert<Equal<PascalCase<string>, string>>,
  Assert<Equal<PascalCase<string[]>, string>>,
  // string
  Assert<Equal<PascalCase<"">, "">>,
  Assert<Equal<PascalCase<"foo">, "Foo">>,
  Assert<Equal<PascalCase<"foo-bAr">, "FooBAr">>,
  Assert<Equal<PascalCase<"FooBARb">, "FooBARb">>,
  Assert<Equal<PascalCase<"foo_bar-baz/qux">, "FooBarBazQux">>,
  Assert<Equal<PascalCase<"foo--bar-Baz">, "FooBarBaz">>,
  // array
  Assert<Equal<PascalCase<["foo", "Bar"]>, "FooBar">>,
  Assert<
    Equal<PascalCase<["foo", "Bar", "fuzz", "FI", "Zz"]>, "FooBarFuzzFIZz">
  >,

  // CamelCase
  Assert<Equal<CamelCase<string>, string>>,
  Assert<Equal<CamelCase<string[]>, string>>,
  // string
  Assert<Equal<CamelCase<"">, "">>,
  Assert<Equal<CamelCase<"foo">, "foo">>,
  Assert<Equal<CamelCase<"FooBARb">, "fooBARb">>,
  Assert<Equal<CamelCase<"foo_bar-baz/qux">, "fooBarBazQux">>,
  // array
  Assert<Equal<CamelCase<["Foo", "Bar"]>, "fooBar">>,

  // JoinByCase
  Assert<Equal<JoinByCase<string, "-">, string>>,
  Assert<Equal<JoinByCase<string[], "-">, string>>,
  // string
  Assert<Equal<JoinByCase<"", "-">, "">>,
  Assert<Equal<JoinByCase<"foo", "-">, "foo">>,
  Assert<Equal<JoinByCase<"FooBARb", "-">, "foo-ba-rb">>,
  Assert<Equal<JoinByCase<"foo_bar-baz/qux", "-">, "foo-bar-baz-qux">>,
  // array
  Assert<Equal<JoinByCase<["Foo", "Bar"], "-">, "foo-bar">>,
];
/* eslint-enable @typescript-eslint/no-unused-vars */
