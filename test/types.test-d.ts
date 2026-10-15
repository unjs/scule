import { describe, test, assertType, expectTypeOf } from "vitest";
import type {
  SplitByCase,
  PascalCase,
  CamelCase,
  JoinByCase,
  TrainCase,
  TitleCase,
} from "../src/types";
import { trainCase, titleCase } from "../src/index";

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

describe("TrainCase", () => {
  test("types", () => {
    expectTypeOf<TrainCase<string>>().toEqualTypeOf<string>();
    expectTypeOf<TrainCase<string[]>>().toEqualTypeOf<string>();
  });

  test("string", () => {
    assertType<TrainCase<"">>("");
    assertType<TrainCase<"foo">>("Foo");
    assertType<TrainCase<"foo_bar">>("Foo-Bar");
    assertType<TrainCase<"foo-bAr">>("Foo-B-Ar");
    assertType<TrainCase<"foo--bar-Baz">>("Foo-Bar-Baz");
    assertType<TrainCase<"FOO_BAR", true>>("Foo-Bar");
    assertType<TrainCase<"FOO_BAR", false>>("FOO-BAR");
    assertType<TrainCase<"foo_bar_baz", false, " ">>("Foo Bar Baz");
  });

  test("array", () => {
    assertType<TrainCase<["foo", "bar"]>>("Foo-Bar");
    assertType<TrainCase<["foo", "", "bar"]>>("Foo-Bar");
    assertType<TrainCase<["FOO", "BAR"], true>>("Foo-Bar");
    assertType<TrainCase<["foo", "bar"], false, " ">>("Foo Bar");
  });

  test("inference with options", () => {
    const res1 = trainCase("foo_bar", { normalize: true });
    expectTypeOf(res1).toEqualTypeOf<"Foo-Bar">();

    const res2 = titleCase("foo_bar", { normalize: true });
    expectTypeOf(res2).toEqualTypeOf<"Foo Bar">();

    const res3 = titleCase("foo_and_bar", { normalize: true });
    expectTypeOf(res3).toEqualTypeOf<"Foo and Bar">();
  });
});

describe("TitleCase", () => {
  test("types", () => {
    expectTypeOf<TitleCase<string>>().toEqualTypeOf<string>();
    expectTypeOf<TitleCase<string[]>>().toEqualTypeOf<string>();
  });

  test("string", () => {
    assertType<TitleCase<"">>("");
    assertType<TitleCase<"foo">>("Foo");
    assertType<TitleCase<"foo_bar">>("Foo Bar");
    assertType<TitleCase<"foo_and_bar">>("Foo and Bar");
    assertType<TitleCase<"FOO_AND_BAR", true>>("Foo and Bar");
    assertType<TitleCase<"and_foo", true>>("And Foo");
  });

  test("array", () => {
    assertType<TitleCase<["foo", "and", "bar"]>>("Foo and Bar");
    assertType<TitleCase<["FOO", "AND", "BAR"], true>>("Foo and Bar");
  });
});
