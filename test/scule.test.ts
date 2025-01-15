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
    ["foo_bar-baz/qux quux", ["foo", "bar", "baz", "qux", "quux"]],
    ["foo--bar-Baz", ["foo", "", "bar", "Baz"]],
    ["FOO_BAR", ["FOO", "BAR"]],
    ["foo123-bar", ["foo123", "bar"]],
    ["FOOBar", ["FOO", "Bar"]],
    ["FOO BAR", ["FOO", "BAR"]],
    ["foO BAR", ["fo", "O", "BAR"]],
    ["Foo BAR", ["Foo", "BAR"]],
    ["Foo bAR", ["Foo", "b", "AR"]],
    ["FOO Bar", ["FOO", "Bar"]],
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
});

describe("camelCase", () => {
  test.each([
    ["FooBarBaz", "fooBarBaz"],
    ["FOO_BAR", "fooBar"],
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
  ])("%s => %s", (input, expected) => {
    expect(kebabCase(input)).toMatchObject(expected);
  });
});

describe("snakeCase", () => {
  test.each([
    ["FooBarBaz", "foo_bar_baz"],
    ["FOO_BAR", "foo_bar"],
  ])("%s => %s", (input, expected) => {
    expect(snakeCase(input)).toMatchObject(expected);
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
});

describe("lowerFirst", () => {
  test.each([
    ["", ""],
    ["foo", "foo"],
    ["Foo", "foo"],
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
  ])("%s => %s", (input, expected) => {
    expect(flatCase(input)).toMatchObject(expected);
  });
});
