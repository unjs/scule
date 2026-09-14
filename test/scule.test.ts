import { describe, test, expect } from "vitest";
import {
  splitByCase,
  pascalCase,
  kebabCase,
  camelCase,
  capitalCase,
  upperFirst,
  lowerFirst,
  snakeCase,
  trainCase,
  flatCase,
  titleCase,
  isUppercase,
} from "../src";

describe("splitByCase", () => {
  test.each([
    ["", []],
    ["foo", ["foo"]],
    ["fooBar", ["foo", "Bar"]],
    ["FooBarBaz", ["Foo", "Bar", "Baz"]],
    ["FooBARb", ["Foo", "BA", "Rb"]],
    ["foo_bar-baz/qux", ["foo", "bar", "baz", "qux"]],
    ["foo--bar-Baz", ["foo", "", "bar", "Baz"]],
    ["FOO_BAR", ["FOO", "BAR"]],
    ["foo123-bar", ["foo123", "bar"]],
    ["FOOBar", ["FOO", "Bar"]],
    ["ALink", ["A", "Link"]],
    // with custom splitters
    [
      "foo\\Bar.fuzz-FIZz",
      ["foo", "Bar", "fuzz", "FI", "Zz"],
      ["\\", ".", "-"],
    ],
    ["new-name-value", ["new-name-value"], ["_"]],
  ])("%s => %s", (input, expected, customSplitters?) => {
    if (customSplitters) {
      expect(splitByCase(input, customSplitters)).toMatchObject(expected);
    } else {
      expect(splitByCase(input)).toMatchObject(expected);
    }
  });
});

describe("isUppercase", () => {
  test.each([
    ["A", undefined, true],
    ["a", undefined, false],
    ["1", undefined, undefined],
    ["", undefined, false],
    ["İ", "tr", true],
    ["I", "tr", true],
    ["i", "tr", false],
    ["ı", "tr", false],
  ])("%s (locale: %s) => %s", (char, locale, expected) => {
    expect(isUppercase(char, locale)).toBe(expected);
  });
});

describe("pascalCase", () => {
  test.each([
    ["", ""],
    ["foo", "Foo"],
    ["foo-bAr", "FooBAr"],
    ["FooBARb", "FooBaRb"],
    ["foo_bar-baz/qux", "FooBarBazQux"],
    ["FOO_BAR", "FooBar"],
    ["foo--bar-Baz", "FooBarBaz"],
  ])("%s => %s", (input, expected) => {
    expect(pascalCase(input, { normalize: true })).toMatchObject(expected);
  });

  test("locale", () => {
    expect(pascalCase("ibrahim-yılmaz", "tr")).toBe("İbrahimYılmaz");
    expect(pascalCase("ibrahim-yılmaz", { locale: "tr" })).toBe(
      "İbrahimYılmaz",
    );
    expect(
      pascalCase("İBRAHİM-YILMAZ", { normalize: true, locale: "tr" }),
    ).toBe("İbrahimYılmaz");
    expect(pascalCase("ibrahim-yılmaz", ["tr-TR", "tr"])).toBe("İbrahimYılmaz");
    expect(pascalCase("ibrahim-yılmaz")).toBe("IbrahimYılmaz");
  });
});

describe("camelCase", () => {
  test.each([
    ["", ""],
    ["FooBarBaz", "fooBarBaz"],
    ["FOO_BAR", "fooBar"],
  ])("%s => %s", (input, expected) => {
    expect(camelCase(input, { normalize: true })).toMatchObject(expected);
  });

  test("locale", () => {
    expect(camelCase("ibrahim-yılmaz", "tr")).toBe("ibrahimYılmaz");
    expect(camelCase("İbrahim-yılmaz", "tr")).toBe("ibrahimYılmaz");
    expect(camelCase("İbrahim-yılmaz", { locale: "tr" })).toBe("ibrahimYılmaz");
    expect(camelCase("İBRAHİM-YILMAZ", { normalize: true, locale: "tr" })).toBe(
      "ibrahimYılmaz",
    );
    expect(camelCase("IĞDIR-YILMAZ", { normalize: true, locale: "tr" })).toBe(
      "ığdırYılmaz",
    );
  });
});

describe("capitalCase", () => {
  test.each([
    ["", ""],
    ["foo", "Foo"],
    ["foo-bAr", "Foo B Ar"],
    ["FooBARb", "Foo Ba Rb"],
    ["foo_bar-baz/qux", "Foo Bar Baz Qux"],
    ["FOO_BAR", "Foo Bar"],
    ["foo--bar-Baz", "Foo Bar Baz"],
  ])("%s => %s", (input, expected) => {
    expect(capitalCase(input, { normalize: true })).toMatchObject(expected);
  });

  test("issue #91: locale support", () => {
    expect(capitalCase("benim.adım.ibrahim.yılmaz", "tr")).toBe(
      "Benim Adım İbrahim Yılmaz",
    );
    expect(capitalCase("benim.adım.ibrahim.yılmaz", { locale: "tr" })).toBe(
      "Benim Adım İbrahim Yılmaz",
    );
    expect(capitalCase("benim.adım.ibrahim.yılmaz")).toBe(
      "Benim Adım Ibrahim Yılmaz",
    );
  });
});

describe("kebabCase", () => {
  test.each([
    ["", ""],
    ["foo", "foo"],
    ["foo/Bar", "foo-bar"],
    ["foo-bAr", "foo-b-ar"],
    ["foo--bar", "foo--bar"],
    ["FooBAR", "foo-bar"],
    ["ALink", "a-link"],
    ["FOO_BAR", "foo-bar"],
  ])("%s => %s", (input, expected) => {
    expect(kebabCase(input)).toMatchObject(expected);
  });

  test("locale", () => {
    expect(kebabCase("İSTANBUL_IĞDIR", { locale: "tr" })).toBe(
      "istanbul-ığdır",
    );
    expect(kebabCase("İSTANBUL_IĞDIR", ["tr"])).toBe("istanbul-ığdır");
    expect(kebabCase("İSTANBUL_IĞDIR", "-", "tr")).toBe("istanbul-ığdır");
  });
});

describe("snakeCase", () => {
  test.each([
    ["", ""],
    ["FooBarBaz", "foo_bar_baz"],
    ["FOO_BAR", "foo_bar"],
  ])("%s => %s", (input, expected) => {
    expect(snakeCase(input)).toMatchObject(expected);
  });

  test("locale", () => {
    expect(snakeCase("İSTANBUL-IĞDIR", "tr")).toBe("istanbul_ığdır");
    expect(snakeCase("İSTANBUL-IĞDIR", { locale: "tr" })).toBe(
      "istanbul_ığdır",
    );
  });
});

describe("upperFirst", () => {
  test.each([
    ["", ""],
    ["foo", "Foo"],
    ["Foo", "Foo"],
  ])("%s => %s", (input, expected) => {
    expect(upperFirst(input)).toMatchObject(expected);
  });

  test("locale", () => {
    expect(upperFirst("istanbul", "tr")).toBe("İstanbul");
    expect(upperFirst("istanbul", { locale: "tr" })).toBe("İstanbul");
    expect(upperFirst("istanbul", ["tr-TR", "tr"])).toBe("İstanbul");
    expect(upperFirst("istanbul")).toBe("Istanbul");
  });
});

describe("lowerFirst", () => {
  test.each([
    ["", ""],
    ["foo", "foo"],
    ["Foo", "foo"],
  ])("%s => %s", (input, expected) => {
    expect(lowerFirst(input)).toMatchObject(expected);
  });

  test("locale", () => {
    expect(lowerFirst("İstanbul", "tr")).toBe("istanbul");
    expect(lowerFirst("İstanbul", { locale: "tr" })).toBe("istanbul");
    expect(lowerFirst("Iğdır", "tr")).toBe("ığdır");
    expect(lowerFirst("Iğdır")).toBe("iğdır");
  });
});

describe("trainCase", () => {
  test.each([
    ["", ""],
    ["f", "F"],
    ["foo", "Foo"],
    ["foo-bAr", "Foo-B-Ar"],
    ["AcceptCH", "Accept-CH"],
    ["foo_bar-baz/qux", "Foo-Bar-Baz-Qux"],
    ["FOO_BAR", "FOO-BAR"],
    ["foo--bar-Baz", "Foo-Bar-Baz"],
    ["WWW-authenticate", "WWW-Authenticate"],
    ["WWWAuthenticate", "WWW-Authenticate"],
  ])("%s => %s", (input, expected) => {
    expect(trainCase(input)).toMatchObject(expected);
  });

  test.each([
    ["AcceptCH", "Accept-Ch"],
    ["FOO_BAR", "Foo-Bar"],
    ["WWW-authenticate", "Www-Authenticate"],
  ])("%s => %s", (input, expected) => {
    expect(trainCase(input, { normalize: true })).toMatchObject(expected);
  });

  test("locale", () => {
    expect(trainCase("ibrahim-yılmaz", "tr")).toBe("İbrahim-Yılmaz");
    expect(trainCase("ibrahim-yılmaz", { locale: "tr" })).toBe(
      "İbrahim-Yılmaz",
    );
    expect(trainCase("ibrahim-yılmaz")).toBe("Ibrahim-Yılmaz");
  });
});

describe("titleCase", () => {
  test.each([
    ["", ""],
    ["f", "F"],
    ["foo", "Foo"],
    ["foo-bar", "Foo Bar"],
    ["this-IS-aTitle", "This is a Title"],
  ])("%s => %s", (input, expected) => {
    expect(titleCase(input)).toMatchObject(expected);
  });

  test("locale", () => {
    expect(titleCase("ibrahim-ve-ismail", "tr")).toBe("İbrahim Ve İsmail");
    expect(titleCase("ibrahim-ve-ismail", { locale: "tr" })).toBe(
      "İbrahim Ve İsmail",
    );
    expect(titleCase("ibrahim-ve-ismail")).toBe("Ibrahim Ve Ismail");
  });
});

describe("flatCase", () => {
  test.each([
    ["", ""],
    ["foo", "foo"],
    ["foo-bAr", "foobar"],
    ["FooBARb", "foobarb"],
    ["foo_bar-baz/qux", "foobarbazqux"],
    ["FOO_BAR", "foobar"],
    ["foo--bar-Baz", "foobarbaz"],
  ])("%s => %s", (input, expected) => {
    expect(flatCase(input)).toMatchObject(expected);
  });

  test("locale", () => {
    expect(flatCase("İSTANBUL-IĞDIR", "tr")).toBe("istanbulığdır");
    expect(flatCase("İSTANBUL-IĞDIR", { locale: "tr" })).toBe("istanbulığdır");
  });
});

describe("empty / no arguments", () => {
  test("returns empty string", () => {
    expect(pascalCase()).toBe("");
    expect(camelCase()).toBe("");
    expect(capitalCase()).toBe("");
    expect(kebabCase()).toBe("");
    expect(snakeCase()).toBe("");
    expect(flatCase()).toBe("");
    expect(trainCase()).toBe("");
    expect(titleCase()).toBe("");
  });
});
