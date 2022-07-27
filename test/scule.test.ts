import { describe, test, expect } from 'vitest'
import { splitByCase, pascalCase, kebabCase, camelCase, upperFirst, lowerFirst, snakeCase } from '../src'

describe('splitByCase', () => {
  const tests = {
    '': [],
    foo: ['foo'],
    fooBar: ['foo', 'Bar'],
    FooBarBaz: ['Foo', 'Bar', 'Baz'],
    'foo_bar-baz/qux': ['foo', 'bar', 'baz', 'qux'],
    'foo--bar-Baz': ['foo', '', 'bar', 'Baz'],
    FOOBar: ['FOO', 'Bar'],
    ALink: ['A', 'Link']
  }

  for (const input in tests) {
    test(input + ' => ' + tests[input].join(', '), () => {
      expect(splitByCase(input)).toMatchObject(tests[input])
    })
  }
})

describe('pascalCase', () => {
  const tests = {
    foo: 'Foo',
    'foo-bAr': 'FooBAr',
    FooBARb: 'FooBARb',
    'foo_bar-baz/qux': 'FooBarBazQux',
    'foo--bar': 'FooBar'
  }

  for (const input in tests) {
    test(input + ' => ' + tests[input], () => {
      expect(pascalCase(input)).toBe(tests[input])
    })
  }
})

describe('camelCase', () => {
  const tests = {
    FooBarBaz: 'fooBarBaz'
  }

  for (const input in tests) {
    test(input + ' => ' + tests[input], () => {
      expect(camelCase(input)).toBe(tests[input])
    })
  }
})

describe('kebabCase', () => {
  const tests = {
    foo: 'foo',
    'foo/Bar': 'foo-bar',
    'foo-bAr': 'foo-b-ar',
    'foo--bar': 'foo--bar',
    FooBAR: 'foo-bar',
    ALink: 'a-link'
  }

  for (const input in tests) {
    test(input + ' => ' + tests[input], () => {
      expect(kebabCase(input)).toBe(tests[input])
    })
  }
})

describe('snakeCase', () => {
  const tests = {
    FooBarBaz: 'foo_bar_baz'
  }

  for (const input in tests) {
    test(input + ' => ' + tests[input], () => {
      expect(snakeCase(input)).toBe(tests[input])
    })
  }
})

describe('upperFirst', () => {
  const tests = {
    '': '',
    foo: 'Foo',
    Foo: 'Foo'
  }

  for (const input in tests) {
    test(input + ' => ' + tests[input], () => {
      expect(upperFirst(input)).toBe(tests[input])
    })
  }
})

describe('lowerFirst', () => {
  const tests = {
    '': '',
    foo: 'foo',
    Foo: 'foo'
  }

  for (const input in tests) {
    test(input + ' => ' + tests[input], () => {
      expect(lowerFirst(input)).toBe(tests[input])
    })
  }
})
