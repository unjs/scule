import { describe, test, expect } from "vitest";
import {
  splitByCase,
  pascalCase,
  kebabCase,
  camelCase,
  upperFirst,
  lowerFirst,
  snakeCase,
} from "../src";

describe("splitByCase", () => {
  test.each([
    ["", []],
    ["foo", ["foo"]],
    ["fooBar", ["foo", "Bar"]],
    ["FooBarBaz", ["Foo", "Bar", "Baz"]],
    ["foo_bar-baz/qux", ["foo", "bar", "baz", "qux"]],
    ["foo--bar-Baz", ["foo", "", "bar", "Baz"]],
    ["foo123-bar", ["foo123", "bar"]],
    ["FOOBar", ["FOO", "Bar"]],
    ["ALink", ["A", "Link"]],
    // with custom splitters
    [
      "foo\\Bar.fuzz-FIZz",
      ["foo", "Bar", "fuzz", "FI", "Zz"],
      ["\\", ".", "-"],
    ],
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
    ["FooBARb", "FooBARb"],
    ["foo_bar-baz/qux", "FooBarBazQux"],
    ["foo--bar-Baz", "FooBarBaz"],
  ])("%s => %s", (input, expected) => {
    expect(pascalCase(input)).toMatchObject(expected);
  });
});

describe("camelCase", () => {
  test.each([["FooBarBaz", "fooBarBaz"]])("%s => %s", (input, expected) => {
    expect(camelCase(input)).toMatchObject(expected);
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
  ])("%s => %s", (input, expected) => {
    expect(kebabCase(input)).toMatchObject(expected);
  });
});

describe("snakeCase", () => {
  test.each([["FooBarBaz", "foo_bar_baz"]])("%s => %s", (input, expected) => {
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
