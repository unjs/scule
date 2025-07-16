import { describe, test, assertType, expectTypeOf } from "vitest";
import type {
  SplitByCase,
  PascalCase,
  CamelCase,
  JoinByCase,
  TrainCase,
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
    assertType<SplitByCase<"Foo Bar Baz">>(["Foo", "Bar", "Baz"]);
    assertType<SplitByCase<"-Bar Baz">>(["Bar", "Baz"]);
    assertType<SplitByCase<" Bar Baz">>(["Bar", "Baz"]);
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
    assertType<PascalCase<"FooBarBaz", true>>("FooBarBaz");
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
    assertType<CamelCase<"fooBarBaz", true>>("fooBarBaz");
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
    assertType<JoinByCase<"foo-bar-baz", "-">>("foo-bar-baz");
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
    assertType<TrainCase<"f">>("F");
    assertType<TrainCase<"foo">>("Foo");
    assertType<TrainCase<"foo-bAr">>("Foo-B-Ar");
    assertType<TrainCase<"AcceptCH">>("Accept-CH");
    assertType<TrainCase<"foo_bar-baz/qux">>("Foo-Bar-Baz-Qux");
    assertType<TrainCase<"FOO_BAR">>("FOO-BAR");
    // @ts-expect-error - splitByCase result may contain empty string
    assertType<TrainCase<"foo--bar-Baz">>("Foo-Bar-Baz");
    assertType<TrainCase<"WWW-authenticate">>("WWW-Authenticate");
    assertType<TrainCase<"WWWAuthenticate">>("WWW-Authenticate");
    assertType<TrainCase<"Foo-B-Ar">>("Foo-B-Ar");
  });

  test("array", () => {
    assertType<TrainCase<[]>>("");
    assertType<TrainCase<["foo", "bar"]>>("Foo-Bar");
  });
});

describe("TitleCase", () => {
  test("string", () => {
    assertType<TrainCase<"">>("");
    assertType<TrainCase<"f", false, " ">>("F");
    assertType<TrainCase<"foo", false, " ">>("Foo");
    assertType<TrainCase<"foo-bAr", false, " ">>("Foo B Ar");
    assertType<TrainCase<"AcceptCH", false, " ">>("Accept CH");
    assertType<TrainCase<"foo_bar-baz/qux", false, " ">>("Foo Bar Baz Qux");
    assertType<TrainCase<"FOO_BAR", false, " ">>("FOO BAR");
    // @ts-expect-error - splitByCase result may contain empty string
    assertType<TrainCase<"foo--bar-Baz", false, " ">>("Foo Bar Baz");
    assertType<TrainCase<"WWW-authenticate", false, " ">>("WWW Authenticate");
    assertType<TrainCase<"WWWAuthenticate", false, " ">>("WWW Authenticate");
    assertType<TrainCase<"Foo-B-Ar", false, " ">>("Foo B Ar");
  });

  test("array", () => {
    assertType<TrainCase<[]>>("");
    assertType<TrainCase<["foo", "bar"], false, " ">>("Foo Bar");
  });
});
