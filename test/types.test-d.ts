import { describe, test, assertType, expectTypeOf } from "vitest";
import type {
  SplitByCase,
  PascalCase,
  CamelCase,
  JoinByCase,
} from "../src/types";

describe("SplitByCase", () => {
  test("types", () => {
    expectTypeOf<SplitByCase<string>>().toEqualTypeOf<string[]>();
  });

  test("default splitters", () => {
    assertType<SplitByCase<"">>([]);
    assertType<SplitByCase<"foo">>(["foo"]);
    assertType<SplitByCase<"foo_bar-baz/qux">>(["foo", "bar", "baz", "qux"]);
    assertType<SplitByCase<"foo--bar-Baz">>(["foo", "", "bar", "Baz"]);
    assertType<SplitByCase<"foo123-bar">>(["foo123", "bar"]);
    assertType<SplitByCase<"fooBar">>(["foo", "Bar"]);
    assertType<SplitByCase<"fooBARBaz">>(["foo", "BAR", "Baz"]);
    assertType<SplitByCase<"FOOBar">>(["FOO", "Bar"]);
    assertType<SplitByCase<"ALink">>(["A", "Link"]);
    assertType<SplitByCase<"FOO_BAR">>(["FOO", "BAR"]);
  });

  test("custom splitters", () => {
    assertType<SplitByCase<"foo\\Bar.fuzz-FIZz", "\\" | "." | "-">>([
      "foo",
      "Bar",
      "fuzz",
      "FI",
      "Zz",
    ]);
  });
});

describe("PascalCase", () => {
  test("types", () => {
    expectTypeOf<PascalCase<string>>().toEqualTypeOf<string>();
    expectTypeOf<PascalCase<string[]>>().toEqualTypeOf<string>();
  });

  test("string", () => {
    assertType<PascalCase<"">>("");
    assertType<PascalCase<"foo">>("Foo");
    assertType<PascalCase<"foo-bAr">>("FooBAr");
    assertType<PascalCase<"FooBARb">>("FooBaRb");
    assertType<PascalCase<"foo_bar-baz/qux">>("FooBarBazQux");
    assertType<PascalCase<"foo--bar-Baz">>("FooBarBaz");
    assertType<PascalCase<"FOO_BAR">>("FooBar");
  });

  test("array", () => {
    assertType<PascalCase<["foo", "Bar"]>>("FooBar");
    assertType<PascalCase<["foo", "Bar", "fuzz", "FI", "Zz"]>>(
      "FooBarFuzzFiZz",
    );
  });
});

describe("CamelCase", () => {
  test("types", () => {
    expectTypeOf<CamelCase<string>>().toEqualTypeOf<string>();
    expectTypeOf<CamelCase<string[]>>().toEqualTypeOf<string>();
  });

  test("string", () => {
    assertType<CamelCase<"">>("");
    assertType<CamelCase<"foo">>("foo");
    assertType<CamelCase<"FooBARb">>("fooBaRb");
    assertType<CamelCase<"foo_bar-baz/qux">>("fooBarBazQux");
    assertType<CamelCase<"FOO_BAR">>("fooBar");
  });

  test("array", () => {
    assertType<CamelCase<["Foo", "Bar"]>>("fooBar");
  });
});

describe("JoinByCase", () => {
  test("types", () => {
    expectTypeOf<JoinByCase<string, "-">>().toEqualTypeOf<string>();
    expectTypeOf<JoinByCase<string[], "-">>().toEqualTypeOf<string>();
  });

  test("string", () => {
    assertType<JoinByCase<"", "-">>("");
    assertType<JoinByCase<"foo", "-">>("foo");
    assertType<JoinByCase<"FooBARb", "-">>("foo-ba-rb");
    assertType<JoinByCase<"foo_bar-baz/qux", "-">>("foo-bar-baz-qux");
  });

  test("array", () => {
    assertType<JoinByCase<["Foo", "Bar"], "-">>("foo-bar");
  });
});
