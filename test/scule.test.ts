import { describe, test, expect } from "vitest";
import {
  splitByCase,
  pascalCase,
  kebabCase,
  camelCase,
  upperFirst,
  lowerFirst,
  snakeCase,
  trainCase,
  flatCase,
  titleCase,
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
    ["-FooBar", ["", "Foo", "Bar"]],
    [" FooBar", ["", "Foo", "Bar"]],
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

describe("pascalCase", () => {
  test.each([
    ["", ""],
    ["foo", "Foo"],
    ["foo-bAr", "FooBAr"],
    ["FooBARb", "FooBaRb"],
    ["foo_bar-baz/qux", "FooBarBazQux"],
    ["FOO_BAR", "FooBar"],
    ["foo--bar-Baz", "FooBarBaz"],
    ["FooBarBazQux", "FooBarBazQux"],
  ])("%s => %s", (input, expected) => {
    expect(pascalCase(input, { normalize: true })).toMatchObject(expected);
  });
});

describe("camelCase", () => {
  test.each([
    ["FooBarBaz", "fooBarBaz"],
    ["FOO_BAR", "fooBar"],
    ["fooBarBaz", "fooBarBaz"],
  ])("%s => %s", (input, expected) => {
    expect(camelCase(input, { normalize: true })).toMatchObject(expected);
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
    ["foo-b-ar", "foo-b-ar"],
  ])("%s => %s", (input, expected) => {
    expect(kebabCase(input)).toMatchObject(expected);
  });
});

describe("snakeCase", () => {
  test.each([
    ["FooBarBaz", "foo_bar_baz"],
    ["FOO_BAR", "foo_bar"],
    ["foo_bar_baz", "foo_bar_baz"],
  ])("%s => %s", (input, expected) => {
    expect(snakeCase(input)).toMatchObject(expected);
  });
});

describe("upperFirst", () => {
  test.each([
    ["", ""],
    ["foo", "Foo"],
    ["Foo", "Foo"],
    ["FooBarBaz", "FooBarBaz"],
  ])("%s => %s", (input, expected) => {
    expect(upperFirst(input)).toMatchObject(expected);
  });
});

describe("lowerFirst", () => {
  test.each([
    ["", ""],
    ["foo", "foo"],
    ["Foo", "foo"],
    ["fooBarBaz", "fooBarBaz"],
  ])("%s => %s", (input, expected) => {
    expect(lowerFirst(input)).toMatchObject(expected);
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
    ["Foo-B-Ar", "Foo-B-Ar"],
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
});

describe("titleCase", () => {
  test.each([
    ["", ""],
    ["f", "F"],
    ["foo", "Foo"],
    ["foo-bar", "Foo Bar"],
    ["this-IS-aTitle", "This is a Title"],
    ["Foo Bar", "Foo Bar"],
  ])("%s => %s", (input, expected) => {
    expect(titleCase(input)).toMatchObject(expected);
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
    ["foobarbaz", "foobarbaz"],
  ])("%s => %s", (input, expected) => {
    expect(flatCase(input)).toMatchObject(expected);
  });
});
