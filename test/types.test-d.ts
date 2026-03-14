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
    assertType<SplitByCase<"FOO BAR">>(["FOO", "BAR"]);
    assertType<SplitByCase<"foO BAR">>(["fo", "O", "BAR"]);
    assertType<SplitByCase<"Foo BAR">>(["Foo", "BAR"]);
    assertType<SplitByCase<"Foo bAR">>(["Foo", "b", "AR"]);
    assertType<SplitByCase<"FOO Bar">>(["FOO", "Bar"]);
  });

  test("custom splitters", () => {
    assertType<SplitByCase<"foo\\Bar.fuzz-FIZz", "\\" | "." | "-">>([
      "foo",
      "Bar",
      "fuzz",
      "FI",
      "Zz",
    ]);
    assertType<SplitByCase<"foo-bar-baz", "_">>(["foo-bar-baz"]);
  });
});

describe("PascalCase", () => {
  test("types", () => {
    expectTypeOf<PascalCase<string, true>>().toEqualTypeOf<string>();
    expectTypeOf<PascalCase<string[], true>>().toEqualTypeOf<string>();
  });

  test("string", () => {
    assertType<PascalCase<"", true>>("");
    assertType<PascalCase<"foo", true>>("Foo");
    assertType<PascalCase<"foo-bAr", true>>("FooBAr");
    assertType<PascalCase<"FooBARb", true>>("FooBaRb");
    assertType<PascalCase<"foo_bar-baz/qux", true>>("FooBarBazQux");
    assertType<PascalCase<"foo--bar-Baz", true>>("FooBarBaz");
    assertType<PascalCase<"FOO_BAR", true>>("FooBar");
  });

  test("array", () => {
    assertType<PascalCase<["foo", "Bar"], true>>("FooBar");
    assertType<PascalCase<["foo", "Bar", "fuzz", "FI", "Zz"], true>>(
      "FooBarFuzzFiZz",
    );
  });
});

describe("CamelCase", () => {
  test("types", () => {
    expectTypeOf<CamelCase<string, true>>().toEqualTypeOf<string>();
    expectTypeOf<CamelCase<string[], true>>().toEqualTypeOf<string>();
  });

  test("string", () => {
    assertType<CamelCase<"", true>>("");
    assertType<CamelCase<"foo", true>>("foo");
    assertType<CamelCase<"FooBARb", true>>("fooBaRb");
    assertType<CamelCase<"foo_bar-baz/qux", true>>("fooBarBazQux");
    assertType<CamelCase<"FOO_BAR", true>>("fooBar");
  });

  test("array", () => {
    assertType<CamelCase<["Foo", "Bar"], true>>("fooBar");
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
